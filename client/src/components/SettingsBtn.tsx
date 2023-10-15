import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsBtn = ({ navigation }: { navigation: any }) => {
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
