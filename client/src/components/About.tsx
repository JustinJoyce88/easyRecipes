import { StyleSheet, Text, View, Linking } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const About = () => {
  return (
    <>
      <View style={styles.test}></View>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Developed and designed by: <Text style={{ fontWeight: 'bold' }}>Justin Joyce</Text>{' '}
          </Text>
        </View>
        <View style={styles.social}>
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/justinjoyce88')}>
            <Icon name="github" size={32} color="#6e5494" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.linkedin.com/in/justinjoyce88/')}
          >
            <Icon name="linkedin" size={32} color="#0077B5" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:justinjoyce88@gmail.com')}>
            <Icon name="gmail" size={32} color="#c71610" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 300,
    position: 'absolute',
    bottom: 75,
    right: 60,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'space-evenly',
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  test: {
    height: 15,
    width: 15,
    position: 'absolute',
    bottom: 60,
    right: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 2,
  },
});

export default About;
