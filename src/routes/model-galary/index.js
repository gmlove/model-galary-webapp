/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import React from 'react';
import Layout from '../../components/Layout';
import ModelGalary from './ModelGalary';

const title = 'Model Galary';

export default {

  path: '/model-galary',

  children: [
    {
      path: '/',
      action() {
        return {
          title,
          component: <Layout><ModelGalary title={title} /></Layout>,
        };
      },
    },
    require('./mnist').default,
    require('./inception').default,
    require('./watermark').default,
    require('./ocr').default,
  ],

};
