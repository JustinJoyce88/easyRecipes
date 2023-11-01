import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';

import styles from '../styles/styles';

type Category = {
  name: string;
  image: string;
  id: string;
};
const CategoryItem = (props: { item: Category; navigation: any }) => {
  const { name, image, id } = props.item;
  const { navigation } = props;

  const handlePress = () => {
    navigation.navigate('Recipes', { categoryId: id });
  };

  return (
    <View>
      <TouchableOpacity style={[customStyles.categoryCard, styles.shadow]} onPress={handlePress}>
        <Image
          source={{ uri: image }}
          style={customStyles.categoryImage}
          defaultSource={require('../assets/missingImage.jpeg')}
        />
      </TouchableOpacity>
      <Text style={customStyles.text}>{name}</Text>
    </View>
  );
};

const customStyles = StyleSheet.create({
  text: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  categoryCard: {
    height: 100,
    width: 120,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'brown',
  },
  categoryImage: {
    opacity: 0.9,
    height: 100,
    width: 120,
    borderRadius: 5,
    resizeMode: 'cover',
  },
});

export default memo(CategoryItem);
