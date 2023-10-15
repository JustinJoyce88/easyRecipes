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
  return {
    loading,
    error,
    data,
    refetch,
  };
};
