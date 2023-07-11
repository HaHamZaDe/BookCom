import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Button.style';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Loading from '../Loading/Loading';

const Button = ({text, icon, onPress, loading, theme = 'primary'}) => {
  return (
    <TouchableOpacity
      style={styles[theme].container}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles[theme].Button_container}>
          {/* <Icon name={icon} color="white" size={18} /> */}
          <Text style={styles[theme].title}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
