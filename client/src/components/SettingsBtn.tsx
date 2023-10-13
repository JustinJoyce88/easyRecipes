import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsBtn = (props: any) => {
  const { navigation } = props;
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Add Category')} style={styles.container}>
      <Icon name="settings-sharp" size={32} color="gray" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});

export default SettingsBtn;
