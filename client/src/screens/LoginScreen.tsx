import { StyleSheet, View } from 'react-native';

import Login from '../components/Login';
import React from 'react';

const LoginScreen = (props: any) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Login navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f9ede5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
