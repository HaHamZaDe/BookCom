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
    alignItems: 'center',
  },
  header: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  header_icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  ifMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
  },
});
