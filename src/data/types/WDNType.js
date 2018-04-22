import { GraphQLFloat as Float, GraphQLInt as Int, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const WDN = new ObjectType({
  name: 'WDN',
  fields: {
    score: { type: Float },
    request: {
      type: new ObjectType({
        name: 'request',
        fields: {
          age: { type: Int },
          gender: { type: StringType }
        }
      })
    }
  },
});

export default WDN;
