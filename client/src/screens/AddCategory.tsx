import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, ReactNode } from 'react';
import styles from '../styles/styles';
import { TextInput } from 'react-native-gesture-handler';
import { useMutation, gql } from '@apollo/client';
import renderIf from '../utils/renderIf';
import client from '../api/client';
import { GET_CATEGORIES } from '../hooks/useGetCategories';
import { checkIfValidURL } from '../utils/checkIfValidURL';

const CREATE_CATEGORY = gql`
  mutation Mutation($input: AddCategoryInput!) {
    addCategory(input: $input) {
      name
    }
  }
`;

const AddCategory = () => {
  const [name, setName] = useState('');
  const [url, setURL] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [altError, setAltError] = useState<string | unknown>('');
  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY, {
    client: client,
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const cantSubmit = !name || !url;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleCreateCategory = async () => {
    if (!name) {
      setAltError('Please enter a name');
      return;
    }
    if (!url) {
      setAltError('Please enter a URL');
      return;
    }
    if (!checkIfValidURL(url)) {
      setAltError('Please enter a valid URL');
      return;
    }
    try {
      const { data } = await createCategory({ variables: { input: { name: name, image: url } } });
      if (data?.addCategory?.name) {
        setSubmitSuccess(`${data.addCategory.name} added as a category!`);
        setName('');
        setURL('');
        setTimeout(() => setSubmitSuccess(''), 3000);
      }
    } catch (error) {
      setAltError(error);
    }
  };

  const confirmURL = (val: string) => {
    const isUrl = checkIfValidURL(val);
    if (!isUrl) {
      setAltError('Please enter a valid URL');
    }
    setAltError('');
    setURL(val);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TextInput
          value={name}
          maxLength={18}
          style={[styles.input, styles.shadow]}
          placeholder="Category name"
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
            cantSubmit ? stylesCustom.disabledButton : stylesCustom.customButton,
          ]}
          onPress={handleCreateCategory}
        >
          {renderIf(
            !loading,
            <Text
              style={[
                styles.buttonText,
                cantSubmit ? stylesCustom.disabledButtonText : stylesCustom.customButtonText,
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
    </TouchableWithoutFeedback>
  );
};

const stylesCustom = StyleSheet.create({
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
export default AddCategory;
