import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInterfaceType as InterfaceType,
  GraphQLList as List,
  GraphQLFloat as Float,
} from 'graphql';

const InceptionRecognition = new ObjectType({
  name: 'InceptionRecognition',
  fields: {
    imageBase64: { type: new NonNull(StringType) },
    labels: { type: new List(new ObjectType({
      name: 'Label',
      fields: {
        name: { type: StringType },
        probability: { type: Float },
      },
    })) },
  },
});

export default InceptionRecognition;
