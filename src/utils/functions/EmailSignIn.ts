import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {storeEmailLogin, storeToLocal} from '../storage/storage';
import NavigationService from '../../navigation/service/navigationService';
import database from '@react-native-firebase/database';
import {showToastMessage} from './commanFunctions';
import {MessageType} from '../enum/enums';

export const registerWithEmail = async (
  email: string,
  password: string,
  fullName: string,
  // lastName: string,
) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    console.log(`userCred: ${JSON.stringify(userCredential)}`);
    const data = {
      tokenId: userCredential?.user?.uid,
      email: email,
      password: password,
      fullName: fullName,
    };

    const user = userCredential?.user;

    const updateUserProfile = {
      displayName: fullName,
      photoUrl: '',
    };

    await user?.updateProfile(updateUserProfile);

    const updatedUser = auth().currentUser;

    database()
    // @ts-ignore
    .ref('/Users/' + userCredential?.user?.uid)
    .set(data)
    .then(() => {
      console.log('Data updated.');
    });
    
    await auth().currentUser?.sendEmailVerification();
    
    await auth().currentUser?.reload();
     storeEmailLogin(updatedUser);
     NavigationService.navigate('Login');
    
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
  }
};
