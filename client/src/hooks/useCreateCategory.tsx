import { useQuery, gql } from '@apollo/client';
import client from '../api/client';

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      name
    }
  }
`;

export const useGetCategories = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    client: client,
  });
  return {
    loading,
    error,
    data,
  };
};
