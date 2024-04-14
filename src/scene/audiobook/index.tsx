import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../utils/colors/colors';
import BackBtn from '../../components/molecules/BackBtn';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import AudioBookItem from '../../components/molecules/AudioBookItem';
import Dimensions from '../../utils/dimension/dimensions';
import {AsyncKey, Storage} from '../../utils/storage/storage';
import database from '@react-native-firebase/database';
import ShimmerPlaceHolderListView from '../../components/molecules/ShimmerPlaceHolderListView';
import ShimmerPlaceHolderView from '../../components/molecules/ShimmerPlaceHolderView';

const AudioBookScreen = (props: any) => {
  const [audioAndTextData, setAudioAndTextData] = useState<
    {key: string; textString: string; title: string; language: string,url:string}[]
  >([]);
  const [audioFileFetchLoading, setAudioFileFetchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [preLoadedLoading, setPreLoadedLoading] = useState(false);
  const [preLoadedData, setPreLoadedData] = useState<
    {key: string; textString: string; title: string; language: string,url:string}[]
  >([]);
  
  useEffect(() => {
    fetchDataFromDatabase();
    fetchPreloadedTextAudioFiles();
  }, []);

  const fetchDataFromDatabase = async () => {
    try {
      setAudioFileFetchLoading(true);
      const userId = Storage.getString(AsyncKey.Uid);
      const audioRef = database().ref(`Users/${userId}/audioFiles`);
      audioRef
        .once('value')
        .then(snapshot => {
          const audioFileData = snapshot.val();
          if (audioFileData) {
            const audioAndTextArray = Object.entries(audioFileData).map(
              ([key, value]) => ({
                key,
                textString: audioFileData[key].textString,
                title: audioFileData[key].title,
                language: audioFileData[key].language,
                url: audioFileData[key].url
              }),
            );
            setAudioAndTextData(audioAndTextArray);
          } else {
            console.log(`no data`);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      //@ts-ignore
      setAudioFileFetchLoading(false);
    }
  };

  const fetchPreloadedTextAudioFiles = async () => {
    try {
      setPreLoadedLoading(true);
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
              url: preLoadedAudioFileData[key].url
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

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const RenderAudioItem = ({item}: {item: any}) => (
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
  const RenderPreLoadedAudioTextItem = ({item}: {item: any}) => (
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
  // Shimmer View
  const PreLoadeAudioAndTextLoadingView = () => {
    return (
      <ShimmerPlaceHolderListView
        flatlistStyle={{marginTop: 0, padding: 0, alignSelf: 'center'}}
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
                  alignItems: 'center',
                }}>
                <ShimmerPlaceHolderView
                  itemStyle={{
                    width: Dimensions.WP_25,
                    height: 35,
                    marginTop: 10,
                  }}
                  shimmerStyle={{borderRadius: 100}}></ShimmerPlaceHolderView>
              </View>
            </View>
          </View>
        )}></ShimmerPlaceHolderListView>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <BackBtn
        title={'Your Audiobooks'}
        textStyle={styles.textStyle}
        onPress={() => {
          props.navigation.goBack();
        }}></BackBtn>
      <View
        style={{
          flexGrow: 1,
          marginHorizontal: Dimensions.WP_3_8//15,     
        }}>
        {preLoadedLoading && audioFileFetchLoading ? (
          <PreLoadeAudioAndTextLoadingView />
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={preLoadedData.concat(audioAndTextData)}
              // @ts-ignore
              keyExtractor={item => item.key}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style={{marginTop: Dimensions.HP_3, flexGrow: 1}}
              contentContainerStyle={{
                rowGap: Dimensions.WP_7,
                paddingBottom: Dimensions.HP_2_3_6//20,
              }}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.7}
              renderItem={RenderPreLoadedAudioTextItem}
            ></FlatList>
          </View>
        )}
      </View>
    </View>
  );
};

export default AudioBookScreen;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.Bold,
    fontSize: FontSize[18],
  },
  audiobookStyle: {
    marginTop: Dimensions.WP_7,
  },
  titleStyle: {
    fontSize: FontSize[15],
  },
  subTitleStyle: {
    fontSize: FontSize[13],
  },
});
