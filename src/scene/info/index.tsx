import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors/colors';
import CustomText from '../../components/atoms/CustomText';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import Dot from '../../assets/svgs/Dot';
import Dimensions from '../../utils/dimension/dimensions';
import InfoScreenLogo from '../../assets/svgs/InfoScreenLogo';
import CustomButton from '../../components/atoms/CustomButton';
import {CommonActions} from '@react-navigation/native';
import CustomScrollView from '../../components/atoms/CustomScrollView';

const Info = (props: any) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <View style={{flexGrow: 1, marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            justifyContent: 'flex-start',
          }}>
          <CustomText style={styles.appHeading}>{'kathaVachak'}</CustomText>
          <View
            style={{
              //   alignSelf: 'baseline',
              top: 20,
              marginLeft: Dimensions.WP_1_2, //5
            }}>
            <Dot></Dot>
          </View>
        </View>
        <View style={{marginTop: 15, alignSelf: 'flex-end'}}>
          <InfoScreenLogo></InfoScreenLogo>
        </View>
        <View style={{marginTop: 15, marginHorizontal: 10}}>
          <CustomText
            style={styles.textStyle}>{`Let's \nget started`}</CustomText>
          <CustomText
            style={
              styles.subTextStyle
            }>{`Listen the world within the word`}</CustomText>
        </View>
      </View>
        <View style={{alignSelf:'auto'}}>
        <CustomButton
          style={styles.btnStyle}
          title={'Log In'}
          textStyle={styles.btnTxtStyle}
          onPress={() => {
            props.navigation.navigate('Login');
          }}
        />
        <CustomButton
          style={[styles.btnStyle, {backgroundColor: Colors.Pink}]}
          title={'Sign Up'}
          textStyle={styles.btnTxtStyle}
          onPress={() => {
            props.navigation.navigate('Register');
          }}
        />
        {/* <CustomButton
          style={styles.btnStyle}
          title={'Continue'}
          textStyle={styles.btnTxtStyle}
          onPress={() => {
            props.navigation.replace('RootStack');
          }}
        /> */}
     
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  appHeading: {
    fontFamily: Fonts.Bold,
    fontSize: FontSize[30],
  },
  textStyle: {
    fontFamily: Fonts.SoraBold,
    fontSize: FontSize[48],
  },
  subTextStyle: {
    fontFamily: Fonts.SoraRegular,
    fontSize: FontSize[16],
  },
  btnStyle: {
    // marginTop: 20,
    marginBottom: Dimensions.HP_2_3_6, //20,
    marginHorizontal: Dimensions.WP_2_5_6, //10,
    backgroundColor: Colors.PurpleBorder,
  },
  btnTxtStyle: {
    fontFamily: Fonts.SoraSemiBold,
    fontSize: FontSize[16],
  },
});
