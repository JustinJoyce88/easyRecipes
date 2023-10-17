import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { setUser } from '../reducers/persist';
import renderIf from '../utils/renderIf';
import styles from '../styles/styles';

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
    if (user.token) {
      navigation.navigate('Home');
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const { data } = await login({
        variables: { username, password },
      });
      if (data?.login) {
        dispatch(
          setUser({
            token: data?.login?.token,
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
    <KeyboardAvoidingView behavior="padding" style={{ width: '100%', flex: 1 }}>
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
});

export default Login;
