import React from 'react';
import { Text, View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import renderIf from '../utils/renderIf';
import client from '../api/client';
import { useGetRecipe } from '../hooks/useGetRecipe';
import Icon from 'react-native-vector-icons/Ionicons';
import Hero from '../components/Hero';
import { SheetManager } from 'react-native-actions-sheet';
import NetworkRefresh from '../components/NetworkRefresh';
import LoadingData from '../components/LoadingData';
import { gql, useMutation } from '@apollo/client';

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($deleteRecipeId: ID!) {
    deleteRecipe(id: $deleteRecipeId)
  }
`;

const Recipe = (props: any) => {
  const { route } = props;
  const recipeId = route.params.recipeId;
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const { data, loading, error, refetch } = useGetRecipe({
    variables: {
      recipeId,
    },
    client: client,
  });

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
            {item}
          </Text>
        ))}
      </View>
    );
  };

  const handleEdit = () =>
    SheetManager.show('custom-sheet', {
      payload: { data },
    });

  const handleDelete = async () => {
    try {
      const { data } = await deleteRecipe({
        variables: {
          deleteRecipeId: recipeId,
        },
      });
      if (data?.deleteRecipe) {
        props.route.params.onGoBack();
        props.navigation.goBack();
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
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Icon
                style={{ marginRight: 10 }}
                onPress={handleEdit}
                name="create-outline"
                size={38}
                color={'#4285F4'}
              />
              <Icon onPress={alertDelete} name="trash-outline" size={38} color={'#de5246'} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={customStyles.headerText}>{data?.recipe?.name}</Text>
            </View>
            <Text style={customStyles.subHeaderText}>{data?.recipe?.description}</Text>

            <Text style={customStyles.cookTimeText}>
              <Icon name="time-outline" size={18} color="black" />
              {data?.recipe?.cookTime}
            </Text>
            {renderIf(
              data?.recipe?.curatorFavorited,
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('../assets/images/icon.png')}
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
    fontSize: 16,
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
});

export default Recipe;
