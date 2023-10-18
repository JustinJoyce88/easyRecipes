import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import React from 'react';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="black" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ede5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Loading;
