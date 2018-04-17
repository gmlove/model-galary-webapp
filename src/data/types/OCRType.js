import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLFloat as Float,
} from 'graphql';

const OCR = new ObjectType({
  name: 'OCR',
  fields: {
    id: { type: StringType },
    imageBase64: { type: new NonNull(StringType) },
    labels: { type: new List(new ObjectType({
      name: 'OCRResult',
      fields: {
        box: { type: new List(new List(Float)) },
        text: { type: StringType },
      },
    })) },
  },
});

export default OCR;
