import { SafeAreaView, StyleSheet, LogBox } from 'react-native';
import { persistor, store } from './src/store/store';

import Recipe from './src/screens/Recipe';
import Home from './src/screens/Home';
import AddCategory from './src/screens/AddCategory';
import Recipes from './src/screens/Recipes';
import LoginScreen from './src/screens/LoginScreen';
import CreateAccount from './src/screens/CreateUser';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './src/api/client';
import { SheetProvider } from 'react-native-actions-sheet';
import './sheets';

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <SheetProvider>
            <SafeAreaView style={styles.container}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="LoginScreen">
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="LoginScreen"
                    component={LoginScreen}
                  />
                  <Stack.Screen
                    options={{
                      headerTitle: '',
                      headerBackTitle: 'Login',
                      headerBackTitleStyle: { color: 'white' },
                      headerStyle: { backgroundColor: 'black' },
                      headerTintColor: 'white',
                    }}
                    name="CreateAccount"
                    component={CreateAccount}
                  />
                  <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                  <Stack.Screen
                    options={{
                      headerTitle: '',
                      headerBackTitleStyle: { color: 'white' },
                      headerStyle: { backgroundColor: 'black' },
                      headerTintColor: 'white',
                    }}
                    name="Recipe"
                    component={Recipe}
                  />
                  <Stack.Screen
                    options={{
                      headerTitle: '',
                      headerBackTitleStyle: { color: 'white' },
                      headerStyle: { backgroundColor: 'black' },
                      headerTintColor: 'white',
                    }}
                    name="Add Category"
                    component={AddCategory}
                  />
                  <Stack.Screen
                    options={{
                      headerTitle: '',
                      headerBackTitleStyle: { color: 'white' },
                      headerStyle: { backgroundColor: 'black' },
                      headerTintColor: 'white',
                    }}
                    name="Recipes"
                    component={Recipes}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </SheetProvider>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;
