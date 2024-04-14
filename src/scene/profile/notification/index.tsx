import { StyleSheet,View} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/colors/colors';
import CustomScrollView from '../../../components/atoms/CustomScrollView';
import Dimensions from '../../../utils/dimension/dimensions';
import BackBtn from '../../../components/molecules/BackBtn';
import {FontSize, Fonts} from '../../../utils/fonts/fonts';
import {Strings} from '../strings';
import {String} from './Strings';
import NoNotificationImage from '../../../assets/svgs/NoNotificationImage'
import CustomText from '../../../components/atoms/CustomText';

const NotificationScreen = (props: any) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <BackBtn
        title={Strings.notification}
        textStyle={styles.customTextStyle}
        onPress={() => {
          props.navigation.pop();
        }}></BackBtn>
      <CustomScrollView
        stlye={styles.primary}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Dimensions.HP_2_4,
          paddingHorizontal: Dimensions.WP_3_8,//15,
          justifyContent:'center'
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
            <NoNotificationImage />
            <CustomText style={styles.NoNotificationStyle}>{String.noNotification}</CustomText>
            <CustomText style={styles.NoNotificationMessageStyle}>{String.noNotificationMessage}</CustomText>
        </View>
      </CustomScrollView>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.White,
    paddingTop: Dimensions.HP_2_3_6, //20,
  },
  customTextStyle: {
    backgroundColor: Colors.White,
  },
  NoNotificationStyle:{
    fontFamily: Fonts.Bold,
    fontSize: FontSize[22],
    color: Colors.Medium_Purple,
    fontWeight: '800'
  },
  NoNotificationMessageStyle:{
    textAlign:'center',
    alignItems:'center',
    width:Dimensions.WP_50,//195
    fontFamily: Fonts.Regular,
    fontSize: FontSize[16],
    marginTop:Dimensions.HP_1_1_8//10,
  }
});
