import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CustomText from '../../components/atoms/CustomText';
import {Strings} from './strings';
import {Colors} from '../../utils/colors/colors';
import {Fonts, FontSize} from '../../utils/fonts/fonts';
import ButtonWithIcon from '../../components/atoms/ButtonWithIcon';
import GoogleLogo from '../../assets/svgs/GoogleLogo';
import {googleSignIn} from '../../utils/functions/GoogleSignIn';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  emailValidation,
  ErrorMessages,
  googleWeClientId,
} from '../../utils/constants/constants';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import EyeOpen from '../../assets/svgs/EyeOpen';
import EyeClose from '../../assets/svgs/EyeClose';
import BottomText from '../../components/molecules/BottomText';
import Dimensions from '../../utils/dimension/dimensions';
import {CurrentErrorContext} from '../../context/error_message_context';
import CustomKeyboardAwareScrollView from '../../components/atoms/CustomKeyboardAwareScrollView';
import {MessageType, Provider} from '../../utils/enum/enums';
import UserLogo from '../../assets/svgs/UserLogo';
import LockLogo from '../../assets/svgs/LockLogo';
import KathaVachakLogo from '../../assets/svgs/kathavachak_Logo';
import auth from '@react-native-firebase/auth';
import {loginWithEmail} from '../../utils/functions/EmailLoginIn';
import {showToastMessage} from '../../utils/functions/commanFunctions';
import database from '@react-native-firebase/database'

