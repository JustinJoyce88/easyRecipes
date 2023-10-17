import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../reducers/persist';
import { RootState } from '../reducers';

type ToolBarProps = {
  navigation: any;
};

const ToolBar = (props: ToolBarProps) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.persist.user);

  useEffect(() => {
    if (!user.token) {
      navigation.navigate('LoginScreen');
    }
  }, [user.token]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <FAIcon
          style={{ marginLeft: 10, marginRight: 5 }}
          name="user-circle"
          size={28}
          color="black"
        />
        <Text>{`${user.username.charAt(0).toUpperCase()}${user.username.slice(1)}`}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => dispatch(logOut())}>
          <Icon name="log-out-outline" size={32} color="#de5246" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ToolBar;
