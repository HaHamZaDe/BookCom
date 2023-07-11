import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import styles from './Favorites.style';
import Loading from '../../../Components/Loading/Loading';
import FavoritedCard from '../../../Components/cards/FavoritedCard/FavoritedCard';

const Favorites = ({navigation}) => {
  const [favorited, setFavorited] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const user = auth().currentUser;
    const userId = user.uid;

    const fetchFavoritedData = () => {
      database()
        .ref(`users/${userId}/favorited`)
        .on('value', snapshot => {
          const favoritedData = snapshot.val();
          if (favoritedData) {
            const favoritedBooks = Object.keys(favoritedData).map(key => ({
              ...favoritedData[key].book,
              id: key,
            }));
            setFavorited(favoritedBooks);
            setIsEmpty(false);
          } else {
            setFavorited([]);
            setIsEmpty(true);
          }
          setLoading(false);
        });
    };

    fetchFavoritedData();

    return () => {
      const favoritedRef = database().ref(`users/${userId}/favorited`);
      favoritedRef.off('value', fetchFavoritedData);
    };
  }, []);

  const handleDeleteFavorited = async id => {
    const user = auth().currentUser;
    const userId = user.uid;

    try {
      await database().ref(`users/${userId}/favorited/${id}`).remove();
    } catch (error) {
      console.log('Error deleting favorited book: ', error);
    }
  };

  const handleBookSelect = item => {
    navigation.navigate('BookDetail', {item});
  };

  const renderFavoritedCard = ({item}) => (
    <FavoritedCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      handleDelete={handleDeleteFavorited}
      onPress={() => handleBookSelect(item)}
    />
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Image
          style={styles.header_icon}
          source={require('../../../assets/images/LogoBookCom.png')}
        />
        <Text style={styles.header}>Favorites</Text>
        <Image
          style={styles.header_icon}
          source={require('../../../assets/images/LogoBookCom.png')}
        />
      </View>
      {isEmpty ? (
        <Text style={styles.ifMessage}>
          You don't have any favorite books yet...
        </Text>
      ) : (
        <FlatList
          data={favorited}
          keyExtractor={item => item.id}
          renderItem={renderFavoritedCard}
        />
      )}
    </View>
  );
};

export default Favorites;
