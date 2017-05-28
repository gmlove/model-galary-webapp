import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ImageModel from '../base/ImageModel';
import s from './Mnist.css';

const images = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(name => `/assets/mnist/${name}.png`);

function getRecognizeQuery(imageUrl) {
  return `{mnist(imageUrl:"${imageUrl}"){label,imageBase64}}`;
}

function parseRecognizeData(data) {
  if (!data || !data.mnist) {
    throw new Error('Failed to call mnist recognize.');
  }
  return data.mnist;
}

function resultPanel(maybeNullRecognition) {
  const recognition = maybeNullRecognition || {
    imageBase64: null,
    label: null,
  };
  return (
    <h4 className={s.recognizeResult}>Result: {recognition.label}</h4>
  );
}

function getRecognizeImageBase64(maybeNullRecognition) {
  const recognition = maybeNullRecognition || {
    imageBase64: null,
    label: null,
  };
  return recognition.imageBase64;
}

class Mnist extends React.Component {

  render() {
    return (
      <ImageModel
        name="mnist"
        title="Mnist Model"
        description="A two layer neural network model to recognize hand-writing images."
        images={images}
        getRecognizeQuery={getRecognizeQuery}
        parseRecognizeData={parseRecognizeData}
        getRecognizeImageBase64={getRecognizeImageBase64}
        getResultPanel={resultPanel}
      />
    );
  }

}

export default withStyles(s)(Mnist);
