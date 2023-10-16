import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width / 1.5,
    alignSelf: 'center',
    marginBottom: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
  input: {
    height: 60,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
  },
  intenseShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.6,
  },
  error: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
  success: {
    marginTop: 5,
    color: 'green',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default styles;
