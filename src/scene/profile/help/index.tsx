import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/colors/colors';
import CustomScrollView from '../../../components/atoms/CustomScrollView';
import Dimensions from '../../../utils/dimension/dimensions';
import BackBtn from '../../../components/molecules/BackBtn';
import {FontSize, Fonts} from '../../../utils/fonts/fonts';
import {Strings} from '../strings';
import CustomText from '../../../components/atoms/CustomText';
import BulletPoint from '../../../components/molecules/BulletPoint';
import {String} from './string'

const HelpAndSupportScreen = (props: any) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <BackBtn
        title={Strings.help}
        textStyle={styles.headingTextStyle}
        onPress={() => {
          props.navigation.pop();
        }}></BackBtn>
      <CustomScrollView
        stlye={styles.primary}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: Dimensions.WP_3_8, //15,
          paddingBottom: Dimensions.HP_2_4,
        }}>
        <View
          style={{
            marginVertical: Dimensions.HP_1_1_8,
          }}>
          {/* <Text
            style={{
              textAlign: 'center',
              fontWeight: '800',
              fontSize: FontSize[24],
            }}>
            In-Progress
          </Text> */}
          <View style={{marginHorizontal: 5}}>
            <CustomText style={styles.titleStyle}>
              {String.title_point1}
            </CustomText>
            <View style={styles.subPointContainer}>
              <BulletPoint textStyle={styles.subStyle}>
                {String.point1_subPoint_1}
              </BulletPoint>
            </View>
          </View>
        </View>
      </CustomScrollView>
    </View>
  );
};

export default HelpAndSupportScreen;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.White,
    paddingTop: Dimensions.HP_2_3_6, //20,
  },
  headingTextStyle: {
    backgroundColor: Colors.White,
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
