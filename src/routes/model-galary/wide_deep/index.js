import React from 'react';
import Layout from '../../../components/Layout';
import WideDeep from './WideDeep'

const title = 'Wide & Deep';

export default {
  path: '/wdn',
  name: 'model/wdn',
  action() {
    return {
      title,
      component: <Layout><WideDeep title={title}/></Layout>
    }
  }
}
