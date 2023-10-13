import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { store } from '../store/store';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

// Create a function to retrieve the latest headers
const getHeaders = () => {
  // Replace with your logic to get the latest headers
  const authToken = store.getState().persist.authToken;

  return {
    authorization: authToken ? `Bearer ${authToken}` : null,
  };
};

// Create a new Apollo Link that updates the headers before each request
const authLink = setContext((_, { headers }) => {
  const updatedHeaders = getHeaders();

  // Return the updated headers to the context
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
