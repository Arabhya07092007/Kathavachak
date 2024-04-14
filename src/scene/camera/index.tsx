import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Colors} from '../../utils/colors/colors';
import DocumentScanner from 'react-native-document-scanner-plugin';
import Dimensions from '../../utils/dimension/dimensions';
import ScannedPage from '../../components/molecules/ScannedPage';
import ButtonWithIcon from '../../components/atoms/ButtonWithIcon';
import TranslateItem from '../../components/molecules/TranslateItem';
import BookSVG from '../../assets/svgs/OBJECTS';
import {Extractor} from 'react-native-pdf-extractor';
import CustomText from '../../components/atoms/CustomText';
import IconButton from '../../components/molecules/IconButton';
import CustomScrollView from '../../components/atoms/CustomScrollView';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import {CurrentErrorContext} from '../../context/error_message_context';
import {MessageType, nmt_service_id} from '../../utils/enum/enums';
import {
  getPaddingTop,
  showToastMessage,
} from '../../utils/functions/commanFunctions';
import DocumentPicker from 'react-native-document-picker';
import {Images} from '../../utils/imageSource/imageSource';
import FileAdd from '../../assets/svgs/FileAdd';
import SoundWave from '../../assets/svgs/SoundWave';
import {textTranslationNMT_TTS} from '../../service/bhashiniApi/service';
import RNFS from 'react-native-fs';
import {useFocusEffect} from '@react-navigation/native';

