import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import CustomText from '../../components/atoms/CustomText';
import {Fonts, FontSize} from '../../utils/fonts/fonts';
import {Strings} from './strings';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import {Colors} from '../../utils/colors/colors';
import EyeOpen from '../../assets/svgs/EyeOpen';
import EyeClose from '../../assets/svgs/EyeClose';
import ButtonWithIcon from '../../components/atoms/ButtonWithIcon';
import GoogleLogo from '../../assets/svgs/GoogleLogo';
import RightArrow from '../../assets/svgs/RightArrow';
import BottomText from '../../components/molecules/BottomText';
import {
  alphabetValidation,
  emailValidation,
  ErrorMessages,
  googleWeClientId,
  PasswordValidation,
} from '../../utils/constants/constants';
import Dimensions from '../../utils/dimension/dimensions';
import CustomKeyboardAwareScrollView from '../../components/atoms/CustomKeyboardAwareScrollView';
import AppleLogo from '../../assets/svgs/AppleLogo';
import {CurrentErrorContext} from '../../context/error_message_context';
// import {googleSignIn} from '../../utils/functions/GoogleSignIn';
import {MessageType, Provider} from '../../utils/enum/enums';
import {InProgress} from '../../utils/constants/fontConstants';
import UserLogo from '../../assets/svgs/UserLogo';
import LockLogo from '../../assets/svgs/LockLogo';
import KathaVachakLogo from '../../assets/svgs/kathavachak_Logo';
import OpenEmail from '../../assets/svgs/OpenEmail';
import {googleSignIn} from '../../utils/functions/GoogleSignIn';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {storeEmailLogin, storeToLocal} from '../../utils/storage/storage';
import NavigationService from '../../navigation/service/navigationService';
import {registerWithEmail} from '../../utils/functions/EmailSignIn';
import database from '@react-native-firebase/database';
import {
  getPaddingTop,
  showToastMessage,
} from '../../utils/functions/commanFunctions';

