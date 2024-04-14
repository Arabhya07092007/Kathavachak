import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Dimensions from '../../utils/dimension/dimensions';
import {Images} from '../../utils/imageSource/imageSource';
import CustomText from '../atoms/CustomText';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import {Colors} from '../../utils/colors/colors';
import { activeOpacity } from '../../utils/constants/constants';

const CategoriesItem = (props: any) => {
  const {
    onPress = () => {},
    item,
    width = Dimensions.WP_32,
    marginRight,
    mainStyle,
    aspectRatio,
  } = props;
  const Icon = () => {
    return props.Icon;
  };
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            flexDirection: 'row',
            width: width,
            aspectRatio: aspectRatio ? aspectRatio : 1,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.PurpleBorder,
            backgroundColor: Colors.LightPurple,
            marginLeft: marginRight || 0,
          },
          mainStyle,
        ]}
        activeOpacity={activeOpacity}>
        <View style={{alignSelf: 'center', marginLeft: 10}}>{Icon()}</View>
        <CustomText style={styles.RegularTextStyle}>{item}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default CategoriesItem;

const styles = StyleSheet.create({
  RegularTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: FontSize[17],
    alignSelf: 'center',
    marginLeft: 5,
  },
});
