import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  Platform,
} from 'react-native';
import LeftArrow from '../../assets/svgs/LeftArrow';
import CustomText from '../atoms/CustomText';
import Dimensions from '../../utils/dimension/dimensions';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import {Colors} from '../../utils/colors/colors';
import CustomButton from '../atoms/CustomButton';

const AudioSpeedModal = (props: any) => {
  const {visible, onClose, onSelectSpeed, setModalVisible,isSelected} = props;
  const [selectedSpeed, setSelectedSpeed] = useState(1); // Default speed

  const handleSpeedSelection = (speed: any) => {
    setSelectedSpeed(speed);
    onSelectSpeed(speed);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Pressable
              style={[styles.button]}
              onPress={() => setModalVisible(false)}>
              <LeftArrow></LeftArrow>
            </Pressable>
            <CustomText style={styles.modalText}>
              {'Select Playback Speed'}
            </CustomText>
          </View>
          {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(speed => (
            <CustomButton
              key={speed.toString()}
              title={speed.toString()}
              style={[styles.btnStyle ]}
              textStyle={[styles.textbtnStyle, isSelected(speed) && {color: Colors.Red} ]}
              onPress={() => handleSpeedSelection(speed)}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default AudioSpeedModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: Dimensions.HP_2_6, //22,
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
    // width: '95%',
    // height: '80%',
  },
  modalText: {
    // flex: 1,
    marginBottom: Dimensions.HP_1_7_7, //15,
    textAlign: 'center',
    fontFamily: Fonts.Bold,
    fontSize: FontSize[22],
    alignSelf: 'center',
  },
  button: {
    padding: 10,
    alignSelf: 'center',
    // backgroundColor:'yellow'
  },
  textbtnStyle: {
    color: Colors.Purple_Text_1,
    textAlign: 'center',
  },
  btnStyle: {
    backgroundColor: Colors.White,
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: Colors.PurpleBorder,
    marginVertical: Dimensions.HP_1_1_8, //10,
    // padding: 10,
    // height: Platform.OS == 'ios' ? Dimensions.HP_5 : Dimensions.HP_7, //50,
    width: Dimensions.WP_30,
  },
});
