import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  ScrollViewComponent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors} from '../../utils/colors/colors';
import CustomScrollView from '../../components/atoms/CustomScrollView';
import Dimensions from '../../utils/dimension/dimensions';
import DeviceInfo from 'react-native-device-info';
import CustomText from '../../components/atoms/CustomText';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import {Strings} from './strings';
import NotificationLogo from '../../assets/svgs/NotificationLogo';
import {Images} from '../../utils/imageSource/imageSource';
import SearchBar from '../../components/atoms/SearchBar/SearchBar';
import ButtonWithIcon from '../../components/atoms/ButtonWithIcon';
import RightArrow from '../../assets/svgs/RightArrow';
import {InProgress} from '../../utils/constants/fontConstants';
import ReadItem from '../../components/molecules/ReadItem';
import CategoriesItem from '../../components/molecules/CategoriesItem';
import DirectSendLogo from '../../assets/svgs/DirectSend';
import ScanLogo from '../../assets/svgs/Scanning';
import AudioBookItem from '../../components/molecules/AudioBookItem';
import audioData from '../../utils/constants/audioData';
// @ts-ignore
import {convertAudioData} from '../../utils/constants/convertedAudioData';
import {getUserValues} from '../../utils/functions/commanFunctions';
import {Language, Userkey} from '../../utils/enum/enums';
import KathaVachakBanner from '../../assets/svgs/KathaVachakBanner';
import database from '@react-native-firebase/database';
import ShimmerPlaceHolderView from '../../components/molecules/ShimmerPlaceHolderView';
import ShimmerPlaceHolderListView from '../../components/molecules/ShimmerPlaceHolderListView';
import IconBtn from '../../components/atoms/IconBtn';

