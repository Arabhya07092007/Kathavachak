import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../utils/colors/colors';
import Dimensions from '../../utils/dimension/dimensions';
import {Fonts, FontSize} from '../../utils/fonts/fonts';

import CustomText from './CustomText';
import {activeOpacity} from '../../utils/constants/constants';

const CustomButton = (props: any) => {
  const {
    title = '',
    style,
    textStyle,
    disabled = false,
    isIcon = false,
    imageSource = '',
    mainStyle,
    label = '',
    hasError = false,
    loading = false,
    imageStyle,
    indicatorColor = Colors.White,
    textColor = '',
    sub_title = false,
    subTitle = '',
  } = props;

  return (
    <View style={[mainStyle]}>
      {label.length > 0 && (
        <Text
          style={{color: textColor || Colors.Grey, fontFamily: Fonts.Regular}}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.defaultStyle,
          {
            backgroundColor: disabled ? Colors.Grey : Colors.Black,
            paddingHorizontal: isIcon ? 20 : 0,
          },
          style,
        ]}
        disabled={disabled || loading ? true : false}
        onPress={() => props.onPress()}
        activeOpacity={activeOpacity}>
        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={indicatorColor}
            style={{alignSelf: 'center'}}></ActivityIndicator>
        ) : (
          <View style={{flexDirection: 'row'}}>
            {sub_title == true ? (
              <View style={{flexDirection: 'column'}}>
                <CustomText
                  style={[
                    {
                      color: textColor || Colors.White,
                      fontSize: FontSize[14],
                      fontFamily: Fonts.Regular,
                      flex: isIcon ? 1 : null,
                      fontWeight: '700',
                    },
                    textStyle,
                  ]}>
                  {title}
                </CustomText>
                <CustomText
                  style={[
                    {
                      color: textColor || Colors.White,
                      fontSize: FontSize[14],
                      fontFamily: Fonts.Regular,
                      flexDirection: 'column',
                      fontWeight: '700',
                    },
                    textStyle,
                  ]}>
                  {subTitle}
                </CustomText>
              </View>
            ) : (
              <CustomText
                style={[
                  {
                    color: textColor || Colors.White,
                    fontSize: FontSize[14],
                    fontFamily: Fonts.Regular,
                    flex: isIcon ? 1 : null,
                    fontWeight: '700',
                  },
                  textStyle,
                ]}>
                {title}
              </CustomText>
            )}
            {isIcon && (
              <Image
                source={imageSource}
                style={[
                  {
                    height: 15,
                    width: 15,
                    // tintColor: Colors.TextInputPlaceHolderColor,
                  },
                  imageStyle,
                ]}></Image>
            )}
          </View>
        )}
      </TouchableOpacity>
      {hasError && (
        <CustomText style={{color: Colors.Red}}>
          *This field can not be empty
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    height: Platform.OS == 'ios' ? Dimensions.HP_5 : Dimensions.HP_6,
    // width: Dimensions.WP_83,
    borderRadius: 30,
    backgroundColor: Colors.Black,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default CustomButton;
