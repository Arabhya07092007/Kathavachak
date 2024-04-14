import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Dimensions from '../../utils/dimension/dimensions'
import CustomScrollView from '../../components/atoms/CustomScrollView'
import { Colors } from '../../utils/colors/colors'
import UserInfo from '../../components/molecules/UserInfo'
import { Strings } from './strings'
import { FontSize, Fonts } from '../../utils/fonts/fonts'
import ButtonWithIcon from '../../components/atoms/ButtonWithIcon'
import UserEdit from '../../assets/svgs/UserEdit';
import ArrowRight from '../../assets/svgs/ArrowRight';
import Notification from '../../assets/svgs/Notification';
import Setting from '../../assets/svgs/Settings';
import Help from '../../assets/svgs/Help';
import TermsAndCondition from '../../assets/svgs/TermsAndConditions';
import LogOut from '../../assets/svgs/LogOut';
import { InProgress } from '../../utils/constants/fontConstants'
import BackBtn from '../../components/molecules/BackBtn'
import { Userkey } from '../../utils/enum/enums'
import { getUserValues, logout } from '../../utils/functions/commanFunctions'

const ProfileSCreen = (props:any) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
       <BackBtn
        title={Strings.profile}
        textStyle={styles.textStyle}
       backBtnShow={false}
        ></BackBtn>
      <CustomScrollView
        stlye={styles.primary}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: Dimensions.HP_2_4,
        }}>
        <UserInfo
          username={getUserValues(Userkey.username)}
          mobileNumber={getUserValues(Userkey.email)}
          userTextStyle={{
            fontSize: FontSize[17],
            fontFamily: Fonts.Bold,
            fontWeight: '700',
            color: Colors.Text_Grey_4,
          }}
          mobileNumberTextStyle={{
            fontSize: FontSize[13],
            fontFamily: Fonts.Bold,
            fontWeight: '400',
            color: Colors.Text_Grey_5,
            paddingTop: Dimensions.HP_0_6 //5,
          }}></UserInfo>
        <View style={{
          marginTop: Dimensions.HP_1_7_7,//15,
           paddingHorizontal: Dimensions.WP_3_8//15
           }}>
          {/* edit profile */}
          {/* <ButtonWithIcon
            leftIcon={<UserEdit></UserEdit>}
            rightIcon={<ArrowRight></ArrowRight>}
            style={styles.btnIcon}
            title={Strings.editProfile}
            textStyle={styles.btnTitleStyle}
            onPress={()=>{
              props.navigation.navigate('EditProfile')
            }}></ButtonWithIcon> */}
            {/* notification */}
          <ButtonWithIcon
            leftIcon={<Notification></Notification>}
            rightIcon={<ArrowRight></ArrowRight>}
            style={styles.btnIcon}
            title={Strings.notification}
            textStyle={styles.btnTitleStyle}
            onPress={()=>{
              props.navigation.navigate('Notification')
            }}></ButtonWithIcon>
            {/* settings */}
          {/* <ButtonWithIcon
            leftIcon={<Setting></Setting>}
            rightIcon={<ArrowRight></ArrowRight>}
            style={styles.btnIcon}
            title={Strings.settings}
            textStyle={styles.btnTitleStyle}
            onPress={()=>{
              props.navigation.navigate('Settings')
            }}></ButtonWithIcon> */}
            {/* Help */}
          <ButtonWithIcon
            leftIcon={<Help></Help>}
            rightIcon={<ArrowRight></ArrowRight>}
            style={styles.btnIcon}
            title={Strings.help}
            textStyle={styles.btnTitleStyle}
            onPress={()=>{
              props.navigation.navigate('HelpAndSupport')
            }}></ButtonWithIcon>
            {/* Terms */}
          <ButtonWithIcon
            leftIcon={<TermsAndCondition></TermsAndCondition>}
            rightIcon={<ArrowRight></ArrowRight>}
            style={styles.btnIcon}
            title={Strings.terms}
            textStyle={styles.btnTitleStyle}
            onPress={()=>{
              props.navigation.navigate('TermsAndCondition')
            }}></ButtonWithIcon>
            {/* Terms of Use */}
            <ButtonWithIcon
            leftIcon={<TermsAndCondition></TermsAndCondition>}
            rightIcon={<ArrowRight></ArrowRight>}
            style={styles.btnIcon}
            title={Strings.termsOfUse}
            textStyle={styles.btnTitleStyle}
            onPress={()=>{
              props.navigation.navigate('TermsOfUse')
            }}></ButtonWithIcon>
            {/* Privacy & Policy */}
            <ButtonWithIcon
            leftIcon={<TermsAndCondition></TermsAndCondition>}
            rightIcon={<ArrowRight></ArrowRight>}
            style={styles.btnIcon}
            title={Strings.privacy}
            textStyle={styles.btnTitleStyle}
            onPress={()=>{
              props.navigation.navigate('PrivacyPolicy')
            }}></ButtonWithIcon>
          <ButtonWithIcon
            leftIcon={<LogOut></LogOut>}
            style={styles.btnIcon}
            title={Strings.logOut}
            textStyle={styles.btnTitleStyle}
            onPress={logout}></ButtonWithIcon>
        </View>
      </CustomScrollView>
    </View>
  )
}

export default ProfileSCreen

const styles = StyleSheet.create({
  textStyle:{backgroundColor: Colors.White},
  primary: {
    backgroundColor: Colors.White,
    paddingTop: Dimensions.HP_2_3_6 //20,
  },
  Title: {
    fontSize: FontSize[34],
    fontFamily: Fonts.Bold,
    fontWeight: '500',
    paddingHorizontal: Dimensions.WP_5_1,
    color: Colors.White,
    textAlign: 'center',
    marginVertical: Dimensions.HP_1_1_8 //10,
  },
  btnIcon: {
    flexDirection: 'row',
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'space-between',
  },
  btnTitleStyle: {
    flex: 2,
    fontWeight: '400',
    fontSize: FontSize[17],
    color: Colors.Text_Grey_5,
    textAlign: 'left',
    paddingLeft: Dimensions.WP_2_5,
  },
})