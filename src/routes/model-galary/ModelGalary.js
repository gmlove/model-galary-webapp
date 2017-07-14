/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ModelGalary.css';

class ModelGalary extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  componentDidMount() {
    try {
      const opts = {
        textFont: 'Trebuchet MS, Helvetica, sans-serif',
        textColour: '#00f',
        textHeight: 25,
        outlineMethod: 'block',
        outlineColour: '#acf',
        maxSpeed: 0.03,
        minBrightness: 0.2,
        depth: 0.92,
        pulsateTo: 0.6,
        initial: [0.1, -0.1],
        decel: 0.98,
        reverse: true,
        hideTags: false,
        shadow: '#ccf',
        shadowBlur: 3,
        weight: false,
        imageScale: null,
        fadeIn: 1000,
        clickToFront: 600,
        wheelZoom: false,
        zoomMin: 1,
      };
      TagCanvas.Start('model-tag-cloud', '', opts);
    } catch (e) {
      console.info(e);
    }
  }

  render() {
    const url = require('../../router').url;
    return (
      <div className={s.container} id="model-container">
        <canvas className={cx(s.container, s.tagCloud)} width="800" height="800" id="model-tag-cloud">
          <p>Anything in here will be replaced on browsers that support the canvas element</p>
          <ul>
            <li><a href={url('model/mnist')}>Mnist</a></li>
            <li><a href={url('model/inception')}>Inception</a></li>
            <li><a href={url('model/inception')}>Inception</a></li>
            <li><a href={url('model/inception')}>Inception</a></li>
            <li><a href={url('model/inception')}>Inception</a></li>
            <li><a href={url('model/mnist')}>Mnist</a></li>
            <li><a href={url('model/mnist')}>Mnist</a></li>
            <li><a href={url('model/mnist')}>Mnist</a></li>
            <li><a href={url('model/watermark')}>Watermark</a></li>
            <li><a href={url('model/watermark')}>Watermark</a></li>
            <li><a href={url('model/watermark')}>Watermark</a></li>
            <li><a href={url('model/watermark')}>Watermark</a></li>
          </ul>
        </canvas>
      </div>
    );
  }

}

export default withStyles(s)(ModelGalary);
