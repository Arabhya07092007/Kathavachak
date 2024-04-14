import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../scene/home';


const HomeTabStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>

      </Stack.Navigator>
  );
};

export default HomeTabStack;

const styles = StyleSheet.create({});
