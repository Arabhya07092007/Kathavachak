import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import database from '@react-native-firebase/database';
import BackBtn from '../../components/molecules/BackBtn';
import {Strings} from './strings';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import CustomScrollView from '../../components/atoms/CustomScrollView';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import OpenEmail from '../../assets/svgs/OpenEmail';
import {
  alphabetValidation,
  emailValidation,
  ErrorMessages,
  googleWeClientId,
  PasswordValidation,
} from '../../utils/constants/constants';
import Dimensions from '../../utils/dimension/dimensions';
import CustomButton from '../../components/atoms/CustomButton';
import {Colors} from '../../utils/colors/colors';
import ForgotPasswordImage from '../../assets/svgs/ForgotPasswordImage';
import CustomText from '../../components/atoms/CustomText';
import auth from '@react-native-firebase/auth';
import CustomKeyboardAwareScrollView from '../../components/atoms/CustomKeyboardAwareScrollView';

const ForgotPasswordScreen = (props: any) => {
  const [apiObject, setApiObject] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [objectError, setObjectError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [isRequestSent, setIsRequestSent] = useState(false);

  function isValid() {
    const result = emailValidation.test(
      String(apiObject.email.trim()).toLowerCase(),
    );
    if (
      apiObject.email.length == 0 ||
      (apiObject.email.length > 0 && !result)
    ) {
      setObjectError(prevState => ({
        ...prevState,
        email: true,
      }));
      return false;
    }
    return true;
  }

  const handleForgotPassword = async (email: string) => {
    try {
      const resetPass = await auth().sendPasswordResetEmail(email);
      console.log('rp', resetPass);
      setIsRequestSent(true);
    } catch (error) {
      console.log(`error in sending password`);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.White}}>
      <CustomKeyboardAwareScrollView
        style={{
          flex: 1,
          paddingTop: Platform.OS == 'ios' ? Dimensions.HP_2_4 : 0,
          // paddingHorizontal: Dimensions.WP_5_1,
          backgroundColor: Colors.White,
        }}>
        <BackBtn
          // title={Strings.forgotPassword}
          textStyle={styles.customTextStyle}
          onPress={() => {
            props.navigation.pop();
          }}></BackBtn>
        <View style={{marginTop: 10, alignSelf: 'center'}}>
          <ForgotPasswordImage></ForgotPasswordImage>
        </View>
        <View
          style={{
            flexGrow: 1,
            marginVertical: Dimensions.HP_1_1_8,
            paddingBottom: Dimensions.HP_2_4,
            paddingHorizontal: Dimensions.WP_3_8, //15,
          }}>
          <CustomText style={styles.heading}>
            {Strings.forgotPassword}
          </CustomText>
          <CustomText style={styles.subTitle}>{Strings.subTitle}</CustomText>
          {isRequestSent ? (
            <CustomText
              style={
                styles.subTitle
              }>{`A password reset link has been sent to ${apiObject.email}.\n\nPlease check your email for further instructions.`}</CustomText>
          ) : (
            <CustomTextInput
              isLeftIcon={true}
              iconLeftDisabled={true}
              leftIcon={<OpenEmail></OpenEmail>}
              mainStyle={styles.textInputStyle}
              hasError={objectError.email}
              placeHolder={Strings.email}
              value={apiObject.email}
              errorMessage={ErrorMessages.emailValidation}
              onChangeText={(text: string) => {
                setApiObject(prevState => ({
                  ...prevState,
                  email: text.toString().trim(),
                }));
                if (objectError.email) {
                  setObjectError(prevState => ({
                    ...prevState,
                    email: false,
                  }));
                }
              }}></CustomTextInput>
          )}
        </View>
        <CustomButton
          style={styles.btnStyle}
          title={Strings.resetPassword}
          textStyle={styles.btnTxtStyle}
          onPress={() => {
            if (isValid()) {
              handleForgotPassword(apiObject.email);
            }
          }}
        />
      </CustomKeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.White,
    paddingTop: Dimensions.HP_2_3_6, //20,
  },
  customTextStyle: {
    backgroundColor: Colors.White,
  },
  textInputStyle: {
    // borderRadius: 0,
    marginTop: Dimensions.HP_2_4,
  },
  labelStyle: {
    fontFamily: Fonts.Regular,
    fontWeight: '500',
    fontSize: FontSize[13],
  },
  btnStyle: {
    // marginTop: 20,
    marginBottom: Dimensions.HP_2_3_6, //20,
    marginHorizontal: Dimensions.WP_2_5_6, //10,
    backgroundColor: Colors.PurpleBorder,
    height: 55,
  },
  btnTxtStyle: {
    fontFamily: Fonts.SoraSemiBold,
    fontSize: FontSize[16],
  },
  heading: {
    paddingTop: 10,
    fontFamily: Fonts.Bold,
    fontSize: FontSize[32],
    color: Colors.Purple_Text_1,
  },
  subTitle: {
    paddingTop: 15,
    fontFamily: Fonts.Regular,
    fontSize: FontSize[16],
    color: Colors.Text_DarkShade_Grey,
  },
});
