import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './MessageModal.style';

const MessageModal = ({isVisible, onClose}) => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);

  const addPhoto = () => {
    //Allows uploading photos to message modal.
    const options = {
      title: 'Titlee',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        showMessage({
          message: 'Error',
          description: 'Error selecting photo',
          type: 'danger',
        });
        return;
      } else {
        const path = response.assets[0].uri;
        setPhoto(path);
      }
    });
  };

  const onSend = async () => {
    //It sends the data and date you will share to the database when you press the share button.
    const userId = auth().currentUser.uid;
    database().ref(`users/${userId}/shared`).push({
      text: text,
      photo: photo,
      date: new Date().toISOString(),
    });
    setPhoto(null);
    setText('');
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.top_container}>
          <Text style={styles.title}>How are you with books today?</Text>
          <TouchableOpacity onPress={onSend} style={styles.share_button}>
            <Text style={styles.share_button_text}>Share</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.input_container}>
          <TextInput
            placeholder="Enter your message here..."
            multiline
            value={text}
            onChangeText={setText}
          />
          {photo ? (
            <Image style={styles.sharing_photo} source={{uri: photo}} />
          ) : null}
        </View>
        <View style={styles.icon_container}>
          <TouchableOpacity onPress={addPhoto}>
            <Icon name="camera-alt" size={30} color="#3d342f" />
          </TouchableOpacity>
          <TouchableOpacity onPress={addPhoto}>
            <Icon name="photo" size={30} color="#3d342f" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;
