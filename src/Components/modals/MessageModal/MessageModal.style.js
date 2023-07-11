import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: deviceSize.height / 2,
    borderRadius: 10,
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.brown,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  share_button: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 7,
    paddingHorizontal: 20,
    backgroundColor: colors.brown,
  },
  share_button_text: {
    fontWeight: '500',
    color: 'white',
  },
  input_container: {
    flex: 11,
    padding: 5,
  },
  sharing_photo: {
    width: 150,
    height: 200,
    borderRadius: 7,
    marginLeft: 90,
  },
  icon_container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,

    borderColor: colors.brown,
  },
});
