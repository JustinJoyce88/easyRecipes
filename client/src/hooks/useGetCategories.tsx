import { useQuery, gql } from '@apollo/client';
import client from '../api/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      image
    }
  }
`;

export const useGetCategories = () => {
  const { data, loading, error, refetch } = useQuery(GET_CATEGORIES, {
    client: client,
  });
  return {
    loading,
    error,
    data,
    refetch,
  };
};
