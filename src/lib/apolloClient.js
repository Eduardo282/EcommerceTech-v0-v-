import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const uri = '/graphql';

const httpLink = new HttpLink({ uri, credentials: 'include' });

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
