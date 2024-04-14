import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from '../../utils/colors/colors';
import Dimensions from '../../utils/dimension/dimensions';
import CustomText from './CustomText';
import { activeOpacity } from '../../utils/constants/constants';
import { FontSize, Fonts } from '../../utils/fonts/fonts';
// import Cross from '../res/Svgs/Cross.svg'

const CustomTextInput = (props: any) => {
  const {
    isNumber = false,
    dialCode = 91,
    mainStyle,
    textInputStyle,
    isLeftIcon = false,
    isRightIcon = false,
    placeHolder,
    onPress,
    keyboardType = 'default',
    value = null,
    isPress = false,
    hasError = false,
    errorMessage = 'This field can not be empty',
    returnKeyType = 'default',
    maxLength = null,
    focusNeeded = false,
    editable = true,
    titleStyle,
    Label = '',
    mainContainer,
    secureTextEntry = false,
    imageSource,
    placeHolderTextColor,
    onButtonPress,
    defaultValue,
    multiLine = false,
    labelContainerStyle,
    numberOfLine = undefined,
    astreixRequired = false,
    iconLeftDisabled=false,
    iconRightDisabled=false,
  } = props;

  const RightIcon = () => {
    return props.rightIcon;
  };

  const LeftIcon = () => {
    return props.leftIcon;
  };
  return (
    <View style={[mainContainer]}>
      <View style={[styles.labelContainer, labelContainerStyle]}>
        {Label && (
          <CustomText style={[titleStyle]} numberOfLines={numberOfLine}>
            {Label}
            {astreixRequired == true ? (
              <CustomText
                style={{
                  color: Colors.Error,
                  fontSize: FontSize[11],
                  fontWeight: '600',
                  fontFamily: Fonts.Regular,
                }}>
                {' '}
                *
              </CustomText>
            ) : null}
          </CustomText>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.MainContainer,
          {borderColor: hasError ? Colors.Red : Colors.Disable2},
          mainStyle,
        ]}
        activeOpacity={1}
        onPress={onButtonPress ? onButtonPress : null}>
        {isNumber && (
          <View style={styles.DialCodeContainer}>
            <CustomText style={{color: Colors.Black}}>
              {'+' + dialCode}
            </CustomText>
          </View>
        )}
        {isLeftIcon && (
          <TouchableOpacity
          disabled={iconLeftDisabled}
            style={styles.IconButtonStyle}
            onPress={() => {
              props.onIconPress();
            }}
            activeOpacity={activeOpacity}
            >
            {LeftIcon()}
          </TouchableOpacity>
        )}
        <TextInput
          multiline={multiLine}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          editable={editable}
          defaultValue={defaultValue}
          value={value}
          onPressIn={() => {
            if (isPress) {
              onPress();
            }
          }}
          onFocus={() => {
            if (focusNeeded) {
              props.onFocus();
            }
          }}
          onBlur={() => {
            if (focusNeeded) {
              props.onBlur();
            }
          }}
          style={[styles.textInputStyle, textInputStyle]}
          placeholder={placeHolder}
          placeholderTextColor={
            placeHolderTextColor ? placeHolderTextColor : Colors.Disable2
          }
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onChangeText={text => {
            props.onChangeText(text);
          }}
          // autoCapitalize={autoCapitalize}
        ></TextInput>
        {isRightIcon && (
          <TouchableOpacity
            style={styles.IconButtonStyle}
            onPress={() => {
              props.onIconPress();
            }}>
            {RightIcon()}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {hasError && (
        <Text style={{color: 'red', marginTop: 2}}>*{errorMessage}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    height: Dimensions.HP_7_1,
    // marginTop: 10
  },
  DialCodeContainer: {
    marginStart: 10,
    marginRight: 5,
    flexDirection: 'row',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    flex: 1,
    color: Colors.Black,
  },
  IconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    // height: 17,
    // width: 17,
    // borderRadius: 17,
    alignSelf: 'center',
    // backgroundColor: Colors.Black
  },
  IconStyle: {},
  labelContainer: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    paddingHorizontal: 3,
    marginStart: Dimensions.WP_2_5, // 10,
    zIndex: 1,
    position: 'absolute',
    top: -Dimensions.HP_1_4, //12,
  },
});
