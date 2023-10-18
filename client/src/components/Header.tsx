import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

type HeaderProps = {
  headerTitle: string;
};

const Header = ({ headerTitle }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{headerTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginLeft: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.7)',
  },
});

export default Header;
