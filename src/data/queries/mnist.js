import {
  GraphQLString as StringType,
} from 'graphql';
import fetch from 'isomorphic-fetch';
import MnistRecognition from '../types/MnistType';

const mnist = {
  type: MnistRecognition,
  args: {
    imageUrl: {
      type: StringType,
    },
  },
  async resolve(_, { imageUrl }) {
    console.info(`fetching start for image: ${imageUrl}`);
    const imgResponse = await fetch(imageUrl);
    const buffer = await imgResponse.buffer();
    console.info(`fetching end for image: ${imageUrl}`);
    return {
      label: '1',
      imageBase64: `data:image/png;base64,${buffer.toString('base64')}`,
    };
  },
};

export default mnist;
