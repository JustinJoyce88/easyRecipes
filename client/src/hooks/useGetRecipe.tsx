import { useQuery, gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import client from '../api/client';

export const GET_RECIPE = gql`
  query GetRecipe($recipeId: ID!) {
    recipe(id: $recipeId) {
      id
      description
      curatorFavorited
      cookTime
      image
      ingredients
      instruction
      name
      author
      cheerCount
    }
  }
`;

export const useGetRecipe = (reqData: {
  variables: { recipeId: any };
  client: ApolloClient<NormalizedCacheObject>;
}) => {
  const { recipeId } = reqData.variables;
  const { data, loading, error, refetch } = useQuery(GET_RECIPE, {
    variables: {
      recipeId,
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
