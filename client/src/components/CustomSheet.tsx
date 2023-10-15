import React, { useRef, useState, useEffect, ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ActionSheet, { SheetProps, SheetManager } from 'react-native-actions-sheet';
import { useMutation, gql } from '@apollo/client';
import client from '../api/client';
import { GET_RECIPE } from '../hooks/useGetRecipe';
import { checkIfValidUrl } from '../utils/checkIfValidUrl';
import styles from '../styles/styles';
import renderIf from '../utils/renderIf';

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($updateRecipeId: ID!, $input: UpdateRecipeInput!) {
    updateRecipe(id: $updateRecipeId, input: $input) {
      name
      id
    }
  }
`;

const CustomSheet = (props: SheetProps) => {
  const { payload } = props;
  const recipeId = payload?.data?.recipe?.id;
  const [name, setName] = useState(payload?.data?.recipe?.name);
  const [url, setURL] = useState(payload?.data?.recipe?.image);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [altError, setAltError] = useState<string | unknown>('');
  const [updateRecipe, { loading, error }] = useMutation(UPDATE_RECIPE, {
    client: client,
    refetchQueries: [{ query: GET_RECIPE, variables: { recipeId } }],
  });

  const cantSubmit = !name || !url;

  const handleupdateRecipe = async () => {
    if (!name) return setAltError('Please enter a recipe name');
    if (!url) return setAltError('Please enter a URL');
    if (!checkIfValidUrl(url)) return setAltError('Please enter a valid URL');

    try {
      const { data } = await updateRecipe({
        variables: { updateRecipeId: recipeId, input: { name, image: url } },
      });
      if (data?.updateRecipe?.id) SheetManager.hide('custom-sheet');
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
    setURL(val);
  };

  return (
    <ActionSheet headerAlwaysVisible id={props.sheetId}>
      <View style={customStyles.container}>
        <TextInput
          value={name}
          maxLength={30}
          style={[styles.input, styles.shadow]}
          placeholder="Recipe name"
          onChangeText={(val) => {
            if (val) {
              setAltError('');
            }
            setName(val);
          }}
        />
        <TextInput
          value={url}
          autoCapitalize="none"
          style={[styles.input, styles.shadow]}
          placeholder="Image URL"
          onChangeText={(val) => confirmURL(val)}
        />
        <TouchableOpacity
          disabled={loading}
          style={[
            styles.button,
            styles.shadow,
            cantSubmit ? customStyles.disabledButton : customStyles.customButton,
          ]}
          onPress={handleupdateRecipe}
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
        {renderIf(submitSuccess, <Text style={styles.success}>{submitSuccess}</Text>)}
      </View>
    </ActionSheet>
  );
};

const customStyles = StyleSheet.create({
  container: {
    height: '80%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.7)',
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
});

export default CustomSheet;
