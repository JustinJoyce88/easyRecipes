import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';

import { API_URL } from '../settings/variables';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';
import { store } from '../store/store';

const httpLink = createHttpLink({
  uri: API_URL,
});

const getHeaders = async () => {
  const user = store.getState().persist.user;
  let token = null;
  if (user?.username) {
    token = await SecureStore.getItemAsync(user.username);
  }
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
