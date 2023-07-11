import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TabBarIcon = ({name, focused}) => {
  return (
    <View>
      <Icon name={name} size={25} color={focused ? 'red' : '#3d342f'} />
    </View>
  );
};

export default TabBarIcon;
