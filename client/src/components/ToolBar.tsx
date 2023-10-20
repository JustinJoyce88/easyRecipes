import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootState } from '../reducers';
import { SheetManager } from 'react-native-actions-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logOut } from '../reducers/persist';
import renderIf from '../utils/renderIf';
import styles from '../styles/styles';

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

  const handleAddRecipe = () =>
    SheetManager.show('custom-sheet', {
      payload: { create: true },
    });

  const handleProfileBtn = () => {
    if (user && user.admin) {
      navigation.navigate('Add Category');
    }
  };

  return (
    <View>
      <View style={customStyles.container}>
        <TouchableOpacity
          onPress={handleProfileBtn}
          style={{ alignItems: 'center', flexDirection: 'row' }}
        >
          <FAIcon
            style={{ marginLeft: 10, marginRight: 5 }}
            name="user-circle"
            size={28}
            color="black"
          />
          <Text>{`${user.username.charAt(0).toUpperCase()}${user.username.slice(1)}`}</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => dispatch(logOut())}>
            <Icon name="log-out-outline" size={32} color="#de5246" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={customStyles.test}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.shadow,
            { width: Dimensions.get('window').width / 3, marginRight: 10 },
          ]}
          onPress={() => handleAddRecipe()}
        >
          <Text>Add a Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.shadow,
            { width: Dimensions.get('window').width / 3, marginRight: 10 },
          ]}
          onPress={() => navigation.navigate('Recipes', { filterByUser: user.username })}
        >
          <Text>My Recipes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const customStyles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  test: {
    margin: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default ToolBar;
