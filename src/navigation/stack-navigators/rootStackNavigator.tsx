import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from '../tab-navigators/bottomTabNavigator';
import Scan from '../../scene/scan';
import ReadScreen from '../../scene/read';
import UploadScreen from '../../scene/upload';
import AudioBookScreen from '../../scene/audiobook';
import Info from '../../scene/info';
import AudioBookReader from '../../scene/audiobook/audiobookReader.tsx';
import SplashScreen from 'react-native-splash-screen';
import EditProfile from '../../scene/profile/editProfile/index.tsx'
import NotificationScreen from '../../scene/profile/notification/index.tsx';
import SettingScreen from '../../scene/profile/settings/index.tsx';
import TermsAndConditionsScreen from '../../scene/profile/termsAndConditions/index.tsx';
import HelpAndSupportScreen from '../../scene/profile/help/index.tsx';
import ChatBotScreen from '../../scene/chatbotScreen/index.tsx';
import TermsOfUse from '../../scene/profile/termsOfUse';
import PrivacyPolicy from '../../scene/profile/privacyPolicy';

const RootStackNavigator = (props: any) => {
  const Stack = createNativeStackNavigator();

  // function SplashScreenFunction() {
  //   console.log(`hiding the splash screen`);
  //   SplashScreen.hide();
  // }

  // useEffect(() => {
  //   console.log(`splash screen`);
  //   SplashScreenFunction();
  // }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      {/* <Stack.Screen name="InfoScreen" component={Info}></Stack.Screen> */}
      <Stack.Screen name="Tabs" component={BottomTabNavigator}></Stack.Screen>
      <Stack.Screen name="ScanScreen" component={Scan}></Stack.Screen>
      <Stack.Screen name="UploadScreen" component={UploadScreen}></Stack.Screen>
      <Stack.Screen name="AudioBookScreen" component={AudioBookScreen}></Stack.Screen>
      <Stack.Screen name="ReadScreen" component={ReadScreen}></Stack.Screen>
      <Stack.Screen name="AudioBookReader" component={AudioBookReader}></Stack.Screen>
      <Stack.Screen name="EditProfile" component={EditProfile}></Stack.Screen>
      <Stack.Screen name="Notification" component={NotificationScreen}></Stack.Screen>
      <Stack.Screen name="Settings" component={SettingScreen}></Stack.Screen>
      <Stack.Screen name="TermsAndCondition" component={TermsAndConditionsScreen}></Stack.Screen>
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen}></Stack.Screen>
      <Stack.Screen name="TermsOfUse" component={TermsOfUse}></Stack.Screen>
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}></Stack.Screen>
      <Stack.Screen name="ChatBotScreen" component={ChatBotScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootStackNavigator;

const styles = StyleSheet.create({});
