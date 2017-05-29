import {
  GraphQLString as StringType,
} from 'graphql';
import fetch from 'isomorphic-fetch';
import InceptionRecognition from '../types/InceptionType';

const inception = {
  type: InceptionRecognition,
  args: {
    imageUrl: {
      type: StringType,
    },
  },
  async resolve(_, { imageUrl }) {
    console.info(`recognize start for image: ${imageUrl}`);
    const tfServerUrl = `${process.env.SERVING_HTTP_URL || 'http://localhost:8000'}/inception/infer`;
    const recognizeUrl = `${tfServerUrl}?url=${encodeURIComponent(imageUrl)}`;
    const imgResponse = await fetch(recognizeUrl);
    const recognizeResult = await imgResponse.json();
    console.info(`recognize end for image: ${imageUrl}`);
    console.info('labels: ', recognizeResult.labels);
    return {
      labels: recognizeResult.labels,
      imageBase64: recognizeResult.image_b64,
    };
  },
};

export default inception;
