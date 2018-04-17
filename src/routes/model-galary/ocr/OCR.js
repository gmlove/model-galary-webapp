import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ImageModel from '../base/ImageModel';
import s from './ocr.css';

const images = [
  'demo-card-1.jpg', 'demo-card-2.jpg', 'demo-card-3.jpg', 'demo-card-4.jpg', 'demo-card-5.jpg', 'demo-card-6.png', 'demo-card-7.jpg', 'demo-card-8.png',
].map(name => `/assets/ocr/${name}`);

function getRecognizeQuery(imageUrl) {
  return `{ocr(imageUrl:"${imageUrl}"){labels{text,box},imageBase64,id}}`;
}

function parseRecognizeData(data) {
  if (!data || !data.ocr) {
    throw new Error('Failed to call ocr recognize.');
  }
  return data.ocr;
}

function resultPanel(maybeNullRecognition) {
  const recognition = maybeNullRecognition || {
    imageBase64: null,
    labels: [],
  };
  return (
    <div>
      <h4 className={s.recognizeResult}>Result: </h4>
      <ListGroup>
        {
          recognition.labels.map(label => (
            <ListGroupItem><strong>{label.text}</strong>: [{label.box.toString()}]</ListGroupItem>
          ))
        }
      </ListGroup>
    </div>
  );
}

function getRecognizeImageBase64(maybeNullRecognition) {
  const recognition = maybeNullRecognition || {
    imageBase64: null,
    labels: [],
  };
  return recognition.imageBase64;
}

class Watermark extends React.Component {

  render() {
    return (
      <ImageModel
        name="ocr"
        title="OCR Model"
        description="CTPN + CRNN neural network model to recognize text from scene images."
        images={images}
        getRecognizeQuery={getRecognizeQuery}
        parseRecognizeData={parseRecognizeData}
        getRecognizeImageBase64={getRecognizeImageBase64}
        getResultPanel={resultPanel}
        extendedStyles={s}
      />
    );
  }

}

export default withStyles(s)(Watermark);
