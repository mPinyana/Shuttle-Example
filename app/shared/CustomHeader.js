import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() => navigation.navigate('Profile')}
    >
      <FontAwesome name="user-circle" size={32} color="#004aad" />
    </TouchableOpacity>
  );
};

export default CustomHeader;