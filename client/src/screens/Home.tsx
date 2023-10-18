import { ScrollView, StyleSheet, View } from 'react-native';

import CategoryList from '../components/CategoryList';
import FavoritesList from '../components/FavoritesList';
import Header from '../components/Header';
import Hero from '../components/Hero';
import React from 'react';
import { RootState } from '../reducers';
import SettingsBtn from '../components/SettingsBtn';
import ToolBar from '../components/ToolBar';
import renderIf from '../utils/renderIf';
import { useSelector } from 'react-redux';

const Home = (props: any) => {
  const { navigation } = props;
  const user = useSelector((state: RootState) => state.persist.user);

  return (
    <View style={customStyles.container}>
      <Hero opacity={0.6} />
      <ScrollView
        style={customStyles.scrollView}
        contentContainerStyle={customStyles.contentContainer}
      >
        <View style={{ backgroundColor: '#f9ede5' }}>
          <ToolBar navigation={navigation} />
          <Header headerTitle="Explore Categories" />
          <CategoryList navigation={navigation} />
          <Header headerTitle="Our Favorites" />
          <FavoritesList navigation={navigation} />
        </View>
      </ScrollView>
      {renderIf(user && user.admin, <SettingsBtn navigation={navigation} />)}
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
