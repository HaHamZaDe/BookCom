import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.orange200,
    flex: 1,
  },

  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  input_icon: {
    right: 20,
    position: 'absolute',
    bottom: 20,
  },
  page_header: {
    backgroundColor: colors.brown,
    color: colors.lightpink,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headers: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.brown,
    marginVertical: 10,
    borderBottomWidth: 2,
    paddingBottom: 5,
    textAlign: 'center',
    borderColor: colors.brown,
  },
});
