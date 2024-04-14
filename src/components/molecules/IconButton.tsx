import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Dimensions from '../../utils/dimension/dimensions';
import {activeOpacity} from '../../utils/constants/constants';

const IconButton = (props: any) => {
  const {icon, onPress, style, iconStyle, customize = false} = props;
  return (
    <TouchableOpacity
      style={[{padding: 10}, style]}
      onPress={onPress}
      activeOpacity={activeOpacity}>
      {customize ? (
        props.children
      ) : (
        <Image
          source={icon}
          style={[{height: Dimensions.WP_6, width: Dimensions.WP_6}, iconStyle]}
          resizeMode={'contain'}
          ></Image>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
