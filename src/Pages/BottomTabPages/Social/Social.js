import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loading from '../../../Components/Loading/Loading';

import FloatingButton from '../../../Components/FloatingButton/FloatingButton';
import styles from './Social.style';
import MessageModal from '../../../Components/modals/MessageModal/MessageModal';
import PostCard from '../../../Components/cards/PostCard/PostCard';

const Social = () => {
  const [photos, setPhotos] = useState();
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pull the photos from the database
    const user = auth().currentUser;
    const userId = user.uid;

    const photosRef = database().ref(`users/${userId}/photos`);

    const photosListener = photosRef.on('value', snapshot => {
      setPhotos(snapshot.val());
      setLoading(false);
    });

    return () => {
      // Clean up the listener
      photosRef.off('value', photosListener);
    };
  }, []);

  const handleMessageModal = () => {
    setMessageModalVisible(true);
  };

  const handleMessageModalClose = () => {
    setMessageModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <Image
          style={styles.header_icon}
          source={require('../../../assets/images/LogoBookCom.png')}
        />
        <Text style={styles.header_title}>BooKCoM</Text>
        {photos && photos.profile ? (
          <Image style={styles.header_image} source={{uri: photos.profile}} />
        ) : (
          <Image
            style={styles.header_image}
            source={require('../../../assets/images/defaultProfile.png')}
          />
        )}
      </View>
      <View style={styles.content}>{loading ? <Loading /> : <PostCard />}</View>
      <FloatingButton onPress={handleMessageModal} icon="post-add" />
      <MessageModal
        isVisible={messageModalVisible}
        onClose={handleMessageModalClose}
      />
    </View>
  );
};

export default Social;
