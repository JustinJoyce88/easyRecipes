import './sheets';

import { SafeAreaView, StyleSheet, LogBox } from 'react-native';
import { persistor, store } from './src/store/store';

import AddCategory from './src/screens/AddCategory';
import { ApolloProvider } from '@apollo/react-hooks';
import CreateAccount from './src/screens/CreateUser';
import Home from './src/screens/Home';
import LoginScreen from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import Recipe from './src/screens/Recipe';
import Recipes from './src/screens/Recipes';
import { SheetProvider } from 'react-native-actions-sheet';
import client from './src/api/client';
import { createStackNavigator } from '@react-navigation/stack';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <SheetProvider>
            <SafeAreaView
              style={styles.container}
            >
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
