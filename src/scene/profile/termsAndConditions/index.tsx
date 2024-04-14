import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/colors/colors';
import CustomScrollView from '../../../components/atoms/CustomScrollView';
import Dimensions from '../../../utils/dimension/dimensions';
import BackBtn from '../../../components/molecules/BackBtn';
import {FontSize, Fonts} from '../../../utils/fonts/fonts';
import {Strings} from '../strings';
import CustomText from '../../../components/atoms/CustomText';
import {String} from './string';
import BulletPoint from '../../../components/molecules/BulletPoint';

const TermsAndConditionsScreen = (props: any) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <BackBtn
        title={Strings.terms}
        textStyle={styles.headingTextStyle}
        onPress={() => {
          props.navigation.pop();
        }}></BackBtn>
      <CustomScrollView
        stlye={styles.primary}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Dimensions.HP_2_4,
          paddingHorizontal: Dimensions.WP_3_8, //15,
        }}>
        <View
          style={{
            marginVertical: 15, //Dimensions.HP_1_1_8,
          }}>
          <CustomText style={styles.customTextStyle}>
            {String.termOfUse}
          </CustomText>
          <View style={{marginHorizontal: 5}}>
            <CustomText style={styles.titleStyle}>
              {String.title_point1}
            </CustomText>
            <View style={styles.subPointContainer}>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point1_subPoint_1}
              </BulletPoint>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point1_subPoint_2}
              </BulletPoint>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point1_subPoint_3}
              </BulletPoint>
            </View>
            <CustomText style={styles.titleStyle}>
              {String.title_point2}
            </CustomText>
            <View style={styles.subPointContainer}>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point2_subPoint_1}
              </BulletPoint>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point2_subPoint_2}
              </BulletPoint>
            </View>
            <CustomText style={styles.titleStyle}>
              {String.title_point3}
            </CustomText>
            <View style={styles.subPointContainer}>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point3_subPoint_1}
              </BulletPoint>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point3_subPoint_2}
              </BulletPoint>
            </View>
            <CustomText style={styles.titleStyle}>
              {String.title_point4}
            </CustomText>
            <View style={styles.subPointContainer}>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point4_subPoint_1}
              </BulletPoint>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point4_subPoint_2}
              </BulletPoint>
            </View>
            <CustomText style={styles.titleStyle}>
              {String.title_point5}
            </CustomText>
            <View style={styles.subPointContainer}>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point5_subPoint_1}
              </BulletPoint>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point5_subPoint_2}
              </BulletPoint>
            </View>
            <CustomText style={styles.titleStyle}>
              {String.title_point6}
            </CustomText>
            <View style={styles.subPointContainer}>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point6_subPoint_1}
              </BulletPoint>
            </View>
            <CustomText style={styles.titleStyle}>
              {String.title_point7}
            </CustomText>
            <View style={styles.subPointContainer}>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point7_subPoint_1}
              </BulletPoint>
            </View>
            <CustomText style={styles.titleStyle}>
              {String.title_point8}
            </CustomText>
            <View style={styles.subPointContainer}>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point8_subPoint_1}
              </BulletPoint>
            </View>
            <CustomText style={styles.titleStyle}>
              {String.title_point9}
            </CustomText>
            <View style={styles.subPointContainer}>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point9_subPoint_1}
              </BulletPoint>
            </View>
          </View>
          <CustomText style={styles.customTextStyle}>
            {String.endingLine}
          </CustomText>
        </View>
      </CustomScrollView>
    </View>
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.White,
    paddingTop: Dimensions.HP_2_3_6, //20,
  },
  headingTextStyle: {
    backgroundColor: Colors.White,
  },
  customTextStyle: {
    backgroundColor: Colors.White,
    fontFamily: Fonts.Regular,
    textAlign: 'justify',
    fontSize: FontSize[14],
  },
  titleStyle: {
    marginVertical: 12,
    marginLeft: 5,
    fontFamily: Fonts.Bold,
    fontSize: FontSize[20],
    color: Colors.Purple_Text_1,
  },
  subStyle: {
    fontFamily: Fonts.LatoRegular,
    fontSize: FontSize[15],
    textAlign: 'justify',
    color: Colors.Text_DarkShade_Grey,
    // backgroundColor: 'yellow',
    paddingLeft: 5,
    paddingBottom: 5,
  },
  subPointContainer: {
    flex: 1,
    padding: 6,
  },
});
