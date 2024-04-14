import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from '../atoms/CustomButton';
import CustomText from '../atoms/CustomText';
// import LinearGradient from 'react-native-linear-gradient';
import ArrowLeft from '../../assets/svgs/ArrowLeft';
import {Colors} from '../../utils/colors/colors';
import Dimensions from '../../utils/dimension/dimensions';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import LeftArrow from '../../assets/svgs/LeftArrow';
import BackBtn2 from '../../assets/svgs/BackBtn2';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {activeOpacity} from '../../utils/constants/constants';

const BackBtn = (props: any) => {
  const {
    title = '',
    textStyle,
    onPress,
    mainConterStyle,
    chatBot = false,
    onPressChatBot,
    backBtnShow = true,
  } = props;
  const shareIcon = () => {
    return props.shareIcon;
  };
  return (
    // <View style={{flex:1}}>

    // <LinearGradient colors={['#F39519', '#FFBF3A']}>
    <View style={[styles.mainConainer, mainConterStyle]}>
      <View
        style={{
          alignSelf: 'center',
          // backgroundColor: 'red',
        }}>
        {backBtnShow && (
          <TouchableOpacity
            onPress={onPress}
            // style={{backgroundColor: 'red'}}
            activeOpacity={activeOpacity}>
            {/* <LeftArrow /> */}
            <BackBtn2 />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1, alignSelf: 'center'}}>
        <CustomText style={[styles.text, textStyle]}>{title}</CustomText>
      </View>
      {chatBot && <Pressable onPress={onPressChatBot}>{shareIcon()}</Pressable>}
    </View>
    // </LinearGradient>
    // </View>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  mainConainer: {
    marginTop: Platform.OS === 'ios' ? 100 : Dimensions.HP_2_3_6, //20,
    marginHorizontal: Dimensions.WP_3_8, //10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginBottom: Dimensions.HP_1_1_8, //10
    color: Colors.Purple_Text_1,
    textAlign: 'center',
    textAlignVertical: 'center',
    verticalAlign: 'middle',
    fontSize: FontSize[22],
    fontWeight: '500',
    fontFamily: Fonts.Bold,
  },
});
