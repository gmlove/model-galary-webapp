import React from 'react';
import Layout from '../../../components/Layout';
import OCR from './OCR';
import s from './ocr.css';

const title = 'OCR';

export default {

  path: '/ocr',

  name: 'model/ocr',

  action() {
    return {
      title,
      component: <Layout><OCR title={title} /></Layout>,
    };
  },

};
