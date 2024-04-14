import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {activeOpacity} from '../../utils/constants/constants';
import CustomText from './CustomText';
import {Fonts} from '../../utils/fonts/fonts';
import {Colors} from '../../utils/colors/colors';

const IconBtn = (props: any) => {
  const {
    style,
    disable = false,
    onPress,
    loading = false,
  } = props;

  const Icon = () => {
    return props.Icon;
  };

  return (
    <TouchableOpacity
      style={[
        {
          // borderWidth: 1,
          borderColor: disable && Colors.GreyLight,
        },
        style,
      ]}
      activeOpacity={activeOpacity}
      disabled={disable ? disable : loading ? true : false}
      onPress={onPress}>
      <>{Icon()}</>
    </TouchableOpacity>
  );
};

export default IconBtn;

const styles = StyleSheet.create({});
