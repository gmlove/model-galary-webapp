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
  FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import cx from 'classnames';
import RadioImg from './RadioImg';
import LoadingButton from './LoadingButton';
import s from './ImageModel.css';

class ImageModel extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    getRecognizeQuery: PropTypes.func.isRequired,
    parseRecognizeData: PropTypes.func.isRequired,
    getRecognizeImageBase64: PropTypes.func.isRequired,
    getResultPanel: PropTypes.func.isRequired,
  }

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
      recognition: null,
    };
  }

  runRecognizeFromSelection() {
    if (!this.state.selectedImage) {
      this.setState({ imageSelectValidationState: 'error' });
    } else {
      this.withInferState(async () => {
        // TODO: The code below can only run in browser.
        const location = window.location;
        await this.runRecognize(`${location.protocol}//${location.host}${this.state.selectedImage}`);
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
      console.error(`Error call ${this.props.name} recognition.`, e);
    } finally {
      this.setState({ inferring: false });
    }
  }

  async runRecognize(imageUrl) {
    this.setState({ recognition: null });
    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: this.props.getRecognizeQuery(imageUrl),
      }),
    });
    const { data } = await resp.json();
    this.setState({ recognition: this.props.parseRecognizeData(data) });
  }

  recognizeResultPanel() {
    return (
      <Panel>
        <p>Recognition Result</p>
        <Image
          className={s.recognizeImg}
          src={this.props.getRecognizeImageBase64(this.state.recognition)}
          thumbnail
        />
        {this.props.getResultPanel(this.state.recognition)}
      </Panel>
    );
  }

  render() {
    const imageOptions = this.props.images.map(image => ({
      bsClass: cx('thumbnail', s.image),
      bsSelClass: cx('thumbnail', s.image, s.imageSelected),
      img: image,
      value: image,
    }));
    const imagesSelect = (
      <FormGroup controlId="formSelectImage" validationState={this.state.imageSelectValidationState}>
        <ControlLabel bsClass={cx('control-label', s.controlLabel)}>Select an image to test:</ControlLabel>
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
          btnClass={s.blockBtn}
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
          btnClass={s.blockBtn}
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
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Jumbotron>
            <h1>{this.props.title}</h1>
            <p>{this.props.description}</p>
            <br />
            <Grid fluid >
              <Row className="show-grid">
                <Col xs={8} md={8}>{imageSelectionForm}</Col>
                <Col xs={4} md={4}>{this.recognizeResultPanel()}</Col>
              </Row>
            </Grid>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ImageModel);
