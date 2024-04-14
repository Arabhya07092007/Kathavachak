// @ts-nocheck
import {StyleSheet, View, Animated, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import Dimensions, {Percentages} from '../../utils/dimension/dimensions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Second_Forward from '../../assets/svgs/10Second';
import Back_Second from '../../assets/svgs/back_second';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {activeOpacity} from '../../utils/constants/constants';
import CustomText from '../atoms/CustomText';
import PauseButton from '../../assets/svgs/PauseButton';
import PlayButton2 from '../../assets/svgs/playButton_2';
import IconBtn from '../atoms/IconBtn';
import TranslateLogoBox from '../../assets/svgs/TranslateLogoBox';
import ChapterLogo from '../../assets/svgs/ChapterLogo';
import SpeedChangeLogo from '../../assets/svgs/SpeedChangeLogo';
import DownloadBoxLogo from '../../assets/svgs/DownloadBoxLogo';
import {showToastMessage} from '../../utils/functions/commanFunctions';
import {MessageType} from '../../utils/enum/enums';
import AudioSpeedModal from './AudioSpeedModal';
import {Colors} from '../../utils/colors/colors';

const AudioGeneration = (props: any) => {
  const {audioFile, audioTitle, navigation, TranslatePress, text} = props;

  const [animation] = useState(new Animated.Value(0));
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundInstance, setSoundInstance] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [pausedTime, setPausedTime] = useState(0);
  //for speed control
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState(1);

  useEffect(() => {
    if (soundInstance) {
      const intervalId = setInterval(() => {
        soundInstance.getCurrentTime((seconds: number, isPlaying: boolean) => {
          setCurrentTime(seconds);
          setIsPlaying(isPlaying);
        });
      }, 250);
      return () => clearInterval(intervalId);
    }
  }, [soundInstance]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (soundInstance) {
          soundInstance.stop();
        }
        return false;
      },
    );

    const unsubscribe = props.navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      if (soundInstance) {
        soundInstance.stop();
      }
      props?.navigation.dispatch(e.data.action);
    });
    return () => {
      backHandler.remove();
      unsubscribe();
    };
  }, [props?.navigation, soundInstance]);

  const updateWordIndex = (index: number) => {
    props.updateWordIndex(index);
  };

  const playSound = audioPath => {
    const sound = new Sound(audioPath, '', error => {
      if (error) {
        console.log('Failed to load the sound:', error);
        return;
      }
      console.log('Sound loaded successfully:', sound);
      setDuration(sound.getDuration());
      if (pausedTime > 0) {
        sound.setCurrentTime(pausedTime);
        setPausedTime(0);
      }
      setSoundInstance(sound);
      sound.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
        setIsPlaying(false);
        setCurrentTime(0); // Reset current time after playback completes
        setPausedTime(0); // Reset paused time after playback completes
      });
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      soundInstance.pause();
      setPausedTime(currentTime);
    } else {
      setIsPlaying(true);
      if (!soundInstance) {
        const fileId = uuid();
        const path = `${RNFS.DocumentDirectoryPath}/${fileId}.wav`;
        RNFS.writeFile(path, audioFile, 'base64')
          .then(() => {
            playSound(path);
          })
          .catch(error => console.error('Error writing audio file:', error));
      } else {
        soundInstance.play();
      }
    }
  };

  const skipForward = () => {
    if (soundInstance) {
      soundInstance.getCurrentTime(currentTime => {
        soundInstance.setCurrentTime(currentTime + 10);
      });
    }
  };

  const skipBackward = () => {
    if (soundInstance) {
      soundInstance.getCurrentTime(currentTime => {
        soundInstance.setCurrentTime(Math.max(0, currentTime - 10));
      });
    }
  };
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  const progressBarWidth = wp(Percentages.P_90) * (currentTime / duration);
  useEffect(() => {
    Animated.timing(animation, {
      toValue: isPlaying ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isPlaying]);

  //handling download audio
  const handleDownloadAudio = async () => {
    try {
      const fileId = uuid();
      const snaitizedTitle = audioTitle.replace(
        /[^\u0900-\u097F\s\u0B80-\u0BFF\u0C00-\u0C7F]+/gi,
        '',
      );
      const path = `${RNFS.DownloadDirectoryPath}/${snaitizedTitle}.wav`; // Save as .wav file in Downloads
      await RNFS.writeFile(path, audioFile, 'base64');
      showToastMessage(
        // @ts-ignore
        `Audio file is download successfully and can be found at ${path}`, //`Error will Login`,
        MessageType.Success,
      );
      console.log('File saved successfully:', path);
    } catch (error) {
      console.error('Error saving audio file:', error);
    }
  };
  const handleSpeedSelect = (speed: number) => {
    setSelectedSpeed(speed);
    if (soundInstance) {
      const newSpeed = 1 * speed;
      soundInstance.setSpeed(newSpeed);
      if (!isPlaying) {
        soundInstance.play();
      }
    }
  };

  useEffect(() => {

    if (!text) return; // Ensure text is available
    const words =  text.split(' ');
    const wordCount = words.length
    console.log(words.length);
    console.log(`duration: ${duration}`);
    const wordDuration = duration / wordCount;

    const currentWordIndex = Math.floor(currentTime / wordDuration);
    updateWordIndex(currentWordIndex);
  }, [currentTime, duration, text]);

  // auido generate main view
  return (
    <View style={{paddingHorizontal: Dimensions.WP_5_1}}>
      <View
        style={{
          height: Dimensions.HP_1,
          backgroundColor: '#ccc',
          marginTop: Dimensions.HP_1,
          borderRadius: 20,
        }}>
        <View
          style={{
            height: '100%',
            width: isNaN(progressBarWidth) ? 0 : progressBarWidth,
            backgroundColor: Colors.Pink_Shade,
            borderRadius: 20,
          }}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomText style={styles.timeStyle}>
          {formatTime(currentTime)}
        </CustomText>
        <CustomText style={styles.timeStyle}>{formatTime(duration)}</CustomText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={skipBackward} activeOpacity={activeOpacity}>
          <Back_Second></Back_Second>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handlePlayPause}
          activeOpacity={activeOpacity}>
          {isPlaying ? (
            <PauseButton />
          ) : (
            <View style={{top: -5, left: -5}}>
              <PlayButton2 />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward} activeOpacity={activeOpacity}>
          <Second_Forward></Second_Forward>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <AudioSpeedModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          setModalVisible={setModalVisible}
          onSelectSpeed={handleSpeedSelect}
          isSelected={(speed: any) => speed === selectedSpeed}
        />
        <IconBtn Icon={<TranslateLogoBox />} onPress={TranslatePress}></IconBtn>
        <IconBtn
          disable={true}
          Icon={<ChapterLogo color={Colors.Text_Grey_2} />}></IconBtn>
        <IconBtn
          Icon={<SpeedChangeLogo color={selectedSpeed != 1 && Colors.Red} />}
          onPress={() => setModalVisible(true)}></IconBtn>
        <IconBtn
          Icon={<DownloadBoxLogo />}
          onPress={handleDownloadAudio}></IconBtn>
      </View>
    </View>
  );
};

export default AudioGeneration;

const styles = StyleSheet.create({
  btnStyleGenerateAudioBook: {
    marginTop: Dimensions.HP_2_3_6, //20,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.PurpleBorder,
    backgroundColor: Colors.PurpleBorder,
  },
  btnTextGenerateAudioBook: {
    marginLeft: Dimensions.WP_2_5_6, //10,
    fontSize: FontSize[20],
    fontFamily: Fonts.Bold,
    color: Colors.White,
  },
  timeStyle: {
    fontFamily: Fonts.LatoRegular,
    fontSize: FontSize[14],
    fontWeight: '400',
    color: Colors.Text,
  },
});
