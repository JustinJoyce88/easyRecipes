import { useQuery, gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import client from '../api/client';

export const GET_RECIPES = gql`
  query GetRecipes($offset: Int, $limit: Int, $filter: RecipesFilterInput) {
    recipes(offset: $offset, limit: $limit, filter: $filter) {
      edges {
        node {
          id
          name
          image
          cookTime
          description
          cheerCount
          author
        }
      }
      pageInfo {
        hasNextPage
      }
      totalCount
    }
  }
`;

export const useGetRecipes = (reqData: {
  variables: { categoryId: string; offset: number; limit: number };
  client: ApolloClient<NormalizedCacheObject>;
}) => {
  const { categoryId } = reqData.variables;
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_RECIPES, {
    variables: {
      offset: 0,
      limit: 10,
      filter: {
        categoryId,
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
    fetchMore,
  };
};
