import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../utils/colors/colors';
import BackBtn from '../../components/molecules/BackBtn';
import Dimensions from '../../utils/dimension/dimensions';
import {Strings} from './Strings';
import CustomScrollView from '../../components/atoms/CustomScrollView';
import CustomText from '../../components/atoms/CustomText';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import AudioGeneration from '../../components/molecules/AudioGeneration';
import ChatBot_Message from '../../assets/svgs/ChatBot';
import database from '@react-native-firebase/database';
import {AsyncKey, Storage} from '../../utils/storage/storage';

const ReadScreen = (props: any) => {
  const [recognizedText, setRecognizedText] = useState('');


  const textString = props?.route?.params?.text;
  const audioString = props?.route?.params?.audio;
  const userId = Storage.getString(AsyncKey.idToken);
  const title = props?.route?.params?.title;
  const lang = props?.route?.params?.language;

  useEffect(() => {
    if (
      userId !== null &&
      textString != null &&
      audioString != null &&
      title != null
    ) {
      const data = {
        title: title,
        textString: textString,
        language: lang,
        url: '',
      };

      database()
        // @ts-ignore
        .ref(`Users/${userId}/audioFiles`)
        .push()
        .set(data)
        .then(() => {
          console.log('Data updated.');
        });
    }
  }, [userId, audioString, textString, lang, title]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0); // State to track the current word index

  // Function to update the current word index
  const updateCurrentWordIndex = (index: number) => {
    setCurrentWordIndex(index);
  };

  const highlightWordBasedOnIndex = (text: string, currentIndex: number) => {
    // Split text into individual words
    const words = text.split(/[. |]/); // Split by whitespace to get individual words
  
    // Render each word, highlighting the current word if its index matches currentIndex
    return words.map((word, index) => {
      if (index === currentIndex) {
        // Highlight or mark the current word
        return <CustomText key={index} style={[styles.contentStyle,{ fontWeight: 'bold', backgroundColor:Colors.LightPurple }]}>{word} </CustomText>;
      } else {
        return <CustomText key={index} style={styles.contentStyle}>{word} </CustomText>;
      }
    });
  };
  
//   const highlightWordBasedOnIndex = (text: string) => {
//   // Split text into individual sentences
//   const sentences = text.split('. '); // Assuming sentences end with a period and a space

//   // Render each sentence, highlighting the sentence if it contains the current word
//   return sentences.map((sentence, index) => {
//     // Check if the current word index is within the range of the current sentence
//     const sentenceStartIndex = sentences.slice(0, index).join('. ').length;
//     const sentenceEndIndex = sentenceStartIndex + sentence.length;

//     if (currentWordIndex >= sentenceStartIndex && currentWordIndex <= sentenceEndIndex) {
//       // Highlight or mark the current sentence
//       return (
//         <Text key={index} style={{ fontWeight: 'bold' }}>
//           {sentence}. {/* Add period back as split removed it */}
//         </Text>
//       );
//     } else {
//       return (
//         <Text key={index}>
//           {sentence}. {/* Add period back as split removed it */}
//         </Text>
//       );
//     }
//   });
// };
  return (
    <View style={{flex: 1, backgroundColor: Colors.White}}>
      <BackBtn
        title={Strings.mainTitle}
        textStyle={styles.textStyle}
        chatBot={true}
        shareIcon={<ChatBot_Message></ChatBot_Message>}
        onPress={() => {
          props.navigation.pop();
        }}
        onPressChatBot={() => {
          props.navigation.navigate('ChatBotScreen');
        }}></BackBtn>
      <CustomScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: 15,
          marginTop: 15,
        }}>
        <CustomText style={styles.contentStyle}>
          {/* {props?.route?.params?.text} */}
          {highlightWordBasedOnIndex(props?.route?.params?.text, currentWordIndex)}
        </CustomText>
      </CustomScrollView>
      <AudioGeneration
        audioFile={props?.route?.params?.audio}
        audioTitle={props?.route?.params?.title}
        navigation={props?.navigation}
        TranslatePress={() => {
          props?.navigation?.goBack();
        }}
        updateWordIndex={updateCurrentWordIndex} 
        text={props?.route?.params?.text}
        ></AudioGeneration>
    </View>
  );
};

export default ReadScreen;

const styles = StyleSheet.create({
  textStyle: {backgroundColor: Colors.White},
  contentStyle: {
    fontFamily: Fonts.PoppinsLight,
    textAlign: 'justify',
    fontSize: FontSize[15],
  },
});