const Login = (props: any) => {
  /**configuring google web Id */
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: googleWeClientId,
      offlineAccess: false,
    });
  }, []);

  const [apiObject, setApiObject] = useState({
    email: '',
    password: '',
  });
  const [objectError, setObjectError] = useState({
    email: false,
    password: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const ErrorContext = useContext(CurrentErrorContext);

  // function LoginInWithGoogle() {
  //   googleSignIn()
  //     .then((data = {}) => {
  //       console.log(data);
  //       // @ts-ignore
  //       if (data?.user?.name && data?.user?.email) {
  //         // @ts-ignore
  //         const googleCredential = auth.GoogleAuthProvider.credential(data?.idToken);
  //         showToastMessage(
  //           // @ts-ignore
  //           `Welcome ${data?.user?.name}`,
  //           MessageType.Success,
  //         );
  //         return auth().signInWithCredential(googleCredential); //finalData
  //         // socialLogin(finalData, setLoading, ErrorContext);
  //       } else {
  //         Alert.alert('Oops', 'Something went wrong');
  //       }
  //     })
  //     .catch(error => {
  //       Alert.alert(error);
  //       console.log('error login', error);
  //     });
  // }
  function LoginInWithGoogle() {
    googleSignIn()
      .then(async (data = {}) => {
        // @ts-ignore
        if (data?.user?.name && data?.user?.email) {
          // @ts-ignore
          const googleCredential = auth.GoogleAuthProvider.credential(data?.idToken);
          showToastMessage(
            // @ts-ignore
            `Welocme ${data?.user?.name}`,
            MessageType.Success,
          );
          const userCredential = await auth().signInWithCredential(googleCredential); //finalData
          // @ts-ignore
          await database().ref(`/Users/${userCredential?.user?.uid}`)
          .set({
            // @ts-ignore
            tokenId: data?.idToken,
            // @ts-ignore
            email: data?.user?.email,
            // @ts-ignore
            fullName: data?.user?.name,
          })
        } else {
          Alert.alert('Oops', 'Something went wrong');
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  }
  const handleLoginEmail = async () => {
    try {
      setLoading(true);
      const response = await loginWithEmail(
        apiObject.email,
        apiObject.password,
      );
      setLoading(false);
      // Alert.alert('Success', 'Account created successfully.');
      showToastMessage(
        // @ts-ignore
        `Welcome ${response?.displayName}`,
        MessageType.Success,
      );
      // Navigate to another screen or perform any other action upon successful registration
    } catch (error) {
      setLoading(false);
      //@ts-ignore
      showToastMessage(
        // @ts-ignore
        error, //`Error will Login`,
        MessageType.Error,
      );
      //@ts-ignore
      console.log('error:', error?.message);
    }
  };

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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.White}}>
      <CustomKeyboardAwareScrollView
        style={{
          flex: 1,
          paddingTop: Platform.OS == 'ios' ? Dimensions.HP_2_4 : 0,
          paddingHorizontal: Dimensions.WP_5_1,
          backgroundColor: Colors.White,
        }}>
        <View style={{alignSelf: 'center', marginTop: 15, marginBottom: 5}}>
          <KathaVachakLogo></KathaVachakLogo>
        </View>
        <CustomText style={styles.titleStyle}>{Strings.title}</CustomText>

        <CustomTextInput
          mainStyle={styles.textInputStyle}
          isLeftIcon={true}
          iconLeftDisabled={true}
          hasError={objectError.email}
          placeHolder={'Email or username'}
          errorMessage={ErrorMessages.emailValidation}
          leftIcon={<UserLogo />}
          onChangeText={(text: string) => {
            setApiObject(prevState => ({
              ...prevState,
              email: text.toString(),
            }));
            if (objectError.email) {
              setObjectError(prevState => ({
                ...prevState,
                email: false,
              }));
            }
          }}></CustomTextInput>
        <CustomTextInput
          mainStyle={styles.textInputStyle}
          placeHolder={Strings.password}
          isRightIcon={true}
          isLeftIcon={true}
          iconLeftDisabled={true}
          leftIcon={<LockLogo />}
          hasError={objectError.password}
          secureTextEntry={!passwordVisible}
          errorMessage={ErrorMessages.passwordValidation}
          onIconPress={() => setPasswordVisible(!passwordVisible)}
          rightIcon={
            !passwordVisible ? <EyeOpen></EyeOpen> : <EyeClose></EyeClose>
          }
          onChangeText={(text: string) => {
            setApiObject(prevState => ({
              ...prevState,
              password: text,
            }));
            if (objectError.password) {
              setObjectError(prevState => ({
                ...prevState,
                password: false,
              }));
            }
          }}></CustomTextInput>
        <BottomText
          style={styles.ForgotPasswordTextStyle}
          subTitleStyle={styles.subTitleStyleForgotPassword}
          subTitle={Strings.forgotPassword}
          onPress={() =>
            props.navigation.navigate('ForgotPassword')
          }></BottomText>
        <ButtonWithIcon
          loading={loading}
          onPress={() => {
            if (isValid()) {
              var obj = {...apiObject};
              obj.email = obj.email.toString().toLowerCase();
              var finalObject = {
                user: obj,
              };
              handleLoginEmail();
            }
          }}
          // onPress={InProgress}
          style={{
            backgroundColor: Colors.PurpleBorder,
            marginTop: Dimensions.HP_3,
            borderColor: Colors.Disable,
          }}
          title={Strings.signIn}></ButtonWithIcon>
        <ButtonWithIcon
          style={{
            backgroundColor: 'rgb(243,243,240)',
            borderWidth: 0,
            marginTop: Dimensions.HP_1_8,
          }}
          title={Strings.google}
          leftIcon={<GoogleLogo></GoogleLogo>}
          onPress={LoginInWithGoogle}
          textStyle={{
            color: Colors.Black,
            fontFamily: Fonts.Bold,
          }}></ButtonWithIcon>
      </CustomKeyboardAwareScrollView>
      <BottomText
        style={styles.bottomTextStyle}
        title={Strings.new}
        onPress={() => {
          props.navigation.navigate('Register');
        }}
        titleStyle={{color: Colors.Purple_Text_1}}
        subTitle={Strings.signUp}></BottomText>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 0,
    marginTop: Dimensions.HP_2_4,
  },
  titleStyle: {
    alignSelf: 'center',
    fontFamily: Fonts.SoraSemiBold,
    fontWeight: '800',
    fontSize: FontSize[28],
    marginBottom: Dimensions.HP_5_9,
    color: Colors.Purple_Text_1,
  },
  BlueText: {
    color: Colors.PeacockBlue,
  },
  ForgotPasswordTextStyle: {
    alignSelf: 'flex-end',
  },
  subTitleStyleForgotPassword: {
    fontSize: FontSize[12],
    fontFamily: Fonts.SoraRegular,
  },
  bottomTextStyle: {
    marginBottom: Dimensions.HP_2_9_6, //25
  },
});
/*
   <ButtonWithIcon
            style={{
              backgroundColor: Colors.Black,
              borderWidth: 0,
              marginTop: Dimensions.HP_1_8,
            }}
            title={Strings.apple}
            leftIcon={<AppleLogo></AppleLogo>}
            onPress={() => Alert.alert('In-Progress')}
            textStyle={{
              color: Colors.White,
              fontFamily: Fonts.Bold,
            }}></ButtonWithIcon>
*/