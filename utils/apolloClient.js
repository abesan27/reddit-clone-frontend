import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

let apolloClient;

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:1337/graphql',
    }),
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initalState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initalState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initalState });
  }

  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export const useApollo = (initalState) => {
  return useMemo(() => initializeApollo(initalState), [initalState]);
};
