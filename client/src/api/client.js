import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { store } from '../store/store';
import { API_URL } from '../settings/variables';

const httpLink = createHttpLink({
  uri: "http://192.168.0.6:3000/graphql",
});

const getHeaders = () => {
  const token = store.getState().persist.user.token;

  return {
    authorization: token ? `Bearer ${token}` : null,
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
