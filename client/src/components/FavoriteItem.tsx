import React, { memo } from 'react';
import { Text, TouchableOpacity, Image, StyleSheet, View, Dimensions } from 'react-native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';

type Category = {
  name: string;
  image: string;
  cookTime: string;
  description: string;
};
const FavoriteItem = ({ item }: { item: Category }) => {
  const { name, image, cookTime, description } = item;
  return (
    <TouchableOpacity
      onPress={() => console.log(item)}
      style={[customStyles.favoriteCard, styles.shadow]}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={customStyles.favoriteCardImageContainer}>
          <Image
            source={{ uri: image }}
            style={customStyles.favoriteCardImage}
            defaultSource={require('../assets/images/missingImage.png')}
          />
        </View>
        <View style={customStyles.favoriteCardContent}>
          <Text style={customStyles.text}>{name}</Text>
          <View style={{ padding: 5 }}>
            <Text style={customStyles.cookTimeText}>
              <Icon name="time-outline" size={18} color="black" />
              {cookTime}
            </Text>

            <Text style={customStyles.descriptionText}>{description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const customStyles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cookTimeText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
  },
  favoriteCard: {
    maxHeight: 200,
    width: Dimensions.get('window').width / 1.1,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  favoriteCardImage: {
    height: 100,
    width: 100,
    borderRadius: 5,
    resizeMode: 'cover',
    opacity: 0.9,
  },
  favoriteCardContent: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  favoriteCardImageContainer: {
    height: 100,
    backgroundColor: 'brown',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default memo(FavoriteItem);
