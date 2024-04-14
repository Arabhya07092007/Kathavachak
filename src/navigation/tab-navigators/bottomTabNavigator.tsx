import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Colors } from '../../utils/colors/colors';
import DeviceInfo from 'react-native-device-info';
import Dimensions from '../../utils/dimension/dimensions';
import HomeTabStack from '../stack-navigators/homeTabStack';
import ProfileSCreen from '../../scene/profile';
import HomeLogo from '../../assets/svgs/HomeLogo';
import ProfileLogo from '../../assets/svgs/ProfileLogo';
import CameraScreen from '../../scene/camera';
import ContainerLogo from '../../assets/svgs/Container';


const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.TabActive,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: Colors.TabInActive,
        tabBarStyle: {
            backgroundColor:'#FFF',
          height: DeviceInfo.hasNotch() //isIphoneX()
            ? Dimensions.HP_10_6_6
            : //90
            Dimensions.HP_7_7,
          // 60,
        },
      }}>
         <Tab.Screen
        name="HomeTabStack"
        component={HomeTabStack}
        options={{
          tabBarIcon: ({ color, size }) => <HomeLogo color={color} />,
        }}
      ></Tab.Screen>
        <Tab.Screen
        name="CameraStack"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ color, size }) => <ContainerLogo color={color} />,
        }}
      ></Tab.Screen>
        <Tab.Screen
        name="ProfileStack"
        component={ProfileSCreen}
        options={{
          tabBarIcon: ({ color, size }) => <ProfileLogo color={color} />,
        }}
      ></Tab.Screen>
      </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})