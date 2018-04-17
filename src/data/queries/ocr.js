import {
  GraphQLString as StringType,
} from 'graphql';
import fetch from 'isomorphic-fetch';
import OCR from '../types/OCRType';

const ocr = {
  type: OCR,
  args: {
    imageUrl: {
      type: StringType,
    },
  },
  async resolve(_, { imageUrl }) {
    console.info(`recognize start for image: ${imageUrl}`);
    const tfServerUrl = `${process.env.OCR_HTTP_URL || 'http://10.206.8.92:21090'}/text`;
    const recognizeUrl = `${tfServerUrl}?url=${encodeURIComponent(imageUrl)}`;
    const imgResponse = await fetch(recognizeUrl, { method: 'POST' });
    const recognizeResult = await imgResponse.json();
    console.info(`recognize end for image(${recognizeResult.id}): ${imageUrl}`);
    console.info('text: ', recognizeResult.text);
    console.info('boxes: ', recognizeResult.boxes);
    return {
      id: recognizeResult.id,
      labels: recognizeResult.text.map(function (t, idx) {
        return { text: t, box: recognizeResult.boxes[idx].map(xy => xy.map(x => x.toFixed(1))) };
      }),
      imageBase64: recognizeResult.image,
    };
  },
};

export default ocr;
