import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import BackBtn from '../../components/molecules/BackBtn';
import {Colors} from '../../utils/colors/colors';
import ScannedPage from '../../components/molecules/ScannedPage';
import CustomText from '../../components/atoms/CustomText';
import CustomButton from '../../components/atoms/CustomButton';
import Dimensions from '../../utils/dimension/dimensions';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import IconBtn from '../../components/atoms/IconBtn';
import FileAdd from '../../assets/svgs/FileAdd';
import ButtonWithIcon from '../../components/atoms/ButtonWithIcon';
import {InProgress} from '../../utils/constants/fontConstants';
import BookSVG from '../../assets/svgs/OBJECTS';
import CustomScrollView from '../../components/atoms/CustomScrollView';
import SoundWave from '../../assets/svgs/SoundWave';
import TranslateItem from '../../components/molecules/TranslateItem';
import DocumentScanner from 'react-native-document-scanner-plugin';
import DocumentPicker from 'react-native-document-picker';
import PdfExtract from '../../components/atoms/PdfExtract';
import {Transient} from 'react-native-pdf-extractor/src/types';
import {Extractor, Patterns} from 'react-native-pdf-extractor';
import BackgroundGradient from '../../components/atoms/BackgroundGradient';
import {textTranslationNMT_TTS} from '../../service/bhashiniApi/service';
import {
  MessageType,
  nmt_service_id,
  tts_service_id,
} from '../../utils/enum/enums';
import {CurrentErrorContext} from '../../context/error_message_context';
import {showToastMessage} from '../../utils/functions/commanFunctions';
import { storeConvertedTextToLocal } from '../../utils/storage/storage';
import { Images } from '../../utils/imageSource/imageSource';
import IconButton from '../../components/molecules/IconButton';
import { err } from 'react-native-svg';

