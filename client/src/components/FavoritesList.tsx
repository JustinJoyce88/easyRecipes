import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import FavoriteItem from './FavoriteItem';
import { useGetFavorites } from '../hooks/useGetFavorites';

const FavoritesList = () => {
  const { data, loading, error } = useGetFavorites();

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={data?.recipes}
        renderItem={({ item }) => <FavoriteItem item={item} />}
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FavoritesList;
