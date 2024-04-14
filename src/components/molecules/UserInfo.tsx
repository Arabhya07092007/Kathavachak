import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../atoms/CustomText';
import {Images} from '../../utils/imageSource/imageSource';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import Dimensions from '../../utils/dimension/dimensions';
import {Colors} from '../../utils/colors/colors';
import { getUserValues } from '../../utils/functions/commanFunctions';
import { Userkey } from '../../utils/enum/enums';

const UserInfo = (props: any) => {
  const {
    userDataContainerStyle,
    username,
    mobileNumber,
    userTextStyle,
    mobileNumberTextStyle,
  } = props;
  return (
    <View>
      <View style={styles.userPic}>
        <Image
          source={getUserValues(Userkey.profilePic) != null ? {uri:getUserValues(Userkey.profilePic)} : Images.userProfile}
          style={[
            {
              // height: Dimensions.HP_23,//195, //Dimensions.WP_6,
              width: Dimensions.WP_50, //195, //Dimensions.WP_6,
              aspectRatio: 1,
              borderRadius: 100,//(Dimensions.HP_23 + Dimensions.WP_50) / 2,
            },
          ]}
          resizeMode={'contain'}
          ></Image>
      </View>
      <View style={[styles.userDataContainer, userDataContainerStyle]}>
        <CustomText style={userTextStyle}>{username}</CustomText>
        <CustomText style={mobileNumberTextStyle}>{mobileNumber}</CustomText>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  Title: {
    fontSize: FontSize[34],
    fontFamily: Fonts.Bold,
    fontWeight: '500',
    paddingHorizontal: Dimensions.WP_5_1,
    color: Colors.White,
    textAlign: 'center',
    marginVertical: Dimensions.HP_1_1_8//10,
  },
  userPic: {
    marginVertical: Dimensions.HP_1_7_7 ,//15,
    alignItems: 'center',
    
  },
  userDataContainer: {
    alignItems: 'center',
  },
});
