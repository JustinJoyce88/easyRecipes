import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { ReactNode, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { GET_CATEGORIES } from '../hooks/useGetCategories';
import { TextInput } from 'react-native-gesture-handler';
import { checkIfValidUrl } from '../utils/checkIfValidUrl';
import client from '../api/client';
import styles from '../styles/styles';

const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: AddCategoryInput!) {
    addCategory(input: $input) {
      name
    }
  }
`;

const AddCategory = () => {
  const [name, setName] = useState('');
  const [url, setURL] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [altError, setAltError] = useState('');
  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY, {
    client: client,
    refetchQueries: [{ query: GET_CATEGORIES }],
  });
  // the !! notation turns it into a boolean
  const emptyForm: boolean = !name && !url;
  const canSubmit: boolean = !!name && !!url;
  let buttonStyle = customStyles.neutralButton;
  let textStyle = customStyles.neutralButtonText;

  switch (true) {
    case altError.length > 0:
      buttonStyle = customStyles.disabledButton;
      textStyle = customStyles.disabledButtonText;
      break;
    case emptyForm:
      buttonStyle = customStyles.neutralButton;
      textStyle = customStyles.neutralButtonText;
      break;
    case canSubmit:
      buttonStyle = customStyles.customButton;
      textStyle = customStyles.customButtonText;
      break;
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleCreateCategory = async () => {
    if (!name) {
      return setAltError('Please enter a name');
    }
    if (!url) {
      return setAltError('Please enter a URL');
    }
    if (!checkIfValidUrl(url)) {
      return setAltError('Please enter a valid URL');
    }
    try {
      const { data } = await createCategory({ variables: { input: { name, image: url } } });
      if (data?.addCategory?.name) {
        setSubmitSuccess(`${data.addCategory.name} added as a category!`);
        setName('');
        setURL('');
        setTimeout(() => setSubmitSuccess(''), 3000);
      }
    } catch (error: any) {
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
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={customStyles.container}>
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
          style={[styles.button, styles.shadow, buttonStyle]}
          onPress={handleCreateCategory}
        >
          {!loading && <Text style={[styles.buttonText, textStyle]}>Submit</Text>}
          {loading && <ActivityIndicator />}
        </TouchableOpacity>
        {error && <Text style={styles.error}>Error: {error?.message}</Text>}
        {altError && <Text style={styles.error}>Error: {altError as ReactNode}</Text>}
        {submitSuccess && <Text style={styles.success}>{submitSuccess}</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ede5',
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
export default AddCategory;
