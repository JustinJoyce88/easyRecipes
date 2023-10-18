import { FlatList, StyleSheet, View } from 'react-native';

import LoadingData from './LoadingData';
import NetworkRefresh from './NetworkRefresh';
import React from 'react';
import RecipeItem from './RecipeItem';
import { useGetFavorites } from '../hooks/useGetFavorites';

type FavoritesListProps = {
  navigation: any;
};

const FavoritesList = ({ navigation }: FavoritesListProps) => {
  const { data, loading, error, refetch } = useGetFavorites();

  if (loading) return <LoadingData />;
  if (error) return <NetworkRefresh message={error.message} refresh={() => refetch()} />;
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={data?.recipes?.edges}
        renderItem={({ item }) => (
          <RecipeItem navigation={navigation} item={item?.node} refresh={() => refetch()} />
        )}
        keyExtractor={(item) => item?.node?.id}
        maxToRenderPerBatch={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: 'center',
    paddingBottom: 100,
  },
});

export default FavoritesList;
