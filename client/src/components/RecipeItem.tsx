import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';

import FAIcon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/styles';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';


type RecipeItemProps = {
  item: {
    id: string;
    name: string;
    image: string;
    cookTime: string;
    description: string;
    cheerCount: number;
  };
  navigation: any;
  refresh: () => void;
};
const RecipeItem = (props: RecipeItemProps) => {
  const { item, navigation } = props;
  const { name, image, cookTime, description, cheerCount } = item;

  const handlePress = () =>
    navigation.navigate('Recipe', { recipeId: item.id, onGoBack: () => props.refresh() });

  return (
    <TouchableOpacity onPress={handlePress} style={[customStyles.card, styles.shadow]}>
      <View style={{ flexDirection: 'row' }}>
        <View style={customStyles.cardImageContainer}>
          <Image
            source={{ uri: image }}
            style={customStyles.cardImage}
            defaultSource={require('../assets/missingImage.png')}
          />
        </View>
        <View style={customStyles.cardContent}>
          <Text style={[customStyles.text, {fontSize: RFValue(16, Dimensions.get('window').height)}]}>{name}</Text>
          <View style={{ padding: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={customStyles.cookTimeText}>
                <Icon name="time-outline" size={18} color="black" />
                {cookTime}
              </Text>
              <Text style={customStyles.cookTimeText}>
                <FAIcon name="glass-cheers" size={16} color="#4285F4" />
                {cheerCount}
              </Text>
            </View>
            <Text style={customStyles.descriptionText}>{`${description.substring(
              0,
              50
            )}...`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const customStyles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
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
  card: {
    maxHeight: 200,
    width: Dimensions.get('window').width / 1.1,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  cardImage: {
    height: 100,
    width: 100,
    borderRadius: 5,
    resizeMode: 'cover',
    opacity: 0.9,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  cardImageContainer: {
    height: 100,
    backgroundColor: 'brown',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default memo(RecipeItem);
