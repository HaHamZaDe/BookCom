import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: colors.orange200,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  image_container: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 350,
    height: 350,
  },
  form_container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
