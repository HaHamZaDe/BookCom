import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange200,
    padding: 10, // Örnek olarak padding ekledim, gerekirse ayarlayabilirsiniz
  },
  top_container: {
    backgroundColor: colors.bluegrey300,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 7,
    margin: 5,
    padding: 5,
    alignItems: 'center', // Yatayda hizalama için alignItems ekledim
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 7,
    marginHorizontal: 5,
    marginVertical: 10,
    resizeMode: 'contain',
  },
  info_container: {
    flex: 1,
    marginVertical: 17,
    marginHorizontal: 10,
  },
  book_name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.brown,
    borderBottomWidth: 1,
    borderColor: colors.brown,
    paddingBottom: 5,
    marginRight: 20,
  },
  authors: {
    marginVertical: 10, // Yatayda boşluk için marginVertical değerini azalttım
  },
  text: {
    color: colors.brown,
  },
  categories: {},
  info_titles: {
    color: colors.brown,
    fontWeight: 'bold',
  },
  icon_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
    marginVertical: 1,
    borderRadius: 7,
    backgroundColor: colors.darkgreen,
    padding: 10, // Örnek olarak padding ekledim, gerekirse ayarlayabilirsiniz
  },
  icon1: {
    color: colors.orange200,
    flex: 1,
    textAlign: 'center',
    borderRightWidth: 2,
    borderColor: colors.orange200,
    margin: 4,
    padding: 7,
  },
  icon2: {
    color: colors.orange200,
    flex: 1,
    textAlign: 'center',
    margin: 4,
    padding: 7,
  },
  desc_container: {
    backgroundColor: colors.bluegrey300,
    borderWidth: 1,
    borderRadius: 7,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
  },
  desc_title: {
    color: colors.brown,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: colors.brown,
    marginBottom: 10,
    paddingBottom: 8,
    paddingHorizontal: Dimensions.get('window').width / 3.7,
    textAlign: 'center',
  },
  desc_text: {
    color: colors.brown,
    textAlign: 'center',
    flex: 1,
  },
});
