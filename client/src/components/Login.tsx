import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import { RootState } from '../reducers';
import { gql } from '@apollo/client';
import renderIf from '../utils/renderIf';
import { setUser } from '../reducers/persist';
import styles from '../styles/styles';
import { useMutation } from '@apollo/client';
import retrieveTokenFromKeychain from '../utils/retrieveTokenFromKeychain';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      userId
      admin
      username
    }
  }
`;

const Login = (props: any) => {
  const { navigation } = props;
  const user = useSelector((state: RootState) => state.persist.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, { data, loading }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    const getToken = async () => {
      const hasKey = await retrieveTokenFromKeychain(user);
      if (hasKey) navigation.navigate('Home');
    };
    if (user.username) getToken();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      setError('Please enter a username and password');
      return;
    }
    try {
      const { data } = await login({
        variables: { username, password },
      });
      if (data?.login) {
        await SecureStore.setItemAsync(username, data?.login?.token);
        dispatch(
          setUser({
            userId: data?.login?.userId,
            username: data?.login?.username,
            admin: data?.login?.admin,
          })
        );
        setError('');
        setUsername('');
        setPassword('');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
      setError('Invalid username or password');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[Platform.OS === 'ios' ? customStyles.iosContainer : customStyles.androidContainer]}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image source={require('../../assets/icon.png')} style={customStyles.icon} />
          <TextInput
            value={username}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            style={[styles.input, styles.shadow]}
            placeholder="Username"
            onChangeText={(val) => setUsername(val)}
          />
          <TextInput
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            style={[styles.input, styles.shadow]}
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
          />
          <TouchableOpacity
            style={[customStyles.button, styles.shadow]}
            onPress={() => handleLogin(username, password)}
          >
            {renderIf(!loading, <Text style={customStyles.buttonText}>Login</Text>)}
            {renderIf(loading, <ActivityIndicator color={'white'} />)}
          </TouchableOpacity>
          {renderIf(error, <Text style={styles.error}>Error: {error}</Text>)}
          <TouchableOpacity
            style={[customStyles.button, styles.shadow]}
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <Text style={customStyles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const customStyles = StyleSheet.create({
  button: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    width: Dimensions.get('window').width / 1.5,
    minHeight: 70,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  icon: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  iosContainer: {
    flex: 1,
    width: '100%',
  },
  androidContainer: {
    width: '100%',
  },
});

export default Login;
