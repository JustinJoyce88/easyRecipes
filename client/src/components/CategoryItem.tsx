import React, { memo } from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import styles from '../styles/styles';

type Category = {
  name: string;
  image: string;
};
const CategoryItem = ({ item }: { item: Category }) => {
  const { name, image } = item;

  const handlePress = () => {
    console.log(item);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.categoryCard, styles.shadow]}
        onPress={handlePress}
      >
        <Image
          source={{ uri: image }}
          style={styles.categoryImage}
          defaultSource={require('../assets/images/missingImage.png')}
        />
      </TouchableOpacity>
      <Text style={customStyles.text}>{name}</Text>
    </View>
  );
};

const customStyles = StyleSheet.create({
  text: {
    backgroundColor: 'white',
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
});

export default memo(CategoryItem);
