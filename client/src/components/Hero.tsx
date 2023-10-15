import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import styles from '../styles/styles';

const Hero = ({ img }: { img?: string }) => {
  const renderHeroContent = () => {
    if (!img) {
      return (
        <>
          <Text style={[customStyles.text1, styles.intenseShadow]}>Welcome to</Text>
          <Text style={[customStyles.text2, styles.intenseShadow]}>the YumYumHub</Text>
          <Text style={[customStyles.text3, styles.intenseShadow]}>(Thanks ChatGPT)</Text>
        </>
      );
    }
    return null;
  };

  return (
    <View style={{ position: 'absolute', top: 0, left: 0 }}>
      <View style={customStyles.container}>
        <Image
          style={customStyles.heroImage}
          source={img ? { uri: img } : require('../assets/images/hero.png')}
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
    top: 20,
    left: 20,
    fontSize: 32,
    color: 'white',
  },
  text2: {
    position: 'absolute',
    top: 50,
    left: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  text3: {
    position: 'absolute',
    top: 85,
    left: 180,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  heroImage: {
    width: Dimensions.get('window').width,
    height: 200,
    opacity: 0.6,
  },
});

export default Hero;
