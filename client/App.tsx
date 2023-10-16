import { SafeAreaView, StyleSheet, LogBox } from 'react-native';
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
import { SheetProvider } from 'react-native-actions-sheet';
import './sheets';

const IGNORED_LOGS = [''];

LogBox.ignoreLogs(IGNORED_LOGS);

type LoggerFunction = (...args: any[]) => void;

if (__DEV__) {
  const withoutIgnored = (logger: LoggerFunction): LoggerFunction => {
    return (...args: any[]): void => {
      const output: string = args.join(' ');

      if (!IGNORED_LOGS.some((log: string) => output.includes(log))) {
        logger(...args);
      }
    };
  };
  console.log = withoutIgnored(console.log);
  console.info = withoutIgnored(console.info);
  console.warn = withoutIgnored(console.warn);
  console.error = withoutIgnored(console.error);
}

const Stack = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <SheetProvider>
            <SafeAreaView style={styles.container}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
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
