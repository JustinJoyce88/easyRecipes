import { SheetManager } from 'react-native-actions-sheet';

import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import LoadingData from '../components/LoadingData';
import NetworkRefresh from '../components/NetworkRefresh';
import RecipeItem from '../components/RecipeItem';
import client from '../api/client';
import { useGetRecipes } from '../hooks/useGetRecipes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/styles';

const Recipes = (props: any) => {
  const { route, navigation } = props;
  const categoryId = route.params.categoryId;
  const filterByUser = route.params.filterByUser ? route.params.filterByUser : null;
  const [currentCount, setCurrentCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, loading, error, refetch, fetchMore } = useGetRecipes({
    variables: {
      categoryId,
      offset: currentCount,
      limit: 10,
      author: filterByUser,
    },
    client: client,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, []);

  const handleLoadMore = () => {
    const hasNextPage = data?.recipes?.pageInfo?.hasNextPage;
    const totalCount = data?.recipes?.totalCount;

    if (hasNextPage && currentCount < totalCount) {
      fetchMore({
        variables: {
          offset: currentCount + 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            recipes: {
              totalCount: fetchMoreResult.recipes.totalCount,
              edges: [...prev.recipes.edges, ...fetchMoreResult.recipes.edges],
              pageInfo: fetchMoreResult.recipes.pageInfo,
              __typename: prev.recipes.__typename,
            },
          };
        },
      });

      setCurrentCount(currentCount + 10);
    }
  };

  const pullDownRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
      setCurrentCount(0);
      setIsRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <LoadingData />;
  if (error) return <NetworkRefresh message={error.message} refresh={() => refetch()} />;
  if (data?.recipes?.edges.length) {
    return (
      <View style={customStyles.container}>
        <FlatList
          onRefresh={() => pullDownRefresh()}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          data={data?.recipes?.edges}
          renderItem={({ item }) => (
            <RecipeItem navigation={navigation} item={item?.node} refresh={() => refetch()} />
          )}
          keyExtractor={(item) => item.node.id}
          maxToRenderPerBatch={8}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
  if (filterByUser) {
    return (
      <View style={customStyles.container}>
        <Text style={customStyles.noDataText}>
          It looks like you haven't created any recipes.{' '}
          <Icon name="sad-outline" size={24} color="black" />
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
            SheetManager.show('custom-sheet', {
              payload: { create: true },
            });
          }}
        >
          <Text style={styles.buttonText}>Create one now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={customStyles.container}>
      <Text style={customStyles.noDataText}>
        It looks like there aren't any recipes in this category.{' '}
        <Icon name="sad-outline" size={24} color="black" />
      </Text>
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ede5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  neutralButton: {
    shadowColor: 'rgba(0,0,0, 0.5)',
    marginTop: 10,
    shadowOpacity: 0.5,
  },
  customButton: {
    shadowColor: 'rgba(75,181,67, 0.5)',
    marginTop: 10,
    shadowOpacity: 0.5,
  },
  disabledButton: {
    shadowColor: 'rgba(255, 0, 0, 0.5)',
    marginTop: 10,
    shadowOpacity: 0.5,
  },
  customButtonText: {
    color: 'rgba(75,181,67, 0.5)',
  },
  neutralButtonText: {
    color: 'rgba(0,0,0, 0.5)',
  },
  disabledButtonText: {
    color: 'rgba(255, 0, 0, 0.5)',
  },
});
export default Recipes;
