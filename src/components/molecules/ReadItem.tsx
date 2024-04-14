import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Dimensions from '../../utils/dimension/dimensions';
import FlatlistImageView from './FlatlistImageView';
import {Images} from '../../utils/imageSource/imageSource';
import {activeOpacity} from '../../utils/constants/constants';
import CustomText from '../atoms/CustomText';
import LoadingBar from '../../assets/svgs/LoadingBar';
import IconButton from './IconButton';
import PlaySymbol from '../../assets/svgs/PlaySymbol';
import {Colors} from '../../utils/colors/colors';
import {FontSize, Fonts} from '../../utils/fonts/fonts';

const ReadItem = (props: any) => {
  const {
    width = 300,
    onPress,
    item,
    aspectRatio = 1,
    title = 'Something to Play',
    titleStyle,
    percentPlayed = '35%',
  } = props;

  return (
    <View>
      <FlatlistImageView
        aspectRatio={aspectRatio}
        status={item?.status}
        source={item?.photos?.length > 0 ? item.photos[0] : Images.image}
        width={width}
        image={Images.image}
      ></FlatlistImageView>
      <View
        style={{
          position: 'absolute', 
          top: 150, 
          borderRadius: 10,
          width: width - 20,
          backgroundColor: Colors.LightPurple,
          height: 50,
          flexDirection: 'row',
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            marginLeft: 5,
          }}>
          <CustomText style={titleStyle}>{title}</CustomText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <LoadingBar></LoadingBar>
            <CustomText
              style={{
                marginLeft: 5,
                color: Colors.Pink,
                fontFamily: Fonts.Bold,
                fontSize: FontSize[12],
              }}>
              {percentPlayed}
            </CustomText>
          </View>
        </View>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={activeOpacity}
          style={{alignSelf: 'center', marginRight: 15}}>
          <PlaySymbol />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReadItem;

const styles = StyleSheet.create({});
