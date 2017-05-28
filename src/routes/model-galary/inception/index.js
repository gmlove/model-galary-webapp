import React from 'react';
import Layout from '../../../components/Layout';
import Inception from './Inception';

const title = 'Inception';

export default {

  path: '/inception',

  name: 'model/inception',

  action() {
    return {
      title,
      component: <Layout><Inception title={title} /></Layout>,
    };
  },

};
