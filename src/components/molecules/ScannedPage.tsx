import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Dimensions from '../../utils/dimension/dimensions';
import BackgroundGradient from '../atoms/BackgroundGradient';
import {Colors} from '../../utils/colors/colors';
import GalleryAdd from '../../assets/svgs/Gallery-add';
import CustomText from '../atoms/CustomText';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import {activeOpacity} from '../../utils/constants/constants';

const ScannedPage = (props: any) => {
  const {
    mainContienrStyle,
    borderRadius = 20,
    onPress,
    disabled,
    loading = false,
  } = props;
  return (
    <View
      style={[
        styles.mainContainer,
        mainContienrStyle,
        {borderRadius: borderRadius},
      ]}>
      <BackgroundGradient
        TO_COLOR={Colors.White}
        FROM_COLOR={'#e3d8ff'}
        borderRadius={borderRadius}>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
          disabled={disabled ? true : false}
          onPress={onPress}
          activeOpacity={activeOpacity}>
          <GalleryAdd style={{alignSelf: 'center'}}></GalleryAdd>
          <CustomText
            style={{
              alignSelf: 'center',
              color: Colors.Text,
              fontFamily: Fonts.Bold,
              fontSize: FontSize[14],
            }}>
            {'Scan more pages'}
          </CustomText>
        </TouchableOpacity>
      </BackgroundGradient>
    </View>
  );
};

export default ScannedPage;

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.WP_38_7, //151,
    aspectRatio: 0.8,
    borderWidth: 1,
    borderColor: Colors.PurpleBorder,
    borderRadius: 10,
  },
});