const CameraScreen = (props: any) => {
  const ErrorContext = useContext(CurrentErrorContext);

  const [modalVisibleFrom, setModalVisibleFrom] = useState(false);
  const [modalVisibleTo, setModalVisibleTo] = useState(false);
  const [selectedLangFrom, setSelectedLangFrom] = useState('');
  const [selectedLangTo, setSelectedLangTo] = useState('');
  const [scannedImage, setScannedImage] = useState(null);
  const [uploadPDF, setUploadPDF] = useState(null);
  const [PDFtext, setPDFtext] = useState('');
  const [selectedLangCodeFrom, setSelectedLangCodeFrom] = useState('');
  const [selectedLangCodeTo, setSelectedLangCodeTo] = useState('');
  const [tranlationLoading, setTranlationLoading] = useState(false);
  const [OCRLoading, setOCRLoading] = useState(false);
  const [extractedTextOCR, setextractedTextOCR] = useState('');
  const [showUI, setShowUI] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // useEffect(() => {
  //   scanDocument();
  // }, []);

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

  const scanDocument = async () => {
    try {
      // @ts-ignore
      const {scannedImages, isCancelled} = await DocumentScanner.scanDocument();
      setLoading(false);
      if (!isCancelled && scannedImages && scannedImages.length > 0) {
        // props.navigation.navigate('ScanScreen', {images: scannedImages});
        // @ts-ignore
        setScannedImage(scannedImages[0]);
        setShowUI(true);
      } else {
        setShowUI(false);
        props.navigation.navigate('HomeTabStack');
      }
    } catch (error) {
      console.error('Error scanning document:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      scanDocument();
    }, [props.navigation]),
  );

  const handleUploadPDf = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      // @ts-ignore
      setUploadPDF(doc);
      console.log(`document: ${JSON.stringify(doc)}`);
      // Alert.alert(`${doc?.name} is uploaded`)
      showToastMessage(
        `${doc?.name} is successfully uploaded`,
        MessageType.Success,
      );
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        showToastMessage('Upload Cancelled', MessageType.Error);
      }
    }
  };
  // @ts-ignore
  // console.log(`Pdf Upload: ${JSON.stringify(uploadPDF?.uri)}`);
  // useEffect(() => {
  //   // call scanDocument on load
  //   console.log(`ScannedImage ${scannedImage}`);
  // }, [scannedImage]);

  // @ts-ignore
  const callback = (data: Transient) => {
    console.log(`data ${data?.text?.length}`);
    // @ts-ignore
    setPDFtext(data?.text);
  };

  const clearScannedImage = () => {
    setScannedImage(null);
  };

  const clearUploadPDF = () => {
    setUploadPDF(null);
  };

  const handleOCR = async () => {
    if (!scannedImage) {
      showToastMessage(`No Document scanned or uploaded`, MessageType.Error);
      return;
    }
    try {
      const apiKey = 'AIzaSyBkf4xH5LkWU53mRYFaKWQ-vx4eW25V6Z0';
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`; //: `https://vision.googleapis.com/v1/files:asyncBatchAnnotate?key=${apiKey}`

      const imagePath = scannedImage;
      // @ts-ignore
      const imageContent = await RNFS.readFile(imagePath, 'base64');

      const requestData = {
        requests: [
          {
            image: {
              content: imageContent, // Base64 encoded image data
            },
            features: [
              {
                type: 'DOCUMENT_TEXT_DETECTION', // Request OCR (text detection) feature
              },
            ],
          },
        ],
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // const response = await axios.post(apiUrl,requestData)
      const data = await response.json();
      console.log(`data:${JSON.stringify(data)}`);
      const extractedText =
        data?.responses[0]?.textAnnotations?.[0]?.description ||
        'No text found in the image.';

      // const data = await OCR_API(
      //   setOCRLoading,
      //   {
      //     requests: [
      //       {
      //         image: {
      //           content: imageContent, // Base64 encoded image data
      //         },
      //         features: [
      //           {
      //             type: 'DOCUMENT_TEXT_DETECTION', // Request OCR (text detection) feature
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   ErrorContext,
      // );
      console.log(`data: ${extractedText}`);
      setextractedTextOCR(extractedText + extractedText);
      return extractedText;
    } catch (error) {
      console.error('handleOCR Error:', error);
    }
  };

  useEffect(() => {
    // if(PDFtext != null)
    // {
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
              serviceId: serviceId || task.config.serviceId,
            },
          };
        }
        return task;
      }),
      inputData: {
        input: [
          {
            source: PDFtext
              ? PDFtext.toString()
              : extractedTextOCR
              ? extractedTextOCR.toString()
              : '',
          },
        ],
      },
    }));
  }, [PDFtext, extractedTextOCR, selectedLangCodeFrom, selectedLangCodeTo]);

  useEffect(() => {
    if (scannedImage != null) {
      handleOCR();
    }
  }, [scannedImage]);

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

  // if (!cameraReady) {
  //   // Render a loading indicator or a splash screen while the camera is being initialized
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }
  function getLanguageName(code:any) {
    const language = languages.find(lang => lang.code === code);
    return language ? language.name : "Language not found";
}
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <CustomScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginHorizontal: 15,
            marginTop: 15,
            // borderWidth: 1,
            paddingBottom: 45, //45,
          }}>
          {showUI && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  top: getPaddingTop(),
                }}>
                {scannedImage != null ? (
                  <View
                    style={{
                      position: 'relative',
                      right: 0,
                      left: 0,
                      paddingHorizontal: Dimensions.WP_3_8,
                    }}>
                    <IconButton
                      style={{
                        position: 'absolute',
                        top: -15,
                        right: -4,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        borderRadius: 50,
                        height: 40,
                        zIndex: 2,
                      }}
                      iconStyle={{tintColor: Colors.White}}
                      onPress={() => {
                        clearScannedImage();
                      }}
                      icon={Images.cross}></IconButton>
                    <Image
                      resizeMode="stretch"
                      style={{
                        width: Dimensions.WP_38_7, //151,
                        aspectRatio: 0.8,
                        // height: 151,
                        borderWidth: 1,
                        borderColor: Colors.PurpleBorder,
                        borderRadius: 10,
                      }}
                      source={{uri: scannedImage}}
                    />
                    <View
                      style={{
                        // position: 'absolute',
                        width: Dimensions.WP_38_6, //151,
                        backgroundColor: Colors.White,
                        zIndex: 2,
                        bottom: 52, // Adjust as needed
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        paddingHorizontal: 10,
                        // aspectRatio: 0.8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // left: 15,
                        // right: 0,
                        borderLeftWidth: 0.8,
                        borderRightWidth: 0.8,
                        borderBottomWidth: 1,
                        borderColor: Colors.PurpleBorder,
                      }}>
                      <CustomText numberOfLines={3}>
                        {/* DOCUMENT_SCAN_0_20240318_1303331382613973637844355.jpg */}
                        {/* @ts-ignore */}
                        {scannedImage.split('/').pop()}
                      </CustomText>
                    </View>
                  </View>
                ) : (
                  <ScannedPage
                    borderRadius={10}
                    onPress={async () => {
                      await scanDocument();
                      // await handleOCR();
                    }}></ScannedPage>
                )}
                <ScannedPage
                  borderRadius={10}
                  onPress={async () => {
                    await scanDocument();
                    // await handleOCR();
                  }}></ScannedPage>
              </View>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View></View>
                <CustomText
                  style={{
                    fontSize: FontSize[14],
                    fontFamily: Fonts.Bold,
                    color: Colors.Text,
                  }}>
                  {'Or'}
                </CustomText>
                <View></View>
              </View>
              {uploadPDF ? (
                <View>
                  <IconButton
                    style={{
                      position: 'absolute',
                      top: -2,
                      right: 32,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      borderRadius: 50,
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
                  disable={scannedImage !== null}
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
                patterns={
                  /([\u0900-\u097F]+)|([\s\S]+)|([\u0B80-\u0BFF]+)|([\u0C00-\u0C7F]+)/
                } //{/[\u0900-\u097F]+/}//{/[\s\S]+/}
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
                disable={!selectedLangTo || !selectedLangFrom}
                disableColor={Colors.PurpleBorder}
                disableBorderColor={Colors.PurpleBorder}      
                loading={tranlationLoading}
                leftIcon={<SoundWave></SoundWave>}
                style={styles.btnStyleGenerateAudioBook}
                title={`Generate Audiobook`}
                textStyle={styles.btnTextGenerateAudioBook}
                onPress={() => {
                  if (uploadPDF != null || scannedImage != null) {
                    nmt_tranlation()
                      .then(data => {
                        console.log(
                          `Inside onPress Text: `,
                          JSON.stringify(data),
                        );
                        const fromLangName=getLanguageName(selectedLangCodeFrom); 
                  // @ts-ignore
                  const fileName = (uploadPDF ? uploadPDF.name :  scannedImage.split('/').pop() )
                        props.navigation.navigate('ReadScreen', {
                          // @ts-ignore
                          text: data?.pipelineResponse[0]?.output[0]?.target,
                          // @ts-ignore
                          audio:data?.pipelineResponse[1]?.audio[0]?.audioContent,
                          // @ts-ignore
                          title: fileName,
                          // @ts-ignore
                          language:data?.pipelineResponse[1]?.config?.language?.sourceLanguage,
                        });
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  } else {
                    Alert.alert(
                      'Please Upload a document to generate audiobook',
                    );
                  }
                }}></ButtonWithIcon>
            </View>
          )}
        </CustomScrollView>
      )}
    </View>
  );
};

export default CameraScreen;

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
