import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/colors/colors';
import CustomScrollView from '../../../components/atoms/CustomScrollView';
import Dimensions from '../../../utils/dimension/dimensions';
import BackBtn from '../../../components/molecules/BackBtn';
import {FontSize} from '../../../utils/fonts/fonts';
import {Strings} from '../strings';

const SettingScreen = (props: any) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <BackBtn
        title={Strings.settings}
        textStyle={styles.customTextStyle}
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
            width: '100%',
          }}>
          <Text style={{textAlign:'center',fontWeight:'800',fontSize: FontSize[24]}}>In-Progress</Text>
        </View>
      </CustomScrollView>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.White,
    paddingTop: Dimensions.HP_2_3_6, //20,
  },
  customTextStyle: {
    backgroundColor: Colors.White,
  },
});
