import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './Profile.style';
import FavoritedCard from '../../../Components/cards/FavoritedCard/FavoritedCard';
import EditProfileModal from '../../../Components/modals/EditProfile/EditProfileModal';

const windowWidth = Dimensions.get('window').width;

const useProfileData = () => {
  const [userInfo, setUserInfo] = useState('');
  useEffect(() => {
    const user = auth().currentUser;
    const userId = user.uid;
    const fetchProfilData = () => {
      database()
        .ref(`users/${userId}/profile`)
        .on('value', snapshot => {
          const profilData = snapshot.val();
          if (profilData) {
            setUserInfo(profilData);
          }
        });
    };
    fetchProfilData();
    return () => {
      database().ref(`users/${userId}/profile`).off('value', fetchProfilData);
    };
  }, []);
  return userInfo;
};

const usePhotosData = () => {
  const [photos, setPhotos] = useState(null);
  const user = auth().currentUser;
  const userId = user?.uid;

  useEffect(() => {
    if (userId) {
      const photosRef = database().ref(`users/${userId}/photos`);

      const photosListener = photosRef.on('value', snapshot => {
        setPhotos(snapshot.val());
      });

      return () => {
        // Listener'ı kaldırma
        photosRef.off('value', photosListener);
      };
    }
  }, [userId]);

  return photos;
};

const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('isProfileVisited').then(value => {
      if (value === 'yes') {
        setIsFirstVisit(false);
      } else {
        AsyncStorage.setItem('isProfileVisited', 'yes');
      }
    });
  }, []);

  useEffect(() => {
    if (isFirstVisit) {
      showMessage({
        message:
          'You can edit your profile by clicking the Edit Profile button.',
        type: 'info',
      });
    }
  }, [isFirstVisit]);

  return isFirstVisit;
};
const useFavoritedData = () => {
  const [favorited, setFavorited] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    const userId = user.uid;

    const fetchFavoritedData = () => {
      database()
        .ref(`users/${userId}/favorited`)
        .on('value', snapshot => {
          const favoritedData = snapshot.val();
          const favoriteBooks = [];
          for (const key in favoritedData) {
            favoriteBooks.push({
              ...favoritedData[key].book,
              id: key,
            });
          }
          setFavorited(favoriteBooks);
        });
    };

    fetchFavoritedData();

    return () => {
      database()
        .ref(`users/${userId}/favorited`)
        .off('value', fetchFavoritedData);
    };
  }, []);

  return favorited;
};
const useReadedData = () => {
  const [readed, setReaded] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    const userId = user.uid;

    const fetchReadedData = () => {
      database()
        .ref(`users/${userId}/readed`)
        .on('value', snapshot => {
          const readedData = snapshot.val();
          const readedBooks = [];
          for (const key in readedData) {
            readedBooks.push({
              ...readedData[key].book,
              id: key,
            });
          }
          setReaded(readedBooks);
        });
    };

    fetchReadedData();

    return () => {
      database().ref(`users/${userId}/readed`).off('value', fetchReadedData);
    };
  }, []);

  return readed;
};

const Profile = ({navigation}) => {
  const userInfo = useProfileData();
  const photos = usePhotosData();
  const isFirstVisit = useFirstVisit();
  const favorited = useFavoritedData();
  const readed = useReadedData();

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [sliderState, setSliderState] = useState({
    currentPage: 1,
  });

  const switchPage = page => {
    setSliderState({
      currentPage: page,
    });
  };
  const handleDeleteFavorites = async id => {
    try {
      const user = auth().currentUser;
      const userId = user.uid;
      await database().ref(`users/${userId}/favorited/${id}`).remove();
    } catch (error) {
      console.log('Error deleting favorited book: ', error);
    }
  };

  const handleDeleteReaded = async id => {
    const user = auth().currentUser;
    const userId = user.uid;
    await database().ref(`users/${userId}/readed/${id}`).remove();
  };

  const handleBookSelect = item => {
    navigation.navigate('BookDetail', {item});
  };

  const renderFavCard = ({item}) => (
    <FavoritedCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      handleDelete={handleDeleteFavorites}
      onPress={() => handleBookSelect(item)}
    />
  );

  const renderReadCard = ({item}) => (
    <FavoritedCard
      volumeInfo={item.volumeInfo}
      id={item.id}
      handleDelete={handleDeleteReaded}
      onPress={() => handleBookSelect(item)}
    />
  );

  const editProfileModal = () => {
    setEditModalVisible(true);
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        {photos && photos.banner ? (
          <Image style={styles.banner_image} source={{uri: photos.banner}} />
        ) : (
          <ImageBackground
            style={styles.banner_image}
            source={require('../../../assets/images/defaultBanner.png')}
          />
        )}
        {photos && photos.profile ? (
          <Image style={styles.profile_image} source={{uri: photos.profile}} />
        ) : (
          <Image
            style={styles.profile_image}
            source={require('../../../assets/images/defaultProfile.png')}
          />
        )}
      </View>
      <View style={styles.info_container}>
        <View style={styles.edit_and_logout_container}>
          <TouchableOpacity
            onPress={editProfileModal}
            style={styles.edit_button}>
            <Text style={styles.edit_text}>Edit Profile</Text>
          </TouchableOpacity>
          <EditProfileModal
            isVisible={editModalVisible}
            onClose={handleEditModalClose}
          />
          <Icon
            style={styles.logout_icon}
            name="logout"
            size={40}
            onPress={() => auth().signOut()}
          />
        </View>
        <View style={styles.user_container}>
          {userInfo.name ? (
            <Text style={styles.username}>{userInfo.name} </Text>
          ) : (
            <Text style={styles.username}>Name </Text>
          )}
          {userInfo.age ? (
            <Text style={styles.userage}> / {userInfo.age}</Text>
          ) : (
            <Text style={styles.userage}> / Age</Text>
          )}
        </View>
      </View>
      <View style={styles.menu_container}>
        <TouchableOpacity
          onPress={() => switchPage(1)}
          style={
            sliderState.currentPage === 1
              ? styles.menu_title_selected
              : styles.menu_title
          }>
          <Text style={styles.menu_title}>Readed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => switchPage(2)}
          style={
            sliderState.currentPage === 2
              ? styles.menu_title_selected
              : styles.menu_title
          }>
          <Text style={styles.menu_title}>Favorites</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true}>
        <View style={[styles.list_container, {width: windowWidth}]}>
          {sliderState.currentPage === 1 ? (
            <FlatList
              data={readed}
              keyExtractor={item => item.id}
              renderItem={renderReadCard}
            />
          ) : (
            <FlatList
              data={favorited}
              keyExtractor={item => item.id}
              renderItem={renderFavCard}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
