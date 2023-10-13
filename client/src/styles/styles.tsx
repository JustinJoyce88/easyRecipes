import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  containerNoCenter: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'lightblue',
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width / 1.5,
    alignSelf: 'center'
  },
  button2: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 50,
    width: Dimensions.get('window').width / 3,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
  button2Container: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  card: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  cardBody: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  cardBodyText: {
    fontSize: 14,
    width: '100%',
  },
  cardTitleText: {
    fontSize: 20,
  },
  image: {  height: 20, width: 20 },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    marginTop: 5
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
    shadowOpacity: 0.3,
    elevation: 3,
  },
  error: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  }
});

export default styles;
