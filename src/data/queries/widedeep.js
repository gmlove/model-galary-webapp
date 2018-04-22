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
    const tfServerUrl = `${process.env.SERVING_HTTP_URL || 'http://localhost:8000'}/wdn/movie`;
    const queryUrl = `${tfServerUrl}?${queryObj}`;
    const queryResponse = await fetch(queryUrl);
    const queryResult = await queryResponse.json();
    return {
      score: queryResult.score,
      request: queryResult.request
    }
  }
};

export default widedeep;
