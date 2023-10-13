import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles/styles';
import { TextInput } from 'react-native-gesture-handler';
import { useMutation, gql } from '@apollo/client';
import renderIf from '../utils/renderIf';
import client from '../api/client';
import { GET_CATEGORIES } from '../hooks/useCreateCategory';

const CREATE_CATEGORY = gql`
  mutation Mutation($input: AddCategoryInput!) {
    addCategory(input: $input) {
      name
    }
  }
`;

const AddCategory = () => {
  const [name, setName] = useState('');
  const [createCategory, { loading, error }] = useMutation(CREATE_CATEGORY, {
    client: client,
    refetchQueries: [{ query: GET_CATEGORIES }],
  });

  const handleCreateCategory = async () => {
    try {
      const { data } = await createCategory({
        variables: { input: { name: name } },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.shadow]}
        placeholder="Category name"
        onChangeText={setName}
      />
      <TouchableOpacity
        style={[
          styles.button,
          styles.shadow,
          !name ? stylesCustom.customButton : stylesCustom.disabledButton,
        ]}
        onPress={handleCreateCategory}
      >
        {renderIf(!loading, <Text>Submit</Text>)}
        {renderIf(loading, <ActivityIndicator />)}
      </TouchableOpacity>
      {renderIf(error, <Text style={styles.error}>Error: {error?.message}</Text>)}
    </View>
  );
};

const stylesCustom = StyleSheet.create({
  customButton: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
  },
  disabledButton: {
    marginTop: 10,
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
  },
});
export default AddCategory;
