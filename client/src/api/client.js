import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { store } from '../store/store';
import { RN_ENV_API_URL_PROD, RN_ENV_API_URL_DEV } from '@env';

const PROD = false;
const API_URL = PROD ? RN_ENV_API_URL_PROD : RN_ENV_API_URL_DEV;
console.log("🚀 ~ file: client.js:8 ~ API_URL:", API_URL)

const httpLink = createHttpLink({
  uri: API_URL,
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
