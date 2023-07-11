import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './GuestFavReadCard.style';

const GuestFavReadCard = ({book, volumeInfo, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.info_container}>
          {volumeInfo && volumeInfo.imageLinks ? (
            <Image
              style={styles.image}
              source={{uri: volumeInfo.imageLinks.thumbnail}}
            />
          ) : (
            <Image
              source={{
                uri: 'https://i.pinimg.com/564x/1d/75/b9/1d75b954363bc000b9008ad05a5823e8.jpg',
              }}
              style={styles.image}
            />
          )}
          <View style={styles.text_container}>
            {book.title ? (
              <Text style={styles.title}>{book.title}</Text>
            ) : (
              <Text style={styles.title}>nameless</Text>
            )}
            {book.authors ? (
              <Text style={styles.authors}>{book.authors.join(', ')}</Text>
            ) : (
              <Text style={styles.authors}>Anonymous</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GuestFavReadCard;
