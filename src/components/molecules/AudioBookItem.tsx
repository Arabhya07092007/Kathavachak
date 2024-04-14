import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FlatlistImageView from './FlatlistImageView';
import {Colors} from '../../utils/colors/colors';
import {Images} from '../../utils/imageSource/imageSource';
import CustomText from '../atoms/CustomText';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import {activeOpacity} from '../../utils/constants/constants';
import PlayButtonSymbol from '../../assets/svgs/PlayButtonSymbol';
import Dimensions from '../../utils/dimension/dimensions';
import FolderLogo from '../../assets/svgs/Folder';
import DownloadLogo from '../../assets/svgs/DownloadLogo';
import MoreCircle from '../../assets/svgs/MoreCircle';
import IconBtn from '../atoms/IconBtn';
import {InProgress} from '../../utils/constants/fontConstants';
import { Language } from '../../utils/enum/enums';

const AudioBookItem = (props: any) => {
  const {
    widthImage = Dimensions.WP_25_6, //100,
    widthContainer = Dimensions.WP_83_5_8,
    onPressPlay,
    item,
    aspectRatio = 1,
    title = 'Something to Play',
    titleStyle,
    subTitle = 'SubTitle',
    subTitleStyle,
    style,
    numberOfLines= 2,
    image= Images.audioBookImage
  } = props;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          width: widthContainer, //326,
          // borderWidth: 1,
          // borderColor: 'red',
        },
        style,
      ]}>
      <FlatlistImageView
        aspectRatio={aspectRatio}
        status={item?.status}
        source={
          item.url != ''  ? item?.url: Images.imagePlaceholder
        }
        width={widthImage}
        // image={image}
        ></FlatlistImageView>
      <View style={{flexDirection: 'column'}}>
        <CustomText
          style={[styles.titleStyle, titleStyle]}
          numberOfLines={numberOfLines}>
          {item?.title}
        </CustomText>
        <CustomText
          style={[styles.subTitleStyle, subTitleStyle]}
          numberOfLines={numberOfLines}>
          {Language[item?.language as keyof typeof Language]}
        </CustomText>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: 'orange',
            alignItems: 'center',
          }}>
          <IconBtn Icon={<PlayButtonSymbol />} onPress={onPressPlay}></IconBtn>
          {/* <IconBtn Icon={<FolderLogo />} onPress={InProgress}></IconBtn>
          <IconBtn Icon={<DownloadLogo />} onPress={InProgress}></IconBtn>
          <IconBtn Icon={<MoreCircle />} onPress={InProgress}></IconBtn> */}
        </View>
      </View>
    </View>
  );
};

export default AudioBookItem;

const styles = StyleSheet.create({
  titleStyle: {
    width: Dimensions.WP_54_8, //214,
    marginLeft: Dimensions.WP_2_5_6, //10,
    paddingRight: 0,
    fontFamily: Fonts.Bold,
    fontSize: FontSize[12],
    color: Colors.Purple_Text_1,
    fontWeight: '700',
    // backgroundColor: 'red',
  },
  subTitleStyle: {
    width: Dimensions.WP_54_8, //214,
    marginLeft: Dimensions.WP_2_5_6, //10,
    // paddingTop:10,
    marginTop: 5,
    fontWeight: '400',
    // paddingHorizontal:5,
    paddingRight: 0,
    fontFamily: Fonts.Regular,
    fontSize: FontSize[10],
    color: Colors.Purple_Text_1,
    // backgroundColor: 'pink',
  },
});
