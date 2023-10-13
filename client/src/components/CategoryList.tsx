import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import CategoryItem from './CategoryItem';
import { useGetCategories } from '../hooks/useGetCategories';

const CategoryList = () => {
  const { data, loading, error } = useGetCategories();

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryList;