const UploadScreen = (props: any) => {
  const ErrorContext = useContext(CurrentErrorContext);

  const [modalVisibleFrom, setModalVisibleFrom] = useState(false);
  const [modalVisibleTo, setModalVisibleTo] = useState(false);
  const [selectedLangFrom, setSelectedLangFrom] = useState('');
  const [selectedLangTo, setSelectedLangTo] = useState('');
  const [scannedImage, setScannedImage] = useState([]);
  const [uploadPDF, setUploadPDF] = useState(null);
  const [PDFtext, setPDFtext] = useState('');
  const [selectedLangCodeFrom, setSelectedLangCodeFrom] = useState('');
  const [selectedLangCodeTo, setSelectedLangCodeTo] = useState('');
  const [tranlationLoading, setTranlationLoading] = useState(false);

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

  //creating a alert
  // const docUploadAlert = (doc) => {
  //   Alert.alert('PDF Uploded', `${doc}`, [
  //     {
  //       text: 'Ok',
  //       // onPress: () => console.log('Cancel Pressed'),
  //       style: 'destructive',
  //     },
  //   ]);
  // };

  //   const scanDocument = async () => {
  //     // const {scannedImages} = await DocumentScanner.scanDocument();
  //     // if (scannedImages.length > 0) {
  //     //   // set the img src, so we can view the first scanned image
  //     //   setScannedImage(scannedImages[0]);
  //     // }
  //     try {
  //       const {scannedImages: newScannedImages} =
  //         await DocumentScanner.scanDocument();
  //       console.log('Scanned Images:', newScannedImages);
  //       if (Array.isArray(newScannedImages)) {
  //         setScannedImage(newScannedImages);
  //       } else if (typeof newScannedImages === 'string') {
  //         setScannedImage([newScannedImages]);
  //       } // Use default empty array if newScannedImages is undefined
  //     } catch (error) {
  //       console.error('Document scanning failed:', error);
  //     }
  //   };
  //
  const handleUploadPDf = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      // @ts-ignore
      setUploadPDF(doc);
      // console.log(`document: ${JSON.stringify(doc)}`);
      // Alert.alert(`${doc?.name} is uploaded`);
      showToastMessage(
        `${doc?.name} is successfully uploaded`,
        MessageType.Success,
      );
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        Alert.alert('Upload Cancelled');
      }
    }
  };
  // @ts-ignore
  // console.log(`Pdf Upload: ${JSON.stringify(uploadPDF?.uri)}`);

  const callback = (data: Transient) => {
    try {
      // @ts-ignore
      setPDFtext(data?.text);
      // @ts-ignore
      console.log(data?.max);
      console.log(data?.pages);
      
    } catch (error) {
      console.log(error);
    }
    
  };

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
            source: PDFtext.toString(),
          },
        ],
      },
    }));
  }, [PDFtext, selectedLangCodeFrom, selectedLangCodeTo]);

  // Api call for NMT_TTS translation
  const nmt_tranlation = async () => {
    try {
      const data = await textTranslationNMT_TTS(
        setTranlationLoading,
        apiObject,
        ErrorContext,
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  //clear upload pdf
  const clearUploadPDF = () => {
    setUploadPDF(null);
  };
  function getLanguageName(code:any) {
    const language = languages.find(lang => lang.code === code);
    return language ? language.name : "Language not found";
}
// console.log(`selectedLangCodeFrom: ${selectedLangCodeFrom}\nSelected lang from : ${selectedLangFrom}`);
  // Main View
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <BackBtn
        title={'Upload PDF'}
        textStyle={styles.textStyle}
        onPress={() => {
          props.navigation.goBack();
        }}></BackBtn>
      <CustomScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: 15,
          marginTop: 15,
          // borderWidth: 1,
          paddingBottom: 180, //45,
        }}>
        {/* {scannedImage.map((imageUri, index) => (
          <Image
            key={index}
            resizeMode="contain"
            style={{width: '20%', height: '20%'}}
            source={{uri: imageUri}}></Image>
        ))} */}
      {uploadPDF ? (
          <View style={{marginTop:5}}>
            <IconButton
              style={{
                position: 'absolute',
                top: -1,
                right: 40,
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: 100,
                height: 40,
                zIndex: 2,
              }}
              iconStyle={{tintColor: Colors.White}}
              onPress={() => {
                clearUploadPDF();
              }}
              icon={Images.cross}></IconButton>
            <View
              style={{
                borderWidth: 1,
                paddingVertical: 13,
                alignItems: 'center',
                marginTop: Dimensions.HP_2_3_6, //20,
                width: '70%',
                alignSelf: 'center',
                borderRadius: 10,
                borderColor: Colors.PurpleBorder,
              }}>
              {/* @ts-ignore */}
              <CustomText>{uploadPDF?.name}</CustomText>
            </View>
          </View>
        ) : (
          <ButtonWithIcon
            leftIcon={<FileAdd></FileAdd>}
            style={styles.btnStyle}
            title={`Upload Book's PDF`}
            textStyle={styles.btnText}
            onPress={() => {
              handleUploadPDf();
            }}></ButtonWithIcon>
        )}
        <Extractor
          /* @ts-ignore */
          onResult={callback}
          
          patterns={/([\u0900-\u097F]+)|([\s\S]+)|([\u0B80-\u0BFF]+)|([\u0C00-\u0C7F]+)/}//{/[\u0900-\u097F]+/}//{/[\s\S]+/}
          /* @ts-ignore */
          uri={uploadPDF?.uri}></Extractor>
        <View style={{marginTop: 20, alignSelf: 'center'}}>
          <BookSVG></BookSVG>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <TranslateItem
            // temp={true}
            title={'From'}
            titleStyle={styles.FromTOStyle}
            modalVisible={modalVisibleFrom}
            setModalVisible={setModalVisibleFrom}
            selectedLang={selectedLangFrom}
            // setSelectedLang={setSelectedLangFrom}
            setSelectedLang={setSelectedLangFrom}
            languages={languages}
            setCode={setSelectedLangCodeFrom}
            // onPress={()=>{Alert.alert('Currently support for only English language is available.')}}
            onPress={() => setModalVisibleFrom(true)}
            ></TranslateItem>
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
          disable={!selectedLangTo || !selectedLangFrom}
          disableColor={Colors.PurpleBorder}
          disableBorderColor={Colors.PurpleBorder}
          loading={tranlationLoading}
          leftIcon={<SoundWave></SoundWave>}
          style={styles.btnStyleGenerateAudioBook}
          title={`Generate Audiobook`}
          textStyle={styles.btnTextGenerateAudioBook}
          onPress={() => {
            if (uploadPDF != null) {
              nmt_tranlation()
                .then(data => {
                  // @ts-ignore
                  // console.log(`Indise onPress Text: `, JSON.stringify(data?.pipelineResponse[1]?.config?.language?.sourceLanguage));
                  // const fromLangName=getLanguageName(selectedLangCodeFrom);

                  props.navigation.navigate('ReadScreen', {
                    // @ts-ignore
                    text: data?.pipelineResponse[0]?.output[0]?.target,
                    // @ts-ignore
                    audio: data?.pipelineResponse[1]?.audio[0]?.audioContent,
                    // @ts-ignore
                    title: uploadPDF?.name,
                    // @ts-ignore
                    language: data?.pipelineResponse[1]?.config?.language?.sourceLanguage,
                  });
                  // @ts-ignore
                  // storeConvertedTextToLocal(uploadPDF?.name,data,fromLangName)
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              Alert.alert('Please Upload a document to generate audiobook');
            }
          }}></ButtonWithIcon>
        {/* </View> */}
      </CustomScrollView>
    </View>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  textStyle: {backgroundColor: Colors.White},
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
    marginTop: Dimensions.HP_2_3_6, //20,
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
