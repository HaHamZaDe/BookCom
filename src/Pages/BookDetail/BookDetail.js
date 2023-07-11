import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './BookDetail.style';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';

const BookDetail = ({route}) => {
  const {item} = route.params;

  const addReaded = () => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;

      database()
        .ref(`users/${userId}/readed`)
        .once('value')
        .then(snapshot => {
          const readedData = snapshot.val();
          let isExists = false;
          for (const key in readedData) {
            if (readedData[key].book.id === item.id) {
              isExists = true;
              break;
            }
          }
          if (isExists) {
            showMessage({
              message: 'Failed! This book is already in your readed!',
              type: 'danger',
            });
          } else {
            database().ref(`users/${userId}/readed`).push({
              book: item,
            });
            showMessage({
              message: 'The book has been added readed successfully!',
              type: 'success',
            });
          }
        });
    }
  };

  const addFavorited = () => {
    const user = auth().currentUser;
    if (user) {
      const userId = user.uid;

      database()
        .ref(`users/${userId}/favorited`)
        .once('value')
        .then(snapshot => {
          const favoritedData = snapshot.val();
          let isExists = false;
          for (const key in favoritedData) {
            if (favoritedData[key].book.id === item.id) {
              isExists = true;
              break;
            }
          }
          if (isExists) {
            showMessage({
              message: 'Failed! This book is already in your favourites!',
              type: 'danger',
            });
          } else {
            database().ref(`users/${userId}/favorited`).push({
              book: item,
            });
            showMessage({
              message: 'The book has been added favorites successfully!',
              type: 'success',
            });
          }
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.top_container}>
          {item.volumeInfo.imageLinks !== undefined ? (
            <Image
              style={styles.image}
              source={{uri: item.volumeInfo.imageLinks.thumbnail}}
            />
          ) : (
            <Image
              source={require('../../assets/images/book.jpg')}
              style={styles.image}
            />
          )}
          <View style={styles.info_container}>
            <Text style={styles.book_name}>{item.volumeInfo.title}</Text>
            <View style={styles.authors}>
              <Text style={styles.info_titles}>Authors: </Text>
              <Text style={styles.text}>{item.volumeInfo.authors}</Text>
            </View>
            <View style={styles.categories}>
              <Text style={styles.info_titles}>Categories: </Text>
              <Text style={styles.text}>{item.volumeInfo.categories}</Text>
            </View>
          </View>
        </View>
        <View style={styles.icon_container}>
          <Icon
            style={styles.icon1}
            name="check"
            size={30}
            onPress={() => addReaded()}
          />
          <Icon
            style={styles.icon2}
            name="favorite"
            size={30}
            onPress={() => addFavorited()}
          />
        </View>
        <View style={styles.desc_container}>
          <Text style={styles.desc_title}>Description</Text>
          {item.volumeInfo.description !== undefined ? (
            <Text style={styles.desc_text}>{item.volumeInfo.description}</Text>
          ) : (
            <Text style={styles.desc_text}>
              No description found for this book!
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default BookDetail;
