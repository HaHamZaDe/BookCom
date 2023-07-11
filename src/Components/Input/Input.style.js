import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    borderColor: colors.brown,
    borderWidth: 1,
    margin: 10,
    padding: 2,
    backgroundColor: colors.bluegrey300,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtinput: {
    color: colors.brown,
    fontWeight: 'bold',
    flex: 1,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
