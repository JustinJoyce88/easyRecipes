import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { store } from '../store/store';

const httpLink = createHttpLink({
  uri: 'http://192.168.0.10:4000/',
});

const getHeaders = () => {
  const authToken = store.getState().persist.authToken;

  return {
    authorization: authToken ? `Bearer ${authToken}` : null,
  };
};

const authLink = setContext((_, { headers }) => {
  const updatedHeaders = getHeaders();

  return {
    headers: {
      ...headers,
      ...updatedHeaders,
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
