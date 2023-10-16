import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { store } from '../store/store';

const httpLink = createHttpLink({
  uri: 'https://easy-recipes-lyart.vercel.app/graphql',
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
