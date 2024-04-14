import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';

const CustomScrollView = (props: any) => {
  const {style, contentContainerStyle, children} = props;

  return (
    <ScrollView
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={[{flex: 1}, style]}
      contentContainerStyle={[
        {backgroundColor: Colors.White},
        contentContainerStyle,
      ]}>
      {children}
    </ScrollView>
  );
};

export default CustomScrollView;

const styles = StyleSheet.create({});
