import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomHeader = ({ navigation }) => {
  return (
    <TouchableOpacity 
      style={{ marginLeft: 15 }}
      onPress={() => {
        () => navigation.openDrawer()
      }}
    >
      <FontAwesome name="user-circle" size={32} color="#004aad" />
    </TouchableOpacity>
  );
};

export default CustomHeader;