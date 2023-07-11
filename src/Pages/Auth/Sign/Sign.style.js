import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.orange200,
    flex: 1,
  },
  image_container: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
  },

  header: {
    fontSize: 100,
    fontWeight: 'bold',
    color: colors.darkgreen,
    textAlign: 'center',
    margin: 5,
  },
});
