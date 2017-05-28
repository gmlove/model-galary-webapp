/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Jumbotron, Panel, Image, Grid, Row, Col,
  FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import cx from 'classnames';
import RadioImg from './RadioImg';
import LoadingButton from './LoadingButton';
import s from './Mnist.css';

const images = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

class Mnist extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = this.getInitialState();
    this.runRecognizeFromSelection = this.runRecognizeFromSelection.bind(this);
    this.runRecognizeFromInput = this.runRecognizeFromInput.bind(this);
  }

  getInitialState() {
    return {
      inferring: false,
      imageSelectValidationState: null,
      selectedImage: null,
      inputUrlValidationState: null,
      inputUrl: null,
      recognition: {
        imageBase64: null,
        label: null,
      },
    };
  }

  runRecognizeFromSelection() {
    if (!this.state.selectedImage) {
      this.setState({ imageSelectValidationState: 'error' });
    } else {
      this.withInferState(async () => {
        // TODO: The code below can only run in browser.
        const location = window.location;
        await this.runRecognize(`${location.protocol}//${location.host}/assets/mnist/${this.state.selectedImage}.png`);
      });
    }
  }

  runRecognizeFromInput() {
    if (!this.state.inputUrl) {
      this.setState({ inputUrlValidationState: 'error' });
    } else {
      this.withInferState(async () => {
        await this.runRecognize(this.state.inputUrl);
      });
    }
  }

  async withInferState(asyncFunc) {
    this.setState({ inferring: true });
    try {
      await asyncFunc();
    } catch (e) {
      console.error('Error call mnist recognition.', e);
    } finally {
      this.setState({ inferring: false });
    }
  }

  async runRecognize(imageUrl) {
    this.setState({ recognition: { imageBase64: null, label: null } });
    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `{mnist(imageUrl:"${imageUrl}"){label,imageBase64}}`,
      }),
    });
    const { data } = await resp.json();
    if (!data || !data.mnist) {
      throw new Error('Failed to call mnist recognize.');
    }
    this.setState({ recognition: data.mnist });
  }

  render() {
    const imageOptions = images.map(image => ({
      bsClass: cx('thumbnail', s.image),
      bsSelClass: cx('thumbnail', s.image, s.imageSelected),
      img: `/assets/mnist/${image}.png`,
      value: image,
    }));
    const imagesSelect = (
      <FormGroup controlId="formSelectImage" validationState={this.state.imageSelectValidationState}>
        <ControlLabel>Select an image to test:</ControlLabel>
        <div className={s.imageContainer}>
          <RadioImg
            ref={this.state.selectedImage}
            options={imageOptions}
            defaultValue={this.state.selectedImage}
            marginSpace="10"
            onChange={(e) => {
              this.setState({ imageSelectValidationState: null, selectedImage: e.target.value });
            }}
          />
        </div>
        <LoadingButton
          inferring={this.state.inferring}
          text="Run Recognize"
          loadingText="Running..."
          onClick={this.runRecognizeFromSelection}
        />
        {this.state.imageSelectValidationState === null ? null
          : <HelpBlock>Please select an image to recognize.</HelpBlock>}
      </FormGroup>
    );
    const urlInput = (
      <FormGroup
        controlId="formExternalImageUrl"
        validationState={this.state.inputUrlValidationState}
      >
        <div className="input-group">
          <ControlLabel>Or input an external URL to test:</ControlLabel>
          <input
            type="text" className="form-control"
            placeholder="Enter an image URL"
            onChange={(e) => {
              this.setState({ inputUrlValidationState: null, inputUrl: e.target.value });
            }}
          />
        </div>
        <br />
        <LoadingButton
          inferring={this.state.inferring}
          text="Run Recognize"
          loadingText="Running..."
          onClick={this.runRecognizeFromInput}
        />
        {this.state.inputUrlValidationState === null ? null
          : <HelpBlock>Please input a URL to recognize.</HelpBlock>}
      </FormGroup>
    );
    const imageSelectionForm = (
      <form>
        {imagesSelect}
        {urlInput}
      </form>
    );
    const recognizeResult = (
      <Panel>
        <p>Recognition Result</p>
        <Image className={s.recognizeImg} src={this.state.recognition.imageBase64} thumbnail />
        <h4 className={s.recognizeResult}>Result: {this.state.recognition.label}</h4>
      </Panel>
    );
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Jumbotron>
            <h1>Mnist Model</h1>
            <p>A deep learning model to recognize hand-writing images.</p>
            <br />
            <Grid fluid >
              <Row className="show-grid">
                <Col xs={8} md={8}>{imageSelectionForm}</Col>
                <Col xs={4} md={4}>{recognizeResult}</Col>
              </Row>
            </Grid>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Mnist);
