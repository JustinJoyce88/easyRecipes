import ActionSheet, { SheetManager, SheetProps } from 'react-native-actions-sheet';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ReactNode, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { GET_RECIPE } from '../hooks/useGetRecipe';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { RootState } from '../reducers';
import { checkIfValidUrl } from '../utils/checkIfValidUrl';
import client from '../api/client';
import renderIf from '../utils/renderIf';
import styles from '../styles/styles';
import { useGetCategories } from '../hooks/useGetCategories';
import { useSelector } from 'react-redux';

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($updateRecipeId: ID!, $input: UpdateRecipeInput!) {
    updateRecipe(id: $updateRecipeId, input: $input) {
      name
      id
    }
  }
`;

const CREATE_RECIPE = gql`
  mutation CreateRecipe($input: AddRecipeInput!) {
    addRecipe(input: $input) {
      id
      name
    }
  }
`;

const CustomSheet = (props: SheetProps) => {
  const { payload } = props;

  const recipeId = payload?.data?.recipe?.id;
  const [recipeForm, setRecipeForm] = useState(
    payload?.data?.recipe ? payload?.data?.recipe : { ingredients: [''], instruction: [''] }
  );
  const [altError, setAltError] = useState<string | unknown>('');

  const user = useSelector((state: RootState) => state.persist.user);

  const { data: categoryData } = useGetCategories();
  const [selectedCategory, setSelectedCategory] = useState(categoryData?.categories[0]?.id);

  const [updateRecipe, { loading, error }] = useMutation(UPDATE_RECIPE, {
    client: client,
    refetchQueries: [{ query: GET_RECIPE, variables: { recipeId } }],
  });
  const [createRecipe] = useMutation(CREATE_RECIPE, {
    client: client,
  });
  const isAnyIndexEmptyIngredients = recipeForm.ingredients.some(
    (ingredient: string) => ingredient === ''
  );
  const isAnyIndexEmptyInstruction = recipeForm.instruction.some((ins: string) => ins === '');
  const cantSubmit =
    !recipeForm.name ||
    !recipeForm.image ||
    !recipeForm.description ||
    !recipeForm.cookTime ||
    isAnyIndexEmptyIngredients ||
    isAnyIndexEmptyInstruction;

  const errorChecking = () => {
    let isAnyConditionMet = false;
    let errorConcatenation = '';
    const isAnyIndexEmpty = recipeForm.ingredients.some((ingredient: string) => ingredient === '');
    const isAnyIndexEmptyInstruction = recipeForm.instruction.some((ins: string) => ins === '');
    if (!recipeForm.name) {
      errorConcatenation = 'Please enter a recipe name\n';
      isAnyConditionMet = true;
    }
    if (!recipeForm.image) {
      errorConcatenation += 'Please enter an image URL\n';
      isAnyConditionMet = true;
    }
    if (!recipeForm.description) {
      errorConcatenation += 'Please enter a description\n';
      isAnyConditionMet = true;
    }
    if (!recipeForm.cookTime) {
      errorConcatenation += 'Please enter a cook time\n';
      isAnyConditionMet = true;
    }
    if (isAnyIndexEmpty) {
      errorConcatenation += 'Please enter all ingredients\n';
      isAnyConditionMet = true;
    }
    if (isAnyIndexEmptyInstruction) {
      errorConcatenation += 'Please enter all instructions\n';
      isAnyConditionMet = true;
    }
    if (!checkIfValidUrl(recipeForm.image)) {
      errorConcatenation += 'Please enter a valid image URL\n';
      isAnyConditionMet = true;
    }
    setAltError(errorConcatenation);
    return isAnyConditionMet;
  };

  const handleupdateRecipe = async () => {
    const {
      name,
      image,
      description,
      cookTime,
      ingredients,
      instruction,
      curatorFavorited,
      cheerCount,
    } = recipeForm;
    const foundAnError = errorChecking();
    if (foundAnError) return;

    try {
      const { data } = await updateRecipe({
        variables: {
          updateRecipeId: recipeId,
          input: {
            name,
            author: user.username,
            cookTime,
            description,
            image,
            ingredients,
            instruction,
            curatorFavorited,
            cheerCount,
            categoryId: selectedCategory,
          },
        },
      });
      if (data?.updateRecipe?.id) SheetManager.hide('custom-sheet');
    } catch (error) {
      setAltError(error);
    }
  };

  const handleCreateRecipe = async () => {
    const { name, image, description, cookTime, ingredients, instruction } = recipeForm;
    const foundAnError = errorChecking();
    if (foundAnError) return;
    try {
      const { data } = await createRecipe({
        variables: {
          input: {
            name,
            author: user.username,
            cookTime,
            description,
            image,
            ingredients,
            instruction,
            curatorFavorited: false,
            cheerCount: 0,
            categoryId: selectedCategory,
          },
        },
      });
      console.log('🚀 ~ file: CustomSheet.tsx:187 ~ handleCreateRecipe ~ data:', data);
      if (data?.addRecipe?.id) SheetManager.hide('custom-sheet');
    } catch (error) {
      setAltError(error);
    }
  };

  const confirmURL = (val: string) => {
    const isUrl = checkIfValidUrl(val);
    if (!isUrl) {
      setAltError('Please enter a valid URL');
    }
    setAltError('');
    setRecipeForm({ ...recipeForm, image: val });
  };

  const renderIngredient = (index: number) => {
    return (
      <View
        key={index}
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <TextInput
          multiline
          value={recipeForm.ingredients[index]}
          style={[customStyles.arrayInput, styles.shadow]}
          onChangeText={(val) => {
            const updatedIngredients = [...recipeForm.ingredients];
            updatedIngredients[index] = val;
            setRecipeForm({ ...recipeForm, ingredients: updatedIngredients });
          }}
        />
        <Icon
          disabled={recipeForm.ingredients.length === 1}
          style={{ paddingRight: 10 }}
          name="trash-outline"
          size={38}
          color={'#de5246'}
          onPress={() => {
            const updatedIngredients = [...recipeForm.ingredients];
            updatedIngredients.splice(index, 1);
            setRecipeForm({ ...recipeForm, ingredients: updatedIngredients });
          }}
        />
      </View>
    );
  };

  const renderInstructionStep = (index: number) => {
    return (
      <View
        key={index}
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <TextInput
          multiline
          value={recipeForm.instruction[index]}
          style={[customStyles.arrayInput, styles.shadow]}
          onChangeText={(val) => {
            const updatedInstructions = [...recipeForm.instruction];
            updatedInstructions[index] = val;
            setRecipeForm({ ...recipeForm, instruction: updatedInstructions });
          }}
        />
        <Icon
          disabled={recipeForm.ingredients.length === 1}
          style={{ paddingRight: 10 }}
          name="trash-outline"
          size={38}
          color={'#de5246'}
          onPress={() => {
            const updatedInstructions = [...recipeForm.instruction];
            updatedInstructions.splice(index, 1);
            setRecipeForm({ ...recipeForm, instruction: updatedInstructions });
          }}
        />
      </View>
    );
  };

  return (
    <ActionSheet containerStyle={customStyles.container} headerAlwaysVisible id={props.sheetId}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 100 }}>
          <Text style={customStyles.formLabel}>Recipe Name</Text>
          <TextInput
            value={recipeForm.name}
            maxLength={30}
            style={[styles.input, styles.shadow]}
            placeholder="Recipe name"
            onChangeText={(val) => {
              if (val) {
                setAltError('');
              }
              setRecipeForm({ ...recipeForm, name: val });
            }}
          />
          <Text style={customStyles.formLabel}>Recipe Description</Text>
          <TextInput
            value={recipeForm.description}
            maxLength={30}
            style={[styles.input, styles.shadow]}
            placeholder="Recipe Description"
            onChangeText={(val) => {
              if (val) {
                setAltError('');
              }
              setRecipeForm({ ...recipeForm, description: val });
            }}
          />
          <Text style={customStyles.formLabel}>Recipe Cook Time</Text>
          <TextInput
            value={recipeForm.cookTime}
            maxLength={30}
            style={[styles.input, styles.shadow]}
            placeholder="Recipe Cook Time"
            onChangeText={(val) => {
              if (val) {
                setAltError('');
              }
              setRecipeForm({ ...recipeForm, cookTime: val });
            }}
          />
          <Text style={customStyles.formLabel}>Recipe Image URL</Text>
          <TextInput
            value={recipeForm.image}
            autoCapitalize="none"
            style={[styles.input, styles.shadow]}
            placeholder="Image URL"
            onChangeText={(val) => confirmURL(val)}
          />
          <Text style={customStyles.formLabel}>Ingredients</Text>
          {recipeForm.ingredients.map((ingredient: string, index: number) =>
            renderIngredient(index)
          )}
          <TouchableOpacity
            style={[styles.button, styles.shadow]}
            onPress={() => {
              const updatedIngredients = [...recipeForm.ingredients];
              updatedIngredients.push('');
              setRecipeForm({ ...recipeForm, ingredients: updatedIngredients });
            }}
          >
            <Text>Add Ingredient</Text>
          </TouchableOpacity>
          <Text style={customStyles.formLabel}>Instructions</Text>
          {recipeForm.instruction.map((ins: string, index: number) => renderInstructionStep(index))}
          <TouchableOpacity
            style={[styles.button, styles.shadow]}
            onPress={() => {
              const updatedInstructions = [...recipeForm.instruction];
              updatedInstructions.push('');
              setRecipeForm({ ...recipeForm, instruction: updatedInstructions });
            }}
          >
            <Text>Add Step</Text>
          </TouchableOpacity>
          <Text style={customStyles.formLabel}>Category</Text>
          <Picker
            style={{ marginBottom: 25 }}
            mode="dropdown"
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
          >
            {categoryData?.categories.map((item: any) => (
              <Picker.Item label={item.name} value={item.id} key={item.id} />
            ))}
          </Picker>
          <TouchableOpacity
            disabled={loading}
            style={[
              styles.button,
              styles.shadow,
              cantSubmit ? customStyles.disabledButton : customStyles.customButton,
            ]}
            onPress={() => (payload.create ? handleCreateRecipe() : handleupdateRecipe())}
          >
            {renderIf(
              !loading,
              <Text
                style={[
                  styles.buttonText,
                  cantSubmit ? customStyles.disabledButtonText : customStyles.customButtonText,
                ]}
              >
                Submit
              </Text>
            )}
            {renderIf(loading, <ActivityIndicator />)}
          </TouchableOpacity>
          {renderIf(error, <Text style={styles.error}>Error: {error?.message}</Text>)}
          {renderIf(altError, <Text style={styles.error}>Error: {altError as ReactNode}</Text>)}
        </View>
      </ScrollView>
    </ActionSheet>
  );
};

const customStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f9ede5',
    height: '80%',
  },
  formLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.7)',
    marginLeft: 10,
    marginTop: 10,
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
  disabledButtonText: {
    color: 'rgba(255, 0, 0, 0.5)',
  },
  arrayInput: {
    margin: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    width: '80%',
  },
});

export default CustomSheet;
