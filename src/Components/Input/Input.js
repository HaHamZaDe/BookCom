import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './Input.style';
import colors from '../../styles/colors';

const Input = ({value, placeholder, onType, isSecure, error, name, size}) => {
  const showError = errorMsg => {
    showMessage({
      message: errorMsg,
      type: 'danger',
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        onChangeText={onType}
        placeholder={placeholder}
        value={value}
        placeholderTextColor={colors.darkgreen}
        style={styles.txtinput}
        secureTextEntry={isSecure}
        onFocus={() => error && showError(error)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Icon name={name} size={size} color={colors.darkgreen} />
    </View>
  );
};

export default Input;
