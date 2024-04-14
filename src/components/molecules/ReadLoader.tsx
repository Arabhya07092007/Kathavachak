import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../utils/imageSource/imageSource';
import LottieView from 'lottie-react-native';

const ReadLoader = () => {
  console.log(`Lottie animation:${Images.readLoaderLottie}`);
  return (
    <View
      style={[
        {
          backgroundColor: 'rgba(0,0,0,0.85)',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <LottieView
        source={Images.readLoaderLottie}
        style={{
          width: '100%',
          height: '100%',
          alignSelf: 'center',
        }}
        autoPlay
        loop
      />
    </View>
  );
};

export default ReadLoader;

const styles = StyleSheet.create({});
