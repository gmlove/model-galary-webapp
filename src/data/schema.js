/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLObjectType as ObjectType, GraphQLSchema as Schema, } from 'graphql';

import me from './queries/me';
import news from './queries/news';
import mnist from './queries/mnist';
import inception from './queries/inception';
import watermark from './queries/watermark';
import ocr from './queries/ocr';
import widedeep from './queries/widedeep'

const schema = new Schema({
    query: new ObjectType({
      name: 'Query',
      fields: {
        me,
        news,
        mnist,
        inception,
        watermark,
        ocr,
        widedeep
      },
    }),
  }
  )
;

export default schema;
