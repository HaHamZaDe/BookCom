import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  info_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: 5,
    marginHorizontal: 7,
    padding: 10,
    backgroundColor: colors.brown,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  text_container: {
    marginLeft: 10,
    marginRight: 15,
    flex: 1,
    paddingRight: 5,
  },
  title: {
    marginBottom: 3,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  authors: {
    marginTop: 3,
    color: 'white',
  },
});
