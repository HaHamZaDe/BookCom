import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './BookCard.style';

const BookCard = props => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.container}>
        {props.volumeInfo.imageLinks !== undefined ? (
          <Image
            source={{uri: props.volumeInfo.imageLinks.thumbnail}}
            style={styles.image}
          />
        ) : (
          <Image
            source={require('../../../assets/images/book.jpg')}
            style={styles.image}
          />
        )}
        <Text style={styles.title}>{props.volumeInfo.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
