import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from '../../utils/colors/colors';
import {Fonts} from '../../utils/fonts/fonts';
import {CustomTextProps} from '../../utils/interface/interface';

const CustomText = (props: CustomTextProps) => {
  const {
    style,
    numberOfLines = undefined,
    children = '',
    onTextLayout,
    onPress,
    ellipsizeMode,
  } = props;

  return (
    //@ts-ignore
    <Text
      suppressHighlighting={true}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
      onTextLayout={onTextLayout}
      style={[styles.defaultStyle, style]}
      allowFontScaling={false}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  defaultStyle: {
    color: Colors.Black,
    fontFamily: Fonts.Regular,
    // letterSpacing: 0.5
    // fontWeight: '66'
  },
});
