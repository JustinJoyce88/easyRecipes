import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CategoryItem from './CategoryItem';
import { useGetCategories } from '../hooks/useGetCategories';
import NetworkRefresh from './NetworkRefresh';
import LoadingData from './LoadingData';

const CategoryList = () => {
  const { data, loading, error, refetch } = useGetCategories();

  if (loading) return <LoadingData />;
  if (error) return <NetworkRefresh message={error.message} refresh={() => refetch()} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.categories}
        renderItem={({ item }) => <CategoryItem item={item} />}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});

export default CategoryList;