const HomeScreen = (props: any) => {
  const [preLoadedData, setPreLoadedData] = useState<
    {
      key: string;
      textString: string;
      title: string;
      language: string;
      url: string;
    }[]
  >([]);
  const [preLoadedLoading, setPreLoadedLoading] = useState(false);

  useEffect(() => {
    fetchPreloadedTextAudioFiles();
  }, []);

  //fetching preloaded data from firebase
  const fetchPreloadedTextAudioFiles = async () => {
    try {
      setPreLoadedLoading(true);
      // console.log('PRe loading:ture');

      const audioRef = database().ref(`preLoadedaudioFiles`);
      audioRef
        .once('value')
        .then(snapshot => {
          const preLoadedAudioFileData = snapshot.val();
          if (preLoadedAudioFileData) {
            const preLoadedAudioAndTextArray = Object.entries(
              preLoadedAudioFileData,
            ).map(([key, value]) => ({
              key,
              textString: preLoadedAudioFileData[key].textString,
              title: preLoadedAudioFileData[key].title,
              language: preLoadedAudioFileData[key].language,
              url: preLoadedAudioFileData[key].url,
            }));
            setPreLoadedData(preLoadedAudioAndTextArray);
          } else {
            console.log(`no data`);
          }
          setPreLoadedLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(
        //@ts-ignore
        `error in fetching the pre loaded audio files: ${error?.message}`,
      );
      setPreLoadedLoading(false);
    }
  };

  const RenderReadItem = useCallback(({item}: {item: any}) => {
    return (
      <ReadItem
        item={item}
        onPress={InProgress}
        aspectRatio={1.41}
        titleStyle={styles.titleStyleRead}
        title={'The Great Gatsby'}></ReadItem>
    );
  }, []);

  const RenderCategoriesItem = useCallback(({item}: {item: any}) => {
    return (
      <CategoriesItem
        item={item % 2 == 0 ? Strings.upload : Strings.scan}
        width={150}
        Icon={item % 2 == 0 ? <DirectSendLogo /> : <ScanLogo />}
        aspectRatio={2.2}
        onPress={InProgress}></CategoriesItem>
    );
  }, []);

  const RenderPreLoadedAudioItem = useCallback(({item}: {item: any}) => {
    return (
      <AudioBookItem
        item={item}
        widthContainer={Dimensions.WP_90} //380
        widthImage={Dimensions.WP_29} //120
        onPressPlay={() => {
          props.navigation.navigate('AudioBookReader', {
            title: item?.title,
            translatedTextString: item?.textString,
          });
        }}
        titleStyle={styles.titleStyle}
        subTitleStyle={styles.subTitleStyle}></AudioBookItem>
    );
  }, []);

  // Shimmer View
  const PreLoadeAudioAndTextLoadingView = () => {
    return (
      <ShimmerPlaceHolderListView
        flatlistStyle={{marginHorizontal: 20, padding: 0, alignSelf: 'center'}}
        totalNumber={8}
        renderItem={() => (
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <ShimmerPlaceHolderView
              itemStyle={{
                width: Dimensions.WP_29,
                aspectRatio: 1,
                borderRadius: 10,
              }}></ShimmerPlaceHolderView>
            <View style={{flexDirection: 'column', paddingLeft: 10}}>
              <ShimmerPlaceHolderView
                itemStyle={{width: Dimensions.WP_60, height: 15, marginTop: 10}}
                shimmerStyle={{borderRadius: 2}}></ShimmerPlaceHolderView>
              <ShimmerPlaceHolderView
                itemStyle={{width: Dimensions.WP_30, height: 15, marginTop: 10}}
                shimmerStyle={{borderRadius: 2}}></ShimmerPlaceHolderView>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                  // backgroundColor: 'orange',
                  alignItems: 'center',
                }}>
                <ShimmerPlaceHolderView
                  itemStyle={{
                    width: Dimensions.WP_25,
                    height: 35,
                    marginTop: 10,
                  }}
                  shimmerStyle={{borderRadius: 100}}></ShimmerPlaceHolderView>
                {/* <ShimmerPlaceHolderView
                  itemStyle={{
                    width: Dimensions.WP_10,
                    height: 35,
                    marginTop: 10,
                  }}
                  shimmerStyle={{borderRadius: 5}}></ShimmerPlaceHolderView>
                <ShimmerPlaceHolderView
                  itemStyle={{
                    width: Dimensions.WP_10,
                    height: 35,
                    marginTop: 10,
                  }}
                  shimmerStyle={{borderRadius: 5}}></ShimmerPlaceHolderView>
                <ShimmerPlaceHolderView
                  itemStyle={{
                    width: Dimensions.WP_10,
                    height: 35,
                    marginTop: 10,
                  }}
                  shimmerStyle={{borderRadius: 5}}></ShimmerPlaceHolderView> */}
              </View>
            </View>
          </View>
        )}></ShimmerPlaceHolderListView>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.White}}>
      <View style={{paddingHorizontal: Dimensions.WP_5_1, marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <CustomText style={styles.subTitleStyle}>
              {Strings.welcome}
            </CustomText>
            <CustomText
              style={{
                marginTop: Dimensions.HP_0_6, //5,
                fontFamily: Fonts.Bold,
                fontSize: FontSize[18],
                fontWeight: '700',
              }}>
              {getUserValues(Userkey.username)}
            </CustomText>
          </View>
          <View style={{alignSelf: 'center'}}>
            {/* <NotificationLogo></NotificationLogo> */}
          <IconBtn
          Icon={<NotificationLogo />}
          onPress={()=>{props?.navigation.navigate('Notification')}}
          />
          </View>
        </View>
        <SearchBar
          left={true}
          right={true}
          rightIcon={true}
          placeholder={Strings.searchPlaceholder}
          src={Images.searchIcon}
          rightSource={Images.microphone}
          textInputStyle={{
            fontWeight: '500',
            fontSize: FontSize[16],
          }}
          placeHolderTextColor={Colors.Text_Grey_2}
          mainStyle={styles.searchBar}
          iconStyle={styles.searchIconStyle}
        />
        {/* continue read flatlist */}
      </View>
      <View style={[styles.primary, {flexGrow: 1}]}>
        <CustomScrollView
          style={styles.primary}
          contentContainerStyle={{
            // flexGrow: 1,
            paddingBottom: Dimensions.WP_11_5_3, //45, //Dimensions.HP_2_4, //20
          }}>
          <View style={{marginHorizontal: 20, backgroundColor: Colors.White}}>
            <Image
              source={Images.kathaVachakBanner}
              style={{
                // alignSelf: 'center',
                width:'100%',
                // backgroundColor: 'red',
                borderRadius: 10,
              }}
              // resizeMode="contain"
              ></Image>
          </View>
          <View style={[styles.flatlistTitleStyle]}>
            <CustomText
              style={[
                styles.btnTitleStyle,
                {
                  marginTop: Dimensions.HP_2_9_6, //25,
                  marginHorizontal: 7,
                },
              ]}>
              {Strings.UploadDoc}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: Dimensions.WP_7,
              paddingLeft: Dimensions.WP_5_1, //20,
              paddingRight: Dimensions.WP_12_8,
              marginTop: Dimensions.HP_2_9_6, //25
            }}>
            <CategoriesItem
              item={Strings.upload}
              width={150}
              Icon={<DirectSendLogo />}
              aspectRatio={2.2}
              onPress={() => {
                props.navigation.navigate('UploadScreen');
              }}></CategoriesItem>
            <CategoriesItem
              item={Strings.scan}
              width={150}
              Icon={<ScanLogo />}
              aspectRatio={2.2}
              onPress={() => {
                props?.navigation.navigate('ScanScreen');
              }}></CategoriesItem>
          </View>
          <View style={[styles.flatlistTitleStyle]}>
            <ButtonWithIcon
              rightIcon={<RightArrow fill={Colors.Black}></RightArrow>}
              style={styles.btnIcon}
              title={Strings.audioBooks}
              textStyle={styles.btnTitleStyle}
              onPress={() => {
                props.navigation.navigate('AudioBookScreen');
              }}></ButtonWithIcon>
          </View>
          {preLoadedLoading ? (
            <PreLoadeAudioAndTextLoadingView />
          ) : (
            <View style={{flex: 1}}>
              {/* {Dimensions.HP_100 < Dimensions.HP_7_7 ? ( */}
              <CustomScrollView
                //  style={{marginVertical: 20}}
                contentContainerStyle={{
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  rowGap: Dimensions.HP_2,
                }}>
                {preLoadedData.map(item => (
                  <RenderPreLoadedAudioItem key={item.key} item={item} />
                ))}
              </CustomScrollView>
            </View>
          )}
        </CustomScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.White,
    paddingTop: DeviceInfo.hasNotch() ? 0 : 20,
    // paddingHorizontal: 20
  },
  subTitleStyle: {
    fontSize: FontSize[14],
    fontFamily: Fonts.Regular,
    fontWeight: '400',
  },
  searchBar: {
    backgroundColor: Colors.GreyLight,
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: Colors.GreyLight,
    marginTop: 10,
    marginBottom: 0,
  },
  searchIconStyle: {
    backgroundColor: Colors.White,
  },
  btnIcon: {
    flexDirection: 'row',
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  btnTitleStyle: {
    fontFamily: Fonts.Bold,
    fontWeight: '400',
    fontSize: FontSize[18],
    color: Colors.Black,
    padding: 0,
    height: 25,
  },
  flatlistTitleStyle: {
    marginHorizontal: 20,
  },
  titleStyleRead: {
    fontFamily: Fonts.Bold,
    fontSize: FontSize[15],
    color: Colors.Purple_Text_1,
  },
  //auido book
  audiobookStyle: {
    marginTop: 10,
  },
  titleStyle: {
    fontSize: FontSize[15],
  },
  subTitleAudioStyle: {
    fontSize: FontSize[13],
  },
});
