import { View, Image } from 'react-native';
import React from 'react';
import Login from '../components/Login';
import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import SettingsBtn from '../components/SettingsBtn';
import styles from '../styles/styles';

const Home = (props: any) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Header />
      <CategoryList />
      <SettingsBtn navigation={navigation} />
    </View>
  );
};

export default Home;
