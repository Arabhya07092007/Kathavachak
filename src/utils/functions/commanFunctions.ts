import {Alert, Dimensions as dim} from 'react-native';
import * as _ from 'lodash';
import {showMessage} from 'react-native-flash-message';
import {MessageType, Userkey, firebaseKey} from '../enum/enums';
// import NavigationService from '../../navigation/service/navigationService';
// import moment from 'moment';
import {AsyncKey, Storage} from '../storage/storage';
import NavigationService from '../../navigation/service/navigationService';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Dimensions from '../dimension/dimensions';
import DeviceInfo from 'react-native-device-info';
import {Images} from '../imageSource/imageSource';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Children} from 'react';
import auth from '@react-native-firebase/auth';

const {width, fontScale, height} = dim.get('window');
const guidelineBaseWidth = 375;
const defaultScaleFactor = width < guidelineBaseWidth ? 0.5 : 1;
const scale = (size: any) => (width / guidelineBaseWidth) * size;

export const fontScaleNormalize = _.memoize(
  (size: number, factor: number = defaultScaleFactor) =>
    fontScale > 1.4
      ? ((size + (scale(size) - size) * factor) / fontScale) * 1.353
      : size + (scale(size) - size) * factor,
);

export const showToastMessage = (
  message: string,
  type = MessageType.Error,
  duration = 2000,
) => {
  showMessage({
    // @ts-ignore
    type: type,
    // @ts-ignore
    icon: type,
    message: message,
    autoHide: true,
    duration: duration,
  });
};

export const objectToQueryString = (obj: any) => {
  const QueryString = Object.keys(obj)
    // eslint-disable-next-line func-names
    .map(function (key) {
      return `${key}=${obj[key]}`;
    })
    .join('&');

  return QueryString;
};

export function resetStack() {
  NavigationService.reset('AuthStack', 0);
}

export function autoLogout() {
  Alert.alert('Oops', 'User session time out');
  Storage.clearAll();
  resetStack();
}

export function logout() {
  // @ts-ignore
  var storedData = JSON.parse(Storage.getString(AsyncKey.UserData));
  Alert.alert('Log out', 'Are you sure you want to log out?', [
    {
      text: 'No',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: () => {
        Storage.clearAll();
        resetStack();
        storedData['providerId'] === 'firebase'
          ? auth().signOut
          : GoogleSignin.signOut();
      },
    },
  ]);
}

export const getPaddingTop = () => {
  return DeviceInfo.hasNotch() ? 40 : Dimensions.HP_2_3;
};

export const InProgress = () => {
  Alert.alert('Alert', 'In Progress');
};
export const getUserValues = (key: Userkey) => {
  // @ts-ignore
  var storedData = JSON.parse(Storage.getString(AsyncKey.UserData));

  switch (key) {
    case Userkey.username:
      if (storedData['providerId'] === 'firebase') {
        return storedData[firebaseKey.username]
          ? storedData[firebaseKey.username]
          : 'Anonymous';
      } else {
        return storedData[key] ? storedData[key] : 'Anonymous';
      }
    case Userkey.email:
      if (storedData['providerId'] === 'firebase') {
        return storedData[firebaseKey.email]
          ? storedData[firebaseKey.email]
          : 'abcd@email.com';
      } else {
        return storedData[key] ? storedData[key] : 'abcd@email.com';
      }
    case Userkey.firstName:
      if (storedData['providerId'] === 'firebase') {
       return storedData[firebaseKey.username]
          ? storedData[firebaseKey.username]
          : 'Full Name';
      } 
      else {
        return storedData[key] ? storedData[key] : 'First Name';
      }
    case Userkey.lastName:
      return storedData[key] ? storedData[key] : 'Last Name';
    case Userkey.profilePic:
      if (storedData['providerId'] === 'firebase') {
        return (
          storedData[firebaseKey.profilePic] &&
          storedData[firebaseKey.profilePic]
        );
      } else {
        return storedData[key] && storedData[key]; //: Images.userProfile
      }
    default:
      return false;
  }
};
