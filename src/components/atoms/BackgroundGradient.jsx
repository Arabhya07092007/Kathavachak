import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

const BackgroundGradient = props => {
  const {
    FROM_COLOR = 'rgb(255, 255, 255)',
    TO_COLOR = 'rgb(0,102,84)',
    borderRadius = 20,
  } = props;
  return (
    <View style={{flex: 1}}>
      <Svg height="100%" width="100%" style={[StyleSheet.absoluteFillObject]}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0" stopColor={FROM_COLOR} />
            <Stop offset="1" stopColor={TO_COLOR} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" rx={borderRadius} />
      </Svg>
      {props?.children}
    </View>
  );
};

export default BackgroundGradient;

const styles = StyleSheet.create({});
