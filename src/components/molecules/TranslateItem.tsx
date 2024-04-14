import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../atoms/CustomText';
import ArrowDown from '../../assets/svgs/ArrowDown';
import {Colors} from '../../utils/colors/colors';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import LeftArrow from '../../assets/svgs/LeftArrow';
import CustomButton from '../atoms/CustomButton';
import Dimensions from '../../utils/dimension/dimensions';
import { activeOpacity } from '../../utils/constants/constants';

const TranslateItem = (props: any) => {
  const {
    title = 'Title',
    titleStyle,
    modalVisible,
    setModalVisible,
    onPress,
    selectedLang,
    setSelectedLang,
    languages,
    setCode,
    temp = false,
  } = props;
  // @ts-ignore
  const isSelected = language => {
    return language?.name === selectedLang;
  };

  // @ts-ignore
  const selectLanguage = language => {
    setSelectedLang(language?.name);
    setModalVisible(false); // Close modal upon selecting a language
    setCode(language?.code);
    // console.log('select lang: translateItem: ',language);
  };
  //   const [modalVisible, setModalVisible] = useState(false);

  //spliting the langauage array in columns
  
  const halfLength = Math.ceil(languages.length / 2);
  const firstHalf = languages.slice(0, halfLength);
  const secondHalf = languages.slice(halfLength);

  return (
    <View>
      <CustomText style={titleStyle}>{title}</CustomText>
      {temp == false ? (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: 'red',
                  }}>
                  <Pressable
                    style={[styles.button]}
                    onPress={() => setModalVisible(false)}>
                    <LeftArrow></LeftArrow>
                  </Pressable>
                  <CustomText style={styles.modalText}>
                    {'Select Language'}
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    {/* @ts-ignore */}
                    {firstHalf.map((language, index) => (
                      <CustomButton
                        key={language.code}
                        sub_title={true}
                        title={language.name}
                        subTitle={language.nativeName}
                        style={[
                          styles.btnStyle,
                          isSelected(language) && {borderColor: Colors.Red},
                        ]}
                        textStyle={styles.textbtnStyle}
                        onPress={() => {
                          selectLanguage(language);
                          // console.log('lang:',language);
                        }}
                      />
                    ))}
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    {/* @ts-ignore */}
                    {secondHalf.map((language, index) => (
                      <CustomButton
                        key={language.code}
                        sub_title={true}
                        title={language.name}
                        subTitle={language.nativeName}
                        style={[
                          styles.btnStyle,
                          isSelected(language) && {borderColor: Colors.Red},
                        ]}
                        textStyle={styles.textbtnStyle}
                        onPress={() => {
                          selectLanguage(language);
                          // console.log('lang:',language);
                        }}
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: Colors.PurpleBorder,
              borderRadius: 10,
              padding: 10,
              marginTop: 5,
              alignContent: 'center',
              alignItems: 'center',
            }}
            onPress={onPress}
            activeOpacity={activeOpacity}>
            <CustomText>
              {selectedLang == '' ? 'Select Language' : selectedLang}
            </CustomText>
            <ArrowDown></ArrowDown>
          </TouchableOpacity>
        </View>
      ) : (
        // <Modal
        //   animationType="slide"
        //   transparent={true}
        //   visible={modalVisible}
        //   onRequestClose={() => {
        //     Alert.alert('Modal has been closed.');
        //     setModalVisible(false);
        //   }}>
        //   <View style={styles.centeredView}>
        //     <View style={styles.modalView}>
        //       <View
        //         style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        //         <View style={{flexDirection: 'column'}}>
        //           {/* @ts-ignore */}
        //         </View>
        //         <View style={{flexDirection: 'column'}}>
        //           {/* @ts-ignore */}
        //           <CustomButton
        //             key="en"
        //             sub_title={true}
        //             title="English"
        //             subTitle="English"
        //             style={[
        //               styles.btnStyle,
        //               isSelected('English') && {borderColor: Colors.Red},
        //             ]}
        //             textStyle={styles.textbtnStyle}
        //             onPress={() => {
        //               selectLanguage('English');
        //               // console.log('lang:',language);
        //             }}
        //           />
        //         </View>
        //       </View>
        //     </View>
        //   </View>
        // </Modal>
        <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: Colors.PurpleBorder,
              borderRadius: 10,
              padding: 10,
              marginTop: 5,
              alignContent: 'center',
              alignItems: 'center',
            }}
            onPress={()=>{
              setSelectedLang('English')
              setCode('en')
              onPress()
            }}
            activeOpacity={activeOpacity}>
            <CustomText>
              {'English'}
            </CustomText>
            <ArrowDown></ArrowDown>
          </TouchableOpacity>
      )}
    </View>
  );
};

export default TranslateItem;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.HP_2_6, //22,
  },
  modalView: {
    marginVertical: Dimensions.HP_2_3_6, //20,
    marginHorizontal: Dimensions.WP_5_1, //20
    backgroundColor: Colors.White,
    borderRadius: 20,
    paddingHorizontal: Dimensions.WP_9, //35,
    paddingVertical: Dimensions.HP_4_1, //35
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '95%',
    height: '80%',
  },
  button: {
    padding: 10,
    alignSelf: 'center',
    // backgroundColor:'yellow'
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    flex: 1,
    marginBottom: Dimensions.HP_1_7_7, //15,
    textAlign: 'center',
    fontFamily: Fonts.Bold,
    fontSize: FontSize[22],
    alignSelf: 'center',
  },
  textbtnStyle: {
    color: Colors.Purple_Text_1,
    textAlign: 'center',
  },
  btnStyle: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.PurpleBorder,
    marginVertical: Dimensions.HP_1_1_8, //10,
    padding: 10,
    height: Platform.OS == 'ios' ? Dimensions.HP_5 : Dimensions.HP_7, //50,
    width: Dimensions.WP_30,
  },
});
