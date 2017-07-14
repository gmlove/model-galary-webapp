import React from 'react';
import Layout from '../../../components/Layout';
import Watermark from './Watermark';

const title = 'Watermark';

export default {

  path: '/watermark',

  name: 'model/watermark',

  action() {
    return {
      title,
      component: <Layout><Watermark title={title} /></Layout>,
    };
  },

};
