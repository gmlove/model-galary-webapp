import { GraphQLString as StringType } from 'graphql';

import fetch from 'isomorphic-fetch'
import WDN from '../types/WDNType'

const widedeep = {
  type: WDN,
  args: {
    queryObj: { type: StringType }
  },
  async resolve(_, { queryObj }) {
    console.info(`query start for request: ${queryObj}`);
    const tfServerUrl = `${process.env.SERVING_HTTP_URL || 'http://localhost:8000'}/wdn/infer`;
    const queryUrl = `${tfServerUrl}?${queryObj}`;
    const queryResponse = await fetch(queryUrl);
    const queryResult = await queryResponse.json();
    console.info('response body: ', queryResult);
    return {
      score: queryResult.max_scores,
      request: queryResult.request
    }
  }
};

export default widedeep;
