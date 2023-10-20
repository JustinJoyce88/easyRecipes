import { StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import About from './About';
import * as Animatable from 'react-native-animatable';

const AboutBtn = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setIsVisible(!isVisible)}>
        <Icon name="dev-to" size={32} color="white" />
      </TouchableOpacity>
      {isVisible && (
        <Animatable.View
          animation={isVisible ? 'fadeIn' : 'fadeOut'}
          duration={300}
        >
          <About />
        </Animatable.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 8,
    zIndex: 10,
  },
});

export default AboutBtn;
