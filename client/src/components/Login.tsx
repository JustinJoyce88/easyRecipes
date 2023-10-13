import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { setAuthToken } from '../reducers/persist';
import renderIf from '../utils/renderIf';
import styles from '../styles/styles';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = (props: any) => {
  const { navigation } = props;
  const authToken = useSelector((state: RootState) => state.persist.authToken);
  const dispatch = useDispatch();
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (authToken) {
      navigation.navigate('Links');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: { email: 'user2', password: 'test' },
      });
      if (data?.login?.token) {
        dispatch(setAuthToken(data.login.token));
        navigation.navigate('Links');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // Render your login UI here
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      {renderIf(!loading, <Text style={styles.buttonText}>Login</Text>)}
      {renderIf(loading, <ActivityIndicator />)}
    </TouchableOpacity>
  );
};

export default Login;
