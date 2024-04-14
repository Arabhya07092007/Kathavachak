import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import NavigationService, {navigationRef} from '../service/navigationService';
import CurrentNetworkProvider from '../../context/network_context';
import CurrentErrorProvider from '../../context/error_message_context';
import {Colors} from '../../utils/colors/colors';
import RootStackNavigator from './rootStackNavigator';
import FlashMessage from 'react-native-flash-message';
import AuthStack from './authStack';
import {AsyncKey, Storage} from '../../utils/storage/storage';

const AppContainer = () => {
  const Stack = createNativeStackNavigator();

  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState('');

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const userData = await Storage.getString(AsyncKey.UserData);
        if (userData) {
          navigationRef.current?.navigate('RootStack'); // Navigate to main screen
        } else {
          navigationRef.current?.navigate('AuthStack'); // Navigate to authentication screen
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
      }
    };

    checkUserAuthentication();
  }, []);


  return (
    <NavigationContainer ref={navigationRef}>
      <CurrentNetworkProvider>
        <CurrentErrorProvider>
          <StatusBar
            // translucent
            backgroundColor={Colors.White}
            barStyle={'dark-content'}
          />
          {/* </LinearGradient> */}
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* {user ? ( */}
              <Stack.Screen
                name="AuthStack"
                component={AuthStack}></Stack.Screen>
            {/* ) : ( */}
              <Stack.Screen
                name="RootStack"
                component={RootStackNavigator}></Stack.Screen>
            {/* )} */}
          </Stack.Navigator>
        </CurrentErrorProvider>
      </CurrentNetworkProvider>
      <FlashMessage position={'top'} />
    </NavigationContainer>
    // <NavigationContainer ref={navigationRef}>
    // <StatusBar
    //   backgroundColor={Colors.White}
    //   barStyle={'dark-content'}
    //   />
    // <Stack.Navigator screenOptions={{headerShown: false}}>
    //   {/* <Stack.Screen name="AuthStack"  component={AuthStack}></Stack.Screen> */}
    //   <Stack.Screen name="RootStack"  component={RootStackNavigator}></Stack.Screen>
    // </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default AppContainer;

const styles = StyleSheet.create({});
