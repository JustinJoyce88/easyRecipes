import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import styles from '../styles/styles';

const Hero = ({ img, opacity }: { img?: string; opacity?: number }) => {
  const renderHeroContent = () => {
    if (!img) {
      return (
        <>
          <Image
            source={require('../../assets/icon.png')}
            style={[customStyles.icon, styles.intenseShadow]}
            defaultSource={require('../assets/missingImage.jpeg')}
          />
          <Text style={[customStyles.text1, styles.intenseShadow]}>Welcome to</Text>
          <Text style={[customStyles.text2, styles.intenseShadow]}>the YumYumHub</Text>
        </>
      );
    }
    return null;
  };

  return (
    <View style={{ position: 'absolute', top: 0, left: 0 }}>
      <View style={customStyles.container}>
        <Image
          style={[customStyles.heroImage, { opacity }]}
          source={img ? { uri: img } : require('../assets/hero.jpeg')}
          defaultSource={require('../assets/missingImage.jpeg')}
        />
      </View>
      {renderHeroContent()}
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  text1: {
    position: 'absolute',
    top: 85,
    left: 30,
    fontSize: 42,
    color: 'white',
  },
  text2: {
    position: 'absolute',
    top: 120,
    left: 30,
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
  },
  heroImage: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  icon: {
    top: 5,
    right: 0,
    position: 'absolute',
    width: 120,
    height: 120,
  },
});

export default Hero;
