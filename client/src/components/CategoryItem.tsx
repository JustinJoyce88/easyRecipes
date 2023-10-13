import React, { memo } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import styles from '../styles/styles';

type Category = {
  name: string;
};
const CategoryItem = ({ item }: { item: Category }) => {
  const { name } = item;
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        console.log('pressed');
      }}
    >
      <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.image} />
      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    height: 100,
    width: 120,
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.4,
    elevation: 3,
    backgroundColor: 'brown',
  },
  image: {
    opacity: 0.9,
    height: 100,
    width: 120,
    borderRadius: 5,
    resizeMode: 'cover',
  },
});

export default memo(CategoryItem);
