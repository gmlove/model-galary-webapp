/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../../components/Layout';
import Mnist from './Mnist';

const title = 'Mnist';

export default {

  path: '/mnist',

  name: 'model/mnist',

  async action({ fetch }) {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: '{mnist{recognition,imageBase64}}',
      }),
    });
    const { data } = await resp.json();
    if (!data || !data.mnist) throw new Error('Failed to call mnist recognize.');
    return {
      title,
      component: <Layout><Mnist title={title} /></Layout>,
    };
  },

  action() {
    return {
      title,
      component: <Layout><Mnist title={title} /></Layout>,
    };
  },

};
