import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../atoms/CustomText';
import { FontSize, Fonts } from '../../utils/fonts/fonts';
import { Colors } from '../../utils/colors/colors';

const BulletPoint = (props: any) => {
    const {
        bulletContainerStyle,
        bulletPointStyle,
        textStyle,
        children
    } = props
  return (
    <View style={[styles.bulletContainer,bulletContainerStyle]}>
      <CustomText style={[styles.bullet,bulletPointStyle]}>{'\u2022'}</CustomText>
      <CustomText style={[styles.subStyle,textStyle]}>{children}</CustomText>
    </View>
  );
};

export default BulletPoint;

const styles = StyleSheet.create({
    bulletContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // backgroundColor: 'red',
        paddingHorizontal: 8,
      },
      bullet: {
        marginRight: 3,
        fontSize: FontSize[14],
        lineHeight: 20, // Adjust as needed
      },
      subStyle: {
        fontFamily: Fonts.LatoRegular,
        fontSize: FontSize[15],
        textAlign: 'justify',
        color: Colors.Text_DarkShade_Grey,
        // backgroundColor: 'yellow',
        paddingLeft: 3,
        paddingBottom: 5,
      },
});
