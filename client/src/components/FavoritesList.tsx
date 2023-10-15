import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import FavoriteItem from './FavoriteItem';
import { useGetFavorites } from '../hooks/useGetFavorites';
import NetworkRefresh from './NetworkRefresh';
import LoadingData from './LoadingData';

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
        data={data?.recipes}
        renderItem={({ item }) => (
          <FavoriteItem navigation={navigation} item={item} refresh={() => refetch()} />
        )}
        keyExtractor={(item) => item.id}
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
