import {Image} from 'react-native';
import {Colors} from '../colors/colors';
import Dimensions from '../dimension/dimensions';
// import {Images} from '../imageSource/imageSource';
import {Platform} from 'react-native';

export const Constants = {
  versionNumber: '1.0',
};

export const emailValidation =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PasswordValidation = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

export const phoneNumberValidation =  /^[0-9]{10}$/
// /^[0-9]*$/;
export const numberValidation = /^[0-9]*$/
export const alphabetValidation = /^[a-zA-Z\s]+$/ //new RegExp('^[a-zA-Zs]+$');
export const googleWeClientId =
  '1046832765128-s5eanh2c73q2b6pc1d8h39urm8a489hc.apps.googleusercontent.com';

// export const decimalRegex = /^([1-9]{0,2})*[.]?[0-9]{0,2}$/
export const pdfTextValidation = '[\u0900-\u097F\u0A80-\u0AFF\u0B00-\u0B7F\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u0020-\u007E]+'
export const decimalRegex = /^\d{1,2}(\.\d{1,2})?$/;

export enum HttpMethods {
  'Post' = 'POST',
  'Get' = 'GET',
  'Put' = 'PUT',
  'Delete' = 'DELETE',
}

export const commonStrings = {
  NoInternetTitle: 'Oops, No Internet Connection',
  NoInternetSubtitle:
    'Make sure wifi or cellular data is turned on and they try again.',
  ForgotPassword: 'Forgot Password',
};

export const TimeFormat = 'YYYY-MM-DD HH:mm';

export const ErrorMessages = {
  emailValidation: 'Email id is not valid',
  passwordValidation:
    'Password must have minimum 8 characters, at least one uppercase, one lowercase, one number and one special character',
  confirmPasswordValidation: 'Both password should be same',
  nameValidation: 'Name is not valid',
  phoneValidaton: 'Phone number is not valid',
  commonValidation: 'This Field cannot be empty',
  commonValidation_1:'Field is not valid'
};



const iconStyle = {
  height: Dimensions.HP_2_5,
  width: Dimensions.WP_5,
};

export const imageSingleOptions = {
  height: 400,
  width: 400,
  mediaType: 'photo',
  includeBase64: false,
  // maxFiles: 1,
  multiple: true,
};

export function ShadowStyle() {
  return {
    marginTop: 2,
    backgroundColor: 'White',
    // overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 3 : 7,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.29 : 0.43,
    shadowRadius: Platform.OS === 'ios' ? 4.65 : 9.51,
    elevation: Platform.OS === 'ios' ? 10 : 10,
    borderRadius: 30,
  };
}

export const activeOpacity = 1;
