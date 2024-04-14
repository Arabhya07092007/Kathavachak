import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import CustomScrollView from '../../../components/atoms/CustomScrollView';
import Dimensions from '../../../utils/dimension/dimensions';
import BackBtn from '../../../components/molecules/BackBtn';
import {FontSize, Fonts} from '../../../utils/fonts/fonts';
import {Strings} from '../strings';
import CustomTextInput from '../../../components/atoms/CustomTextInput';
import CustomButton from '../../../components/atoms/CustomButton';
import {
  getUserValues,
  showToastMessage,
} from '../../../utils/functions/commanFunctions';
import {MessageType, Userkey} from '../../../utils/enum/enums';
import {AsyncKey, Storage, storeEmailLogin} from '../../../utils/storage/storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import {
  ErrorMessages,
  alphabetValidation,
} from '../../../utils/constants/constants';

const EditProfile = (props: any) => {
  const [providerId, setProviderId] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchProviderIdAndUserId();
  }, []);

  const [apiObjectEmail, setApiObjectEmail] = useState({
    fullName: '',
  });

  const [apiObject, setApiObject] = useState({
    firstName: '',
    lastName: '',
  });

  const [objectErrorEmail, setObjectErrorEmail] = useState({
    fullName: false,
  });
  const [objectError, setObjectError] = useState({
    firstName: false,
    lastName: false,
  });

  const fetchProviderIdAndUserId = async () => {
    try {
      const data = Storage.getString(AsyncKey.UserData);
      const userId = Storage.getString(AsyncKey.Uid);
      // @ts-ignore
      const userData = JSON.parse(data);
      setProviderId(userData?.providerId);
      // @ts-ignore
      setUserId(userId);
    } catch (error) {
      console.error('Error fetching providerId:', error);
    }
  };
  const updateNameDatabase = async (userId: string, fullName: string) => {
    try {
      const user = auth().currentUser;
    if (user) {
      // Update display name
      await user.updateProfile({
        displayName: fullName,
      });
      await database()
        .ref(`/Users/${userId}`)
        .update({fullName})
        .then(() => {
          console.log('fullName updated in Firebase');
        });
        const updatedUser = { ...user, displayName: fullName };
        console.log(`updatedUser: ${JSON.stringify(updatedUser)}`);
        // Store updated user locally (if needed)
        storeEmailLogin(updatedUser);
      }
    } catch (error) {
      console.error('Error updating fullName in Firebase:', error);
      throw error; // Rethrow the error for handling in the component
    }
  };
  const handleNameChange = async () => {
    try {
      setLoading(true);
      await updateNameDatabase(userId, apiObjectEmail?.fullName);
      setLoading(false);
      setApiObjectEmail(prevState => ({
        ...prevState,
        fullName: apiObjectEmail?.fullName,
      }));
      showToastMessage(
        `Name Updated Succesfully`,
        // `Account is successfully created`,
        MessageType.Success,
      );
    } catch (error) {
      setLoading(false);
      //@ts-ignore
      showToastMessage(
        `Error while updating name \nPlease try again later`,
        MessageType.Error,
      );
    }
  };

  function isValid() {
    const fristNameResult = alphabetValidation.test(apiObject?.firstName);
    const lastNameResult = alphabetValidation.test(apiObject?.lastName);
    const fullNameResult = alphabetValidation.test(apiObjectEmail?.fullName);
    if(providerId === 'firebase')
      {
        if (
          apiObjectEmail.fullName.length == 0 ||
          (apiObjectEmail.fullName.length > 0 && !fullNameResult)
        ) {
          setObjectErrorEmail(prevState => ({
            ...prevState,
            fullName: true,
          }));
          return false;
        }
      }
      else{
        if (
          apiObject.firstName.length == 0 ||
          (apiObject.firstName.length > 0 && !fristNameResult)
        ) {
          setObjectError(prevState => ({
            ...prevState,
            firstName: true,
          }));
    
          return false;
        } else if (
          apiObject.lastName.length == 0 ||
          (apiObject.lastName.length > 0 && !lastNameResult)
        ) {
          setObjectError(prevState => ({
            ...prevState,
            lastName: true,
          }));
          return false;
        }   
      }
    return true;
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <BackBtn
        title={Strings.editProfile}
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
        {providerId === 'firebase' ? (
          <View
            style={{
              marginVertical: Dimensions.HP_1_1_8,
            }}>
            <CustomTextInput
              Label={'Full Name'}
              mainContainer={[
                styles.textInputStyle,
                {marginBottom: Dimensions.HP_1_7_7},
              ]}
              hasError={objectErrorEmail.fullName}
              errorMessage={ErrorMessages.nameValidation}
              titleStyle={styles.labelStyle}
              placeHolder={getUserValues(Userkey.firstName)}
              placeHolderTextColor={Colors.TabInActive}
              astreixRequired={true}
              onChangeText={(text: string) => {
                setApiObjectEmail(prevState => ({
                  ...prevState,
                  fullName: text,
                }));
                if (objectErrorEmail.fullName) {
                  setObjectErrorEmail(prevState => ({
                    ...prevState,
                    fullName: false,
                  }));
                }
              }}></CustomTextInput>
          </View>
        ) : (
          <View
            style={{
              marginVertical: Dimensions.HP_1_1_8,
            }}>
            <CustomTextInput
              Label={'First Name'}
              mainContainer={[
                styles.textInputStyle,
                {marginBottom: Dimensions.HP_1_7_7},
              ]}
              hasError={objectError.firstName}
              errorMessage={ErrorMessages.nameValidation}
              titleStyle={styles.labelStyle}
              placeHolder={getUserValues(Userkey.firstName)}
              placeHolderTextColor={Colors.TabInActive}
              astreixRequired={true}>
              onChangeText=
              {(text: string) => {
                setApiObject(prevState => ({
                  ...prevState,
                  firstName: text,
                }));
                if (objectError.firstName) {
                  setObjectError(prevState => ({
                    ...prevState,
                    fristName: false,
                  }));
                }
              }}
            </CustomTextInput>
            <CustomTextInput
              Label={'Last Name'}
              mainContainer={[
                styles.textInputStyle,
                {marginBottom: Dimensions.HP_1_7_7},
              ]}
              hasError={objectError.lastName}
              errorMessage={ErrorMessages.nameValidation}
              titleStyle={styles.labelStyle}
              placeHolder={getUserValues(Userkey.lastName)}
              placeHolderTextColor={Colors.TabInActive}
              astreixRequired={true}
              onChangeText={(text: string) => {
                setApiObject(prevState => ({
                  ...prevState,
                  lastName: text,
                }));
                if (objectError.lastName) {
                  setObjectError(prevState => ({
                    ...prevState,
                    lastName: false,
                  }));
                }
              }}></CustomTextInput>
          </View>
        )}
      </CustomScrollView>
      <CustomButton
        loading={loading}
        style={styles.btnStyle}
        title={'Update Profile'}
        textStyle={styles.btnTxtStyle}
        onPress={() => {
          if (isValid()) {
            handleNameChange();
          }
        }}
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.White,
    paddingTop: Dimensions.HP_2_3_6, //20,
  },
  customTextStyle: {
    backgroundColor: Colors.White,
  },
  textInputStyle: {
    // borderRadius: 0,
    marginTop: Dimensions.HP_2_4,
  },
  labelStyle: {
    fontFamily: Fonts.Regular,
    fontWeight: '500',
    fontSize: FontSize[13],
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
