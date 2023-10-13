import { useQuery, gql } from '@apollo/client';
import client from '../api/client';

export const GET_FAVORITES = gql`
query getFavorites($filter: RecipesFilterInput) {
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
  const { data, loading, error } = useQuery(GET_FAVORITES, {
    variables: {
      filter: {
        curatorFavorited: true,
      },
    },
    client: client,
  });
  return {
    loading,
    error,
    data,
  };
};
