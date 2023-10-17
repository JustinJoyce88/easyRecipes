import { View, StyleSheet} from 'react-native';
import React from 'react';
import Login from '../components/Login';

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
