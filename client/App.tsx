import { SafeAreaView, StyleSheet } from 'react-native';
import { persistor, store } from './src/store/store';

import Recipe from './src/screens/Recipe';
import Home from './src/screens/Home';
import AddCategory from './src/screens/AddCategory';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './src/api/client';

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{ title: 'Easy Recipes' }} name="Home" component={Home} />
                <Stack.Screen name="Recipe" component={Recipe} />
                <Stack.Screen
                  options={{ headerBackTitle: '' }}
                  name="Add Category"
                  component={AddCategory}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
