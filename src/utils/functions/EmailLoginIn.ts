import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { storeEmailLogin} from '../storage/storage';
import NavigationService from '../../navigation/service/navigationService';

export const loginWithEmail = async (email: string, password: string) => {
  return new Promise(async (resovle, reject) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential?.user;

      if (user) {
        const userId = user?.uid;
        const fullNameRef = database().ref(`Users/${userId}/fullName`);

        const snapshot = await fullNameRef.once('value');
        const fullName = snapshot.val();
        const updatedUser = {
          displayName: fullName,
          photoUrl: ''
        };
     
        await user?.updateProfile(updatedUser)

        const updatedUserObject = auth().currentUser
      
        storeEmailLogin(updatedUserObject);
        NavigationService.replace('RootStack')
        resovle(updatedUserObject);
      }
    } catch (error) {
      // @ts-ignore
      reject(error.message);
    }
  });
};
