import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Info from '../../scene/info';
import Login from '../../scene/login/index'
import SplashScreen from 'react-native-splash-screen';
import Register from '../../scene/register';
import ForgotPasswordScreen from '../../scene/forgotPass'

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  function SplashScreenFunction() {
    console.log(`hiding the splash screen auth`);
    SplashScreen.hide();
  }

  useEffect(() => {
    console.log(`splash screen auth`);
    SplashScreenFunction();
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="InfoScreen" component={Info}></Stack.Screen>
      <Stack.Screen name="Register" component={Register}></Stack.Screen>
      <Stack.Screen name="Login" component={Login}></Stack.Screen>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
