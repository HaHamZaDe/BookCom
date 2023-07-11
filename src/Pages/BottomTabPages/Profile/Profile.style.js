import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors';

const deviceSize = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange200,
  },
  image_container: {},
  banner_image: {
    width: deviceSize.width / 1,
    height: deviceSize.height / 6,
  },
  profile_image: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 60,
    position: 'absolute',
    marginTop: 70,
    marginLeft: 15,
  },
  info_container: {
    height: deviceSize.height / 6.5,
  },
  edit_and_logout_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  edit_button: {
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    padding: 5,
    backgroundColor: colors.brown,
  },
  edit_text: {
    fontSize: 15,
    color: 'white',
  },
  logout_icon: {
    alignItems: 'flex-end',
    margin: 7,
    color: colors.brown,
  },
  user_container: {
    flexDirection: 'row',
    marginLeft: 15,
    paddingTop: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.brown,
  },
  userage: {
    color: colors.brown,
    fontWeight: 'bold',
    fontSize: 20,
  },
  menu_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    marginHorizontal: 5,
  },
  menu_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.brown,
    padding: 2,
  },
  menu_title_selected: {
    borderBottomWidth: 4,
    borderColor: colors.brown,
  },
});