const Register = (props: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [apiObject, setApiObject] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [objectError, setObjectError] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const ErrorContext = useContext(CurrentErrorContext);
  const [role, setRole] = useState('');

  /**configuring google web Id */
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: googleWeClientId,
      offlineAccess: false,
    });
  }, []);

  function LoginInWithGoogle() {
    googleSignIn()
      .then(async (data = {}) => {
        // @ts-ignore
        if (data?.user?.name && data?.user?.email) {
          // @ts-ignore
          const googleCredential = auth.GoogleAuthProvider.credential(
            data?.idToken,
          );
          showToastMessage(
            // @ts-ignore
            `Welocme ${data?.user?.name}`,
            MessageType.Success,
          );
          const userCredential = await auth().signInWithCredential(
            googleCredential,
          ); //finalData
          // @ts-ignore
          await database().ref(`/Users/${userCredential?.user?.uid}`).set({
            // @ts-ignore
            tokenId: data?.idToken,
            // @ts-ignore
            email: data?.user?.email,
            // @ts-ignore
            fullName: data?.user?.name,
          });
        } else {
          Alert.alert('Oops', 'Something went wrong');
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  }

  const handleRegister = async () => {
    if (apiObject?.email && apiObject?.password) {
      try {
        setLoading(true);
        const response = await registerWithEmail(
          apiObject.email,
          apiObject.password,
          apiObject.name,
        );
        setLoading(false);
        if (response?.emailVerified) {
          showToastMessage(
            `Welcome ${response?.displayName}`,
            // `Account is successfully created`,
            MessageType.Success,
          );
        } else {
          setLoading(false);
          showToastMessage(
            `Please verify your email to complete registration`,
            MessageType.Warning,
          );
        }
        // Navigate to another screen or perform any other action upon successful registration
      } catch (error) {
        setLoading(false);
        //@ts-ignore
        // Alert.alert('Error', error.message);
        showToastMessage(
          `Account Verified Use login screen to login`,
          MessageType.Success,
        );
      }
    }
  };
  function isValid() {
    const result = emailValidation.test(
      String(apiObject.email.trim()).toLowerCase(),
    );
    const passwordResult = PasswordValidation.test(apiObject.password);
    const fullNameResult = alphabetValidation.test(apiObject.name);

    if (
      apiObject.name.length == 0 ||
      (apiObject.name.length > 0 && !fullNameResult)
    ) {
      setObjectError(prevState => ({
        ...prevState,
        fullName: true,
      }));

      return false;
    } else if (
      apiObject.email.length == 0 ||
      (apiObject.email.length > 0 && !result)
    ) {
      setObjectError(prevState => ({
        ...prevState,
        email: true,
      }));
      return false;
    } else if (
      apiObject.password.length == 0 ||
      (apiObject.password.length > 0 && !passwordResult)
    ) {
      setObjectError(prevState => ({
        ...prevState,
        password: true,
      }));
      return false;
    } else if (apiObject.password != apiObject.password_confirmation) {
      setObjectError(prevState => ({
        ...prevState,
        confirmPassword: true,
      }));
      return false;
    }

    return true;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.White}}>
      <CustomKeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.containerStyle}>
        <View style={{alignSelf: 'center', marginTop: 15, marginBottom: 5}}>
          <KathaVachakLogo></KathaVachakLogo>
        </View>
        <CustomText style={styles.titleStyle}>{Strings.title}</CustomText>
        <CustomTextInput
          isLeftIcon={true}
          iconLeftDisabled={true}
          leftIcon={<UserLogo />}
          mainStyle={styles.textInputStyle}
          hasError={objectError.fullName}
          value={apiObject.name}
          errorMessage={ErrorMessages.nameValidation}
          placeHolder={Strings.fullName}
          onChangeText={(text: string) => {
            setApiObject(prevState => ({
              ...prevState,
              name: text,
            }));
            if (objectError.fullName) {
              setObjectError(prevState => ({
                ...prevState,
                fullName: false,
              }));
            }
          }}></CustomTextInput>
        <CustomTextInput
          iconLeftDisabled={true}
          isLeftIcon={true}
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
        <CustomTextInput
          iconLeftDisabled={true}
          isLeftIcon={true}
          leftIcon={<LockLogo></LockLogo>}
          mainStyle={styles.textInputStyle}
          placeHolder={Strings.password}
          isRightIcon={true}
          hasError={objectError.password}
          value={apiObject.password}
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
        <CustomTextInput
          iconLeftDisabled={true}
          isLeftIcon={true}
          leftIcon={<LockLogo></LockLogo>}
          mainStyle={styles.textInputStyle}
          placeHolder={Strings.confirmPassword}
          isRightIcon={true}
          hasError={objectError.confirmPassword}
          secureTextEntry={!confirmPasswordVisible}
          errorMessage={ErrorMessages.confirmPasswordValidation}
          value={apiObject.password_confirmation}
          onIconPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          rightIcon={
            !confirmPasswordVisible ? (
              <EyeOpen></EyeOpen>
            ) : (
              <EyeClose></EyeClose>
            )
          }
          onChangeText={(text: string) => {
            setApiObject(prevState => ({
              ...prevState,
              password_confirmation: text,
            }));
            if (objectError.confirmPassword) {
              setObjectError(prevState => ({
                ...prevState,
                confirmPassword: false,
              }));
            }
          }}></CustomTextInput>
        <ButtonWithIcon
          // disable={!(selected.length > 0)}
          loading={loading}
          // onPress={InProgress}
          onPress={() => {
            if (isValid()) {
              handleRegister();
            }
          }}
          style={{
            backgroundColor: Colors.PurpleBorder,
            marginTop: Dimensions.HP_3,
            borderColor: Colors.Disable,
          }}
          textStyle={{
            fontFamily: Fonts.SoraSemiBold,
            fontWeight: '800',
            fontSize: FontSize[16],
          }}
          title={Strings.createAccount}></ButtonWithIcon>
        {/* <ButtonWithIcon
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
          }}></ButtonWithIcon> */}
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

        <BottomText
          style={{marginVertical: Dimensions.HP_3}}
          title={'Already member? '}
          subTitle={'Log in'}
          onPress={() => props.navigation.navigate('Login')}></BottomText>
      </CustomKeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  textInputStyle: {
    borderRadius: 0,
    marginTop: Dimensions.HP_2_4,
  },
  titleStyle: {
    alignSelf: 'center',
    fontFamily: Fonts.SoraSemiBold,
    fontWeight: '700',
    fontSize: FontSize[28],
    marginBottom: Dimensions.HP_2,
    color: Colors.Purple_Text_1,
  },
  BlueText: {
    color: Colors.PeacockBlue,
  },
  containerStyle: {
    paddingTop: Platform.OS == 'ios' ? Dimensions.HP_2_4 : 0,
    paddingHorizontal: 20,
    backgroundColor: Colors.White,
    paddingBottom: Dimensions.HP_5_9,
  },
});
