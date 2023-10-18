import { FlatList, StyleSheet, View } from 'react-native';

import CategoryItem from './CategoryItem';
import LoadingData from './LoadingData';
import NetworkRefresh from './NetworkRefresh';
import React from 'react';
import { useGetCategories } from '../hooks/useGetCategories';

const CategoryList = (props: { navigation: any }) => {
  const { navigation } = props;
  const { data, loading, error, refetch } = useGetCategories();

  if (loading) return <LoadingData />;
  if (error) return <NetworkRefresh message={error.message} refresh={() => refetch()} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.categories}
        renderItem={({ item }) => <CategoryItem item={item} navigation={navigation} />}
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
