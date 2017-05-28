import {
  GraphQLString as StringType,
} from 'graphql';
import fetch from 'isomorphic-fetch';
import { URLSearchParams } from 'url';
import MnistRecognition from '../types/MnistType';

const mnist = {
  type: MnistRecognition,
  args: {
    imageUrl: {
      type: StringType,
    },
  },
  async resolve(_, { imageUrl }) {
    console.info(`recognize start for image: ${imageUrl}`);
    const tfServerUrl = 'http://localhost:8000/mnist/infer';
    const searchParams = new URLSearchParams({ url: imageUrl }).toString();
    const recognizeUrl = `${tfServerUrl}?${searchParams}`;
    const imgResponse = await fetch(recognizeUrl);
    const recognizeResult = await imgResponse.json();
    console.info(`recognize end for image: ${imageUrl}`);
    return {
      label: recognizeResult.label,
      imageBase64: recognizeResult.image_b64,
    };
  },
};

export default mnist;
