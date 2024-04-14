import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";
import NavigationService from "../../navigation/service/navigationService";
import { storeToLocal } from "../storage/storage";

export const googleSignIn = async () => {

    return new Promise(async (resolve, reject) => {
        try {
            // setAuthService('google')
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            resolve(userInfo)
            storeToLocal(userInfo)
            NavigationService.replace('RootStack')


        } catch (error: any) {
            reject(error.message)
            //
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                if (error.message == 'NETWORK_ERROR') {
                    //
                    Alert.alert(
                        'Oops',
                        'Looks like you are not connected to the internet. Please check your connection and try again.',
                    );
                }
                // some other error happened
            }
        }
    })

};