import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../reducers';
import { gql } from '@apollo/client';
import renderIf from '../utils/renderIf';
import { setUser } from '../reducers/persist';
import styles from '../styles/styles';
import { useMutation } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

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

const CreateUser = (props: any) => {
  const { navigation } = props;
  const user = useSelector((state: RootState) => state.persist.user);
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (user.token) {
      navigation.navigate('Home');
    }
  }, []);

  const validateUsername = () => {
    const pattern = /^[a-zA-Z0-9]+$/;

    if (!pattern.test(username)) {
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const pattern = /^[^\s]+$/;

    if (!pattern.test(password)) {
      return false;
    }
    return true;
  };

  const handleCreateAccount = async (username: string, password: string) => {
    if (!username || !password) {
      setError('Please enter a username and password');
      return;
    }
    const isValidUsername = validateUsername();
    if (!isValidUsername) {
      setError('Invalid username. Can only contain letters and numbers.');
      return;
    }
    const isValidPassword = validatePassword();
    if (!isValidPassword) {
      setError('Invalid password. Cannot contain spaces.');
      return;
    }

    try {
      setLoading(true);
      const { data } = await createUser({
        variables: { input: { username, password } },
      });
      if (data?.createUser?.id) {
        setError('');
        const { data } = await login({
          variables: { username, password },
        });
        dispatch(
          setUser({
            token: data?.login?.token,
            userId: data?.login?.userId,
            admin: data?.login?.admin,
            username: data?.login?.username,
          })
        );
        setUsername('');
        setPassword('');
        navigation.navigate('Home');
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.toString().replace('ApolloError: ', ''));
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ width: '100%', flex: 1, backgroundColor: '#f9ede5' }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={20}
            style={[styles.input, styles.shadow]}
            placeholder="Username"
            onChangeText={(val) => setUsername(val)}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            style={[styles.input, styles.shadow]}
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
          />
          <TouchableOpacity
            style={[customStyles.button, styles.shadow]}
            onPress={() => handleCreateAccount(username, password)}
          >
            {renderIf(!loading, <Text style={customStyles.buttonText}>Create Account</Text>)}
            {renderIf(loading, <ActivityIndicator color={'white'} />)}
          </TouchableOpacity>
          {renderIf(error, <Text style={styles.error}>Error: {error}</Text>)}
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

export default CreateUser;
