import React, {useState, useEffect} from 'react';
import {View, TextInput, Image, Text, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import styles from './EditProfileModal.style';
import Modal from 'react-native-modal';

const EditProfileModal = ({isVisible, onClose, userId}) => {
  const [photos, setPhotos] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    //It pulls the user's photo data from the database and puts it into the photos state.
    const user = auth().currentUser;
    const userId = user.uid;
    database()
      .ref(`users/${userId}/photos`)
      .on('value', snapshot => {
        setPhotos(snapshot.val());
      });
  }, []);

  const addProfilePhoto = () => {
    //It sends the photo uploaded by the user to the database.
    const user = auth().currentUser;
    const userId = user.uid;
    const options = {
      title: 'Titlee',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
      } else if (response.errorCode) {
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
      } else {
        const path = response.assets[0].uri;
        database().ref(`users/${userId}/photos/profile`).set(path);
      }
    });
  };

  const addBannerPhoto = () => {
    //It sends the photo uploaded by the user to the database.
    const user = auth().currentUser;
    const userId = user.uid;
    const options = {
      title: 'Titlee',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
      } else if (response.errorCode) {
        showMessage({
          message: 'Something went wrong.',
          type: 'danger',
        });
      } else {
        const path = response.assets[0].uri;
        database().ref(`users/${userId}/photos/banner`).set(path);
      }
    });
  };

  const onSend = () => {
    //When the user clicks the save button, it sends the name and age information to the database.
    const user = auth().currentUser;
    const userId = user.uid;
    database()
      .ref(`users/${userId}/profile`)
      .set({
        name: name,
        age: age,
      })
      .then(() => {
        showMessage({
          message: 'Changes saved!',
          type: 'success',
        });
      });
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>
        <View style={styles.photoContainer}>
          <TouchableOpacity onPress={addProfilePhoto}>
            {photos && photos.profile ? (
              <Image
                style={styles.profilePhoto}
                source={{uri: photos.profile}}
              />
            ) : (
              <Image
                style={styles.profilePhoto}
                source={require('../../../assets/images/defaultProfile.png')}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={addBannerPhoto}>
            {photos && photos.banner ? (
              <Image style={styles.bannerPhoto} source={{uri: photos.banner}} />
            ) : (
              <Image
                style={styles.bannerPhoto}
                source={require('../../../assets/images/defaultBanner.png')}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTitle}>Name</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Enter your name here.."
            onChangeText={setName}
          />
        </View>
        <View style={styles.ageContainer}>
          <Text style={styles.ageTitle}>Age</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Enter your age here.."
            onChangeText={setAge}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={onSend}>
          <Text style={styles.buttonTitle}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default EditProfileModal;
