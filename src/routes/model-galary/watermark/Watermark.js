import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ImageModel from '../base/ImageModel';
import s from './Watermark.css';

const images = [
  'clean_0.jpg', 'logo_0.jpg', 'clean_1.jpg', 'text_0.jpg', 'clean_2.jpg', 'logo_1.jpg', 'logo_2.jpg', 'text_1.jpg', 'text_2.jpg',
].map(name => `/assets/watermark/${name}`);

function getRecognizeQuery(imageUrl) {
  return `{watermark(imageUrl:"${imageUrl}"){labels{name,probability},imageBase64}}`;
}

function parseRecognizeData(data) {
  if (!data || !data.watermark) {
    throw new Error('Failed to call watermark recognize.');
  }
  return data.watermark;
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
            <ListGroupItem><strong>{label.name}</strong>: {label.probability.toFixed(3)}</ListGroupItem>
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
        name="watermark"
        title="Watermark Model"
        description="Google Watermark neural network model to recognize imagenet images."
        images={images}
        getRecognizeQuery={getRecognizeQuery}
        parseRecognizeData={parseRecognizeData}
        getRecognizeImageBase64={getRecognizeImageBase64}
        getResultPanel={resultPanel}
      />
    );
  }

}

export default withStyles(s)(Watermark);
