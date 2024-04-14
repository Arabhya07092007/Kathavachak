import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Colors} from '../../../utils/colors/colors';
import BackBtn from '../../../components/molecules/BackBtn';
import Dimensions from '../../../utils/dimension/dimensions';
import CustomScrollView from '../../../components/atoms/CustomScrollView';
import CustomText from '../../../components/atoms/CustomText';
import {FontSize, Fonts} from '../../../utils/fonts/fonts';
import AudioGeneration from '../../../components/molecules/AudioGeneration';
import {textTranslationNMT_TTS} from '../../../service/bhashiniApi/service';
import {CurrentErrorContext} from '../../../context/error_message_context';
import {nmt_service_id, tts_service_id} from '../../../utils/enum/enums';
import ButtonWithIcon from '../../../components/atoms/ButtonWithIcon';
import SoundWave from '../../../assets/svgs/SoundWave';
import TranslateItem from '../../../components/molecules/TranslateItem';
import ChatBot_Message from '../../../assets/svgs/ChatBot';
import ReadLoader from '../../../components/molecules/ReadLoader';
//@ts-ignore
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const AudioBookReader = (props: any) => {
  const ErrorContext = useContext(CurrentErrorContext);

  const [tranlationLoading, setTranlationLoading] = useState(false);
  const [selectedLangCodeFrom, setSelectedLangCodeFrom] = useState('');
  const [selectedLangCodeTo, setSelectedLangCodeTo] = useState('');
  const [modalVisibleFrom, setModalVisibleFrom] = useState(false);
  const [modalVisibleTo, setModalVisibleTo] = useState(false);
  const [selectedLangFrom, setSelectedLangFrom] = useState('');
  const [selectedLangTo, setSelectedLangTo] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translatedAudio, setTranslatedAudio] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const languages = [
    {name: 'Hindi', nativeName: 'हिंदी', code: 'hi'},
    {name: 'Marathi', nativeName: 'मराठी', code: 'mr'},
    {name: 'Kannada', nativeName: 'ಕನ್ನಡ', code: 'kn'},
    {name: 'Assamese', nativeName: 'অসমীয়া', code: 'as'},
    {name: 'Tamil', nativeName: 'தமிழ்', code: 'ta'},
    {name: 'Gujarati', nativeName: 'ગુજરાતી', code: 'gu'},
    {name: 'English', nativeName: 'English', code: 'en'},
    {name: 'Bangla', nativeName: 'বাংলা', code: 'bn'},
    {name: 'Odia', nativeName: 'ଓଡିଆ', code: 'or'},
    {name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', code: 'pa'},
    {name: 'Malayalam', nativeName: 'മലയാളം', code: 'ml'},
    // Add other languages with their ISO codes here
  ];
  const ttsServiceIds: {[key: string]: string} = {
    as: 'ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4',
    bn: 'ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4',
    en: 'ai4bharat/indic-tts-coqui-misc-gpu--t4',
    gu: 'ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4',
    hi: 'ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4',
    kn: 'ai4bharat/indic-tts-coqui-dravidian-gpu--t4',
    ml: 'ai4bharat/indic-tts-coqui-dravidian-gpu--t4',
    mr: 'ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4',
    or: 'ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4',
    pa: 'ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4',
    ta: 'ai4bharat/indic-tts-coqui-dravidian-gpu--t4',
  };

  const preConvertedTextString = props?.route?.params?.translatedTextString;

  const [apiObject, setApiObject] = useState({
    pipelineTasks: [
      {
        taskType: 'translation',
        config: {
          language: {
            sourceLanguage: '',
            targetLanguage: '',
          },
          serviceId: nmt_service_id,
        },
      },
      {
        taskType: 'tts',
        config: {
          language: {
            sourceLanguage: selectedLangCodeTo,
          },
          serviceId: '',
          gender: 'female',
          samplingRate: 8000,
        },
      },
    ],
    inputData: {
      input: [
        {
          source: '',
        },
      ],
    },
  });

  useEffect(() => {
    // @ts-ignore
    setApiObject(prevState => ({
      ...prevState,
      pipelineTasks: prevState.pipelineTasks.map(task => {
        if (task.taskType === 'translation') {
          return {
            ...task,
            config: {
              ...task.config,
              language: {
                ...task.config.language,
                sourceLanguage: selectedLangCodeFrom,
                targetLanguage: selectedLangCodeTo,
              },
            },
          };
        } else if (task.taskType === 'tts') {
          const serviceId = ttsServiceIds[selectedLangCodeTo];
          return {
            ...task,
            config: {
              ...task.config,
              language: {
                ...task.config.language,
                sourceLanguage: selectedLangCodeTo,
              },
            },
            serviceId: serviceId || task.config.serviceId,
          };
        }
        return task;
      }),
      inputData: {
        input: [
          {
            source: preConvertedTextString,
          },
        ],
      },
    }));
  }, [preConvertedTextString, selectedLangCodeFrom, selectedLangCodeTo]);

  // Function to update the current word index
  const updateCurrentWordIndex = (index: number) => {
    setCurrentWordIndex(index);
  };

  const highlightWordBasedOnIndex = (text: string, currentIndex: number) => {
    // Split text into individual words
    const words = text.split(' '); // Split by whitespace to get individual words

    // Render each word, highlighting the current word if its index matches currentIndex
    return words.map((word, index) => {
      if (index === currentIndex) {
        // Highlight or mark the current word
        return (
          <CustomText
            key={index}
            style={[
              styles.contentStyle,
              {fontWeight: 'bold', backgroundColor: Colors.LightPurple},
            ]}>
            {word}{' '}
          </CustomText>
        );
      } else {
        return (
          <CustomText key={index} style={styles.contentStyle}>
            {word}{' '}
          </CustomText>
        );
      }
    });
  };

  //api call for nmt_tts_translation
  const nmt_tranlation = async () => {
    try {
      const data = await textTranslationNMT_TTS(
        setTranlationLoading,
        apiObject,
        ErrorContext,
      );
      return data;
    } catch (error) {
      console.error('nmt translation error:', error);
    }
  };
  //download
  const requestStoragPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to download files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
        } else {
          console.log('Storage Permission Denied.');
        }
      }
    } catch (error) {
      console.warn('requestStoragePersmission:', error);
    }
  };
  const handleStringToPDFCreation = async (text: String, title: String) => {
    const htmlContent = `<!DOCTYPE html>
    <html>
    <head>
      <style>
        .cont {
          flex: 1;
          background-color: #FFF;
        }
        .hr{
          align-items: center;
          text-align: center;
          border: none;
          height: 2px;
          background-color: #fff;
          border-top: 1px dotted #000;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div class="cont">
        <div class="headingCont">
          <p class="mainTitleStyle">${title}</p>
        </div>
        <hr class="hr">
        <div class="ticketContainerStyle">
          <span class="detialText">${text}</span>
        </div>
        </div>      
    </body>
    </html>`;

    let options = {
      html: htmlContent,
      fileName: title,
      directory: 'KathaVachak',
    };
    try {
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      Alert.alert(file.filePath);
    } catch (error) {
      console.log('handlePDFcreation: ', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <BackBtn
        title={props?.route?.params?.title}
        textStyle={styles.textStyle}
        chatBot={true}
        shareIcon={<ChatBot_Message></ChatBot_Message>}
        onPress={() => {
          props.navigation.pop();
        }}
        onPressChatBot={() => {
          props.navigation.navigate('ChatBotScreen');
        }}></BackBtn>
      <View style={{flex: 1}}>
        {translatedText == '' && translatedAudio == '' ? (
          <View style={{flexGrow: 1}}>
            <CustomScrollView
              contentContainerStyle={styles.customScrollViewStyle}>
              <CustomText style={styles.contentStyle}>
                {props?.route?.params?.translatedTextString}
              </CustomText>
            </CustomScrollView>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                marginHorizontal: 15,
              }}>
              <TranslateItem
                title={'From'}
                titleStyle={styles.FromTOStyle}
                modalVisible={modalVisibleFrom}
                setModalVisible={setModalVisibleFrom}
                selectedLang={selectedLangFrom}
                setSelectedLang={setSelectedLangFrom}
                languages={languages}
                setCode={setSelectedLangCodeFrom}
                onPress={() => setModalVisibleFrom(true)}></TranslateItem>
              <TranslateItem
                title={'To'}
                titleStyle={styles.FromTOStyle}
                modalVisible={modalVisibleTo}
                setModalVisible={setModalVisibleTo}
                selectedLang={selectedLangTo}
                setSelectedLang={setSelectedLangTo}
                languages={languages}
                setCode={setSelectedLangCodeTo}
                onPress={() => setModalVisibleTo(true)}></TranslateItem>
            </View>
            <ButtonWithIcon
              loading={tranlationLoading}
              disable={!selectedLangTo || !selectedLangFrom}
              leftIcon={<SoundWave></SoundWave>}
              style={styles.btnStyleGenerateAudioBook}
              disableColor={Colors.PurpleBorder}
              disableBorderColor={Colors.PurpleBorder}
              title={`Generate Audiobook`}
              textStyle={styles.btnTextGenerateAudioBook}
              onPress={() => {
                if (preConvertedTextString != null) {
                  nmt_tranlation()
                    .then(data => {
                      setTranslatedText(
                        // @ts-ignore
                        data?.pipelineResponse[0]?.output[0]?.target,
                      );
                      setTranslatedAudio(
                        // @ts-ignore
                        data?.pipelineResponse[1]?.audio[0]?.audioContent,
                      );
                    })
                    .catch(error => {
                      console.log('nmt_translation button:', error);
                    });
                } else {
                  Alert.alert('No String');
                }
              }}></ButtonWithIcon>
          </View>
        ) : (
          <View style={{flexGrow: 1}}>
            <CustomScrollView
              contentContainerStyle={styles.customScrollViewStyle}>
              <CustomText style={styles.contentStyle}>
                {highlightWordBasedOnIndex(translatedText, currentWordIndex)}
              </CustomText>
            </CustomScrollView>
            <AudioGeneration
              audioFile={translatedAudio}
              audioTitle={props?.route?.params?.title}
              navigation={props?.navigation}
              TranslatePress={() => {
                props?.navigation?.goBack();
              }}
              text={translatedText}
              updateWordIndex={updateCurrentWordIndex}></AudioGeneration>
          </View>
        )}
      </View>
      {tranlationLoading && <ReadLoader />}
    </View>
  );
};

export default AudioBookReader;

const styles = StyleSheet.create({
  textStyle: {backgroundColor: Colors.White},
  contentStyle: {
    fontFamily: Fonts.PoppinsLight,
    textAlign: 'justify',
    fontSize: FontSize[15],
    color: Colors.Black,
  },
  customScrollViewStyle: {
    flexGrow: 1,
    marginHorizontal: 15,
    marginTop: 15,
    paddingBottom: 0, //45,
  },
  btnStyle: {
    marginTop: Dimensions.HP_2_3_6, //20,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: Colors.PurpleBorder,
  },
  btnText: {
    marginLeft: 10,
    fontSize: FontSize[16],
    fontFamily: Fonts.Regular,
    color: Colors.Purple_Text_1,
  },
  btnStyleGenerateAudioBook: {
    marginVertical: Dimensions.HP_2_3_6, //20,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  btnTextGenerateAudioBook: {
    marginLeft: 10,
    fontSize: FontSize[20],
    fontFamily: Fonts.Bold,
    color: Colors.White,
  },
  FromTOStyle: {
    marginLeft: 10,
    fontSize: FontSize[15],
    fontFamily: Fonts.Regular,
    fontWeight: '400',
    color: Colors.Text,
  },
});
