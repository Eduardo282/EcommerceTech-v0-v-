import { GraphQLScalarType, Kind } from 'graphql';

function parseJsonLiteral(ast) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      for (const field of ast.fields) {
        value[field.name.value] = parseJsonLiteral(field.value);
      }
      return value;
    }
    case Kind.LIST:
      return ast.values.map((node) => parseJsonLiteral(node));
    default:
      return null;
  }
}

export const scalarResolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    serialize(value) {
      return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      return ast.kind === Kind.STRING ? new Date(ast.value) : null;
    },
  }),
  JSON: new GraphQLScalarType({
    name: 'JSON',
    serialize: (value) => value,
    parseValue: (value) => value,
    parseLiteral: parseJsonLiteral,
  }),
};
