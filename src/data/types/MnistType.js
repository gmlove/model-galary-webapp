import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const MnistRecognition = new ObjectType({
  name: 'MnistRecognition',
  fields: {
    imageBase64: { type: new NonNull(StringType) },
    label: { type: StringType },
  },
});

export default MnistRecognition;
