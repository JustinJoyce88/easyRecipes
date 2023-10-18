import { gql, useQuery } from '@apollo/client';

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
  const customRefetch = async () => {
    try {
      await refetch();
    } catch (error) {
      console.log('🚀 ~ file: useGetCategories.tsx:22 ~ customRefetch ~ error:', error);
      // Handle the error
    }
  };

  return {
    loading,
    error,
    data,
    refetch: customRefetch,
  };
};
