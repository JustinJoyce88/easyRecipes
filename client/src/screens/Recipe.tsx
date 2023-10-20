import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { gql, useMutation } from '@apollo/client';

import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Hero from '../components/Hero';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingData from '../components/LoadingData';
import NetworkRefresh from '../components/NetworkRefresh';
import { RootState } from '../reducers';
import { SheetManager } from 'react-native-actions-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import client from '../api/client';
import renderIf from '../utils/renderIf';
import { useGetRecipe } from '../hooks/useGetRecipe';
import { useSelector } from 'react-redux';

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($deleteRecipeId: ID!) {
    deleteRecipe(id: $deleteRecipeId)
  }
`;

const UPDATE_CHEER = gql`
  mutation UpdateCheer($updateRecipeId: ID!, $input: UpdateRecipeInput!) {
    updateRecipe(id: $updateRecipeId, input: $input) {
      cheerCount
    }
  }
`;

const Recipe = (props: any) => {
  const { route } = props;
  const recipeId = route.params.recipeId;

  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const [updateCheer] = useMutation(UPDATE_CHEER);

  const user = useSelector((state: RootState) => state.persist.user);
  const { data, loading, error, refetch } = useGetRecipe({
    variables: {
      recipeId,
    },
    client: client,
  });

  const isOwner = user.username === data?.recipe.author || user.admin;

  if (loading) return <LoadingData />;
  if (error) return <NetworkRefresh message={error.message} refresh={() => refetch()} />;

  const renderIngredients = () => {
    const { ingredients } = data?.recipe || {};

    return (
      <View style={{ marginTop: 10 }}>
        <Text style={customStyles.instructionsText}>Ingredients</Text>
        {ingredients.map((item: string, index: number) => (
          <Text key={index} style={customStyles.arrayText}>
            &#8226; {item}
          </Text>
        ))}
      </View>
    );
  };

  const renderInstructions = () => {
    const { instruction } = data?.recipe || {};

    return (
      <View style={{ marginTop: 10 }}>
        <Text style={customStyles.instructionsText}>Instructions</Text>
        {instruction.map((item: string, index: number) => (
          <Text key={index} style={customStyles.arrayText}>
            {index + 1}. {item.replace(/^\d+\./gm, '')}
          </Text>
        ))}
      </View>
    );
  };

  const handleEdit = () =>
    SheetManager.show('custom-sheet', {
      payload: { data, create: false },
    });

  const handleDelete = async () => {
    try {
      const { data } = await deleteRecipe({
        variables: {
          deleteRecipeId: recipeId,
        },
      });
      if (data?.deleteRecipe) {
        route.params.onGoBack();
        props.navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert('Error: ', error);
    }
  };

  const handleUpdateCheer = async (currentCount: number) => {
    try {
      const { data } = await updateCheer({
        variables: {
          updateRecipeId: recipeId,
          input: {
            cheerCount: currentCount + 1,
          },
        },
      });
      if (data?.updateRecipe) {
        refetch();
      }
    } catch (error: any) {
      Alert.alert('Error: ', error);
    }
  };

  const alertDelete = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this recipe?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => handleDelete(),
      },
    ]);
  };

  return (
    <View style={customStyles.container}>
      <Hero img={data?.recipe?.image} opacity={1} />
      <ScrollView
        style={customStyles.scrollView}
        contentContainerStyle={customStyles.contentContainer}
      >
        <View style={customStyles.textContainer}>
          <View style={{ padding: 10 }}>
            {renderIf(
              isOwner,
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={handleEdit}>
                  <Icon
                    style={{ marginRight: 10 }}
                    name="create-outline"
                    size={38}
                    color={'#4285F4'}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={alertDelete}>
                  <Icon name="trash-outline" size={38} color={'#de5246'} />
                </TouchableOpacity>
              </View>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={customStyles.headerText}>{data?.recipe?.name}</Text>
            </View>
            <Text style={customStyles.subHeaderText}>{data?.recipe?.description}</Text>
            <View style={customStyles.cookTimeLine}>
              <Text style={customStyles.cookTimeText}>
                <Icon name="time-outline" size={20} color="black" />
                {data?.recipe?.cookTime}
              </Text>
              <TouchableOpacity
                disabled={isOwner}
                onPress={() => handleUpdateCheer(data?.recipe?.cheerCount)}
              >
                <Text style={customStyles.cheerCountText}>
                  <FAIcon name="glass-cheers" size={20} color="#4285F4" />
                  {data?.recipe?.cheerCount}
                </Text>
              </TouchableOpacity>
            </View>
            <Text>Author: {data?.recipe?.author}</Text>
            {renderIf(
              data?.recipe?.curatorFavorited,
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../../assets/icon.png')}
                />
                <Text style={customStyles.favoritedText}>YumYum Seal of Approval!</Text>
              </View>
            )}
          </View>
          <View style={{ padding: 10 }}>
            {renderIngredients()}
            {renderInstructions()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ede5',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 16,
  },
  cookTimeText: {
    paddingTop: 10,
    fontSize: 20,
  },
  cheerCountText: {
    paddingTop: 10,
    fontSize: 24,
  },
  favoritedText: {
    paddingTop: 10,
    paddingLeft: 5,
    fontSize: 16,
  },
  instructionsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  arrayText: {
    fontSize: 14,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  textContainer: {
    backgroundColor: '#f9ede5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    zIndex: 10,
    paddingTop: 200,
  },
  cookTimeLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Recipe;
