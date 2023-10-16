import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CategoryList from '../components/CategoryList';
import FavoritesList from '../components/FavoritesList';
import SettingsBtn from '../components/SettingsBtn';

const Home = (props: any) => {
  const { navigation } = props;

  return (
    <View style={customStyles.container}>
      <Hero opacity={0.6} />
      <ScrollView
        style={customStyles.scrollView}
        contentContainerStyle={customStyles.contentContainer}
      >
        <View style={{ backgroundColor: '#f9ede5' }}>
          <Header headerTitle="Explore Categories" />
          <CategoryList />
          <Header headerTitle="Our Favorites" />
          <FavoritesList navigation={navigation} />
        </View>
      </ScrollView>
      <SettingsBtn navigation={navigation} />
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ede5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    zIndex: 10,
    paddingTop: 200,
  },
});

export default Home;
