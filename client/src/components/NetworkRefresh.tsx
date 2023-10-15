import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type NetworkRefreshProps = {
  message: string;
  refresh: () => void;
};

const NetworkRefresh = (props: NetworkRefreshProps) => {
  const { message } = props;
  return (
    <>
      <View>
        <TouchableOpacity style={styles.retryBtn} onPress={() => props.refresh()}>
          <Icon name="refresh-outline" size={24} color="black" />
          <Text style={styles.retryBtnText}>Retry</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoriesError}>
        <Icon name="alert-circle-outline" size={24} color="red" />
        <Text style={styles.errorText}>Error: {message}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesError: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  retryBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  retryBtnText: {
    color: 'black',
    fontSize: 16,
  },
});

export default NetworkRefresh;
