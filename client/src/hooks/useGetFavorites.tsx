import { useQuery, gql } from '@apollo/client';
import client from '../api/client';

export const GET_FAVORITES = gql`
  query GetFavorites($filter: RecipesFilterInput) {
    recipes(filter: $filter) {
      id
      name
      cookTime
      description
      image
    }
  }
`;

export const useGetFavorites = () => {
  const { data, loading, error, refetch } = useQuery(GET_FAVORITES, {
    variables: {
      filter: {
        curatorFavorited: true,
      },
    },
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
