import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './FavoritedCard.style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FavoritedCard = ({volumeInfo, id, handleDelete, onPress}) => {
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
              source={require('../../../assets/images/book.jpg')}
              style={styles.image}
            />
          )}
          <View style={styles.text_container}>
            <Text style={styles.title}>
              {volumeInfo ? volumeInfo.title : ''}
            </Text>
            {volumeInfo && volumeInfo.authors ? (
              <Text style={styles.authors}>
                {volumeInfo.authors.join(', ')}
              </Text>
            ) : null}
          </View>
          <Icon
            style={styles.icon}
            name="delete"
            size={30}
            onPress={() => handleDelete(id)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FavoritedCard;
