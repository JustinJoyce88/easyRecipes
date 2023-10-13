import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { logOut } from '../reducers/persist';
import styles from '../styles/styles';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import renderIf from '../utils/renderIf';
import client from '../api/client';

const CREATE_AFFILIATE_LINK = gql`
  mutation CreateAffiliateLink($url: String!) {
    createAffiliateLink(url: $url) {
      id
      link
      originalUrl
      createdAt
      updatedAt
    }
  }
`;

const Links = (props: any) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.persist.authToken);
  const [createAffiliateLink, { loading, error, data }] = useMutation(CREATE_AFFILIATE_LINK, {
    client: client,
  });

  useEffect(() => {
    if (!authToken) {
      navigation.navigate('Home');
    }
  }, [authToken]);

  const handleMutation = async () => {
    try {
      const { data } = await createAffiliateLink({
        variables: { url: 'whatever.com' },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogOut = async () => {
    dispatch(logOut());
  };

  return (
    <View style={styles.containerNoCenter}>
      <View style={styles.button2Container}>
        <TouchableOpacity style={styles.button2} onPress={handleMutation}>
          {renderIf(!loading, <Text style={styles.buttonText}>Create Link</Text>)}
          {renderIf(loading, <ActivityIndicator />)}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleLogOut}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Links;
