import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ImageModel from '../base/ImageModel';
import s from './Inception.css';

const images = [
  'airplane.jpg', 'cat.png', 'dog.jpg', 'girl.jpg', 'koala.jpg', 'sheep.png', 'swan.jpg', 'tiger.jpg', 'wolf.png',
].map(name => `/assets/inception/${name}`);

function getRecognizeQuery(imageUrl) {
  return `{inception(imageUrl:"${imageUrl}"){labels{name,probability},imageBase64}}`;
}

function parseRecognizeData(data) {
  if (!data || !data.inception) {
    throw new Error('Failed to call inception recognize.');
  }
  return data.inception;
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
            <ListGroupItem><strong>{label.name}</strong>: {label.probability}</ListGroupItem>
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

class Inception extends React.Component {

  render() {
    return (
      <ImageModel
        name="inception"
        title="Inception Model"
        description="Google Inception neural network model to recognize imagenet images."
        images={images}
        getRecognizeQuery={getRecognizeQuery}
        parseRecognizeData={parseRecognizeData}
        getRecognizeImageBase64={getRecognizeImageBase64}
        getResultPanel={resultPanel}
      />
    );
  }

}

export default withStyles(s)(Inception);
