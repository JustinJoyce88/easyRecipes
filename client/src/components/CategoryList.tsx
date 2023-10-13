import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CategoryItem from './CategoryItem';
import { useGetCategories } from '../hooks/useCreateCategory';



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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryList;
