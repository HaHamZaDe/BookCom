import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange200,
  },
  header_container: {
    backgroundColor: colors.darkgreen,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header_icon: {
    width: 40,
    height: 40,
  },
  header_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 7,
  },
  header_image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
