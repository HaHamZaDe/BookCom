import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 7,
    height: 350,
    backgroundColor: 'white',
  },
  header: {
    textAlign: 'center',
    color: colors.brown,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 5,
  },
  photoContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 25,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  bannerPhoto: {
    width: 150,
    height: 80,
    borderRadius: 40,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 70,
  },
  nameTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.brown,
    paddingRight: 10,
  },
  ageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingLeft: 70,
  },
  ageTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.brown,
    paddingRight: 10,
  },
  inputs: {
    flex: 1,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: colors.brown,
    padding: 10,
    borderRadius: 7,
    marginHorizontal: 120,
  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
