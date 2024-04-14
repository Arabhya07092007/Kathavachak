import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Colors} from '../../utils/colors/colors';
import BackBtn from '../../components/molecules/BackBtn';
import {CurrentErrorContext} from '../../context/error_message_context';
import Dimensions from '../../utils/dimension/dimensions';
import {
  Bubble,
  Day,
  GiftedChat,
  InputToolbar,
  Message,
  MessageContainer,
  Send,
  Time,
} from 'react-native-gifted-chat';
import {Images} from '../../utils/imageSource/imageSource';
import {activeOpacity} from '../../utils/constants/constants';
import {FontSize, Fonts} from '../../utils/fonts/fonts';
import { OPENAI_ChatGPT } from '../../service/openAi/service';
import CustomText from '../../components/atoms/CustomText';

const ChatBotScreen = (props: any) => {
  const ErrorContext = useContext(CurrentErrorContext);

  const [messages, setMessages] = useState([]);
  const [firstMessage, setFirstMessage] = useState(false);
  const [apiObject, setApiObject] = useState({
    messages: [{role: 'system', content: 'You are a helpful assistant.'}],
    model: 'gpt-3.5-turbo',
  });
  const [chatGPTLoder, setChatGPTLoder] = useState(false);

  const onSend = async (messagesArray = []) => {
    const newMessages = messagesArray.map(message => {
      return {
        _id: Math.floor(Math.random() * 10000000000),
        // @ts-ignore
        text: message.text, // || convertSpeechToText(message.audio),
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
    });

    const messageText = newMessages[0].text;
    console.log('newMessage', newMessages);

    // Update apiObject with the latest messages
    // @ts-ignore
    setApiObject(prevState => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        {
          role: 'user',
          content: messageText,
        },
      ],
    }));
    // @ts-ignore
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );

    // TTS_api(messages);
    try {
      const responseMessage = await chatGpt(messageText);
      console.log(`responseMessage: ${responseMessage}`);
      const newResponse = {
        _id: Math.floor(Math.random() * 10000000000),
        text: responseMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chat Bot',
          avatar: 'https://placeimg.com/140/140/any',
        },
        // system: true, // Marking it as a system message
      };
      // @ts-ignore
      setMessages(previousMessages =>
        // @ts-ignore
        GiftedChat.append(previousMessages, newResponse),
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setFirstMessage(true);
  };

  const renderLoading = () => {
    if (chatGPTLoder) {
      return (
        <View>
          <ActivityIndicator size="large" color={Colors.Black} />
        </View>
      );
    }
  };

  const renderBubble = (props: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          width: Dimensions.WP_101,
          marginStart: -55,
        }}>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              borderTopRightRadius: 15,
              backgroundColor: Colors.White,
            },
            left: {
              borderTopLeftRadius: 15,
              backgroundColor: Colors.White,
              marginRight: 60,
            },
          }}
          containerToPreviousStyle={{
            right: {borderTopRightRadius: 15},
            left: {borderTopLeftRadius: 15},
          }}
          containerToNextStyle={{
            right: {borderTopRightRadius: 15},
            left: {borderTopLeftRadius: 15},
          }}
          containerStyle={{
            right: {
              flex: 1,
            },
            left: {
              paddingLeft: 15, //-50
              flexDirection: 'row',
              justifyContent: 'flex-start',
              zIndex: 1,
            },
          }}
          textStyle={{
            right: [
              styles.fontStyleChat,
              {
                marginHorizontal: 0,
                marginVertical: 0,
                color: Colors.White,
                backgroundColor: Colors.PurpleBorder,
                paddingVertical: Dimensions.HP_2_4, //20
                paddingHorizontal: Dimensions.WP_5_1, //20
                // padding: 20,
                borderRadius: 20,
                overflow: 'hidden',
              },
            ],
            left: [
              styles.fontStyleChat,
              {
                marginHorizontal: 0,
                marginVertical: 0,
                color: Colors.Black,
                backgroundColor: Colors.GreyLight,
                borderRadius: 20,
                paddingVertical: 25, //Dimensions.HP_2_4, //20
                paddingHorizontal: Dimensions.WP_5_1, //20
                // padding: 20,
                overflow: 'hidden',
              },
            ],
          }}
        />
      </View>
    );
  };

  const renderTime = (props: any) => {
    return (
      <Time
        {...props}
        timeFormat="HH:mm"
        containerStyle={{
          left: {
            margin: 0,
            flex: 1,
            backgroundColor: Colors.White,
            borderRadius: 20,
            overflow: 'hidden',
          },
          right: {
            flex: 1,
            backgroundColor: Colors.White,
            borderRadius: 20,
            overflow: 'hidden',
          },
        }}
        timeTextStyle={{
          left: {
            textAlign: 'left',
            color: 'black',
            fontSize: 10,
          },
          right: {color: Colors.Black, fontSize: 10},
        }}
      />
    );
  };

  const renderDay = (props: any) => {
    return (
      <Day
        {...props}
        textStyle={[styles.dateHeading, {color: Colors.Black}]}
        dateFormat="ddd, D MMM"
      />
    );
  };

  const customInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        primaryStyle={styles.inputToolbarPrimary}
        containerStyle={styles.inputToolbarContainer}
      />
    );
  };

  const customSystemMessage = () => {
    return (
      <View
        style={{
          flex: 1,
          transform: [{scaleY: -1}],
          alignSelf: 'center',
          // alignContent:'center',
          // backgroundColor: 'blue',
          paddingHorizontal: Dimensions.WP_5_1, //20,
        }}>
        <View
          style={{
            width: Dimensions.WP_79_4, //310,
            paddingTop: '50%', //Dimensions.HP_38, //320,
            alignSelf: 'center',
            // backgroundColor: 'coral',
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignSelf: 'center',
              // columnGap: 10,
              transform: [{scaleX: -1}],
            }}>
            <View
              style={{
                backgroundColor: Colors.Black,
                borderRadius: 100,
                width: 100,
                aspectRatio: 1,
                alignSelf: 'center',
              }}>
              <Image
                style={styles.iconStyle}
                resizeMode="contain"
                source={Images.kathaVachakLogo}
                // tintColor={Colors.White}
              />
            </View>
            <CustomText
              style={[
                styles.titleStyle,
                {textAlign: 'center', marginTop: Dimensions.HP_5},
              ]}>
               कथावाचक साथी
            </CustomText>
          </View>
        </View>
      </View>
    );
  };
  /*@ts-ignore */

  const renderSend = (props: any) => {
    if (!firstMessage) {
      return (
        <Send
          {...props}
          containerStyle={{
            justifyContent: 'center',
            // backgroundColor:'red',
            paddingRight: Dimensions.WP_2_5, //10
            alignSelf: 'center',
          }}>
          <Image
            source={Images.send}
            resizeMode="contain"
            style={{
              width: Dimensions.WP_6_1, //24
              height: Dimensions.HP_2_8, //24
            }}
          />
        </Send>
      );
    } 
    else {
      return (
        <Send
          {...props}
          containerStyle={{
            justifyContent: 'center',
            paddingRight: Dimensions.WP_2_5, //10
          }}>
          <Image
            source={Images.send}
            resizeMode="contain"
            style={{
              width: Dimensions.WP_6_1, //24
              height: Dimensions.HP_2_8, //24
            }}
          />
        </Send>
      );
    }
  };
  const chatGpt = async (messageUser: string) => {
    const newMessage = {role: 'user', content: messageUser || ''};
    try {
      const response = await OPENAI_ChatGPT(
        setChatGPTLoder,
        {
          messages: [
            ...apiObject.messages, // Previous messages
            newMessage, // New message from the user
          ],
          model: 'gpt-3.5-turbo',
        },
        ErrorContext,
      );
      console.log('response in chatGpt:', response);
      // @ts-ignore
      const responseData = JSON.parse(response?.request?._response);
      console.log(
        `responseData::: ${JSON.stringify(
          responseData?.choices[0]?.message?.content,
        )}`,
      );

      return JSON.stringify(responseData?.choices[0]?.message?.content);
    } catch (error) {
      console.log(`chatGpt${error}`);
    }
  };
  
  //main screen
  return (
    <View style={styles.mainContainer}>
      <BackBtn
        title={'KathaVachak Sathi'}
        onPress={() => {
          props.navigation.pop();
        }}
      />
      <View
        style={[
          {
            flex: 1,
            paddingBottom: Platform.OS == 'ios' ? Dimensions.HP_2_3_6 : 22,
          },
        ]}>
        <GiftedChat
          placeholder={'Start typing...'}
          textInputProps={{  placeholderTextColor: Colors.Black }}
          messages={messages.sort(
            // @ts-ignore
            (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
          )} 
          renderBubble={renderBubble}
          renderInputToolbar={customInputToolbar}
          // renderActions={renderActions}
          renderChatEmpty={customSystemMessage}
          renderTime={renderTime}
          renderDay={renderDay}
          renderSend={renderSend}
          renderLoading={renderLoading}
          isTyping={chatGPTLoder}
          /* @ts-ignore*/
          onSend={async messages => {
            console.log('msg', messages);
            // @ts-ignore
            onSend(messages);
          }}
          user={{
            _id: 1,
          }}
        />
      </View>
    </View>
  );
};

export default ChatBotScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  primary: {
    backgroundColor: Colors.White,
    paddingTop: Dimensions.HP_2_3_6, //20,
  },
  titleStyle: {
    alignSelf: 'center',
    fontFamily: Fonts.Regular,
    fontWeight: '400',
    fontSize: FontSize[16],
    color: Colors.Black,
  },
  subTitleStyle: {
    alignSelf: 'center',
    fontFamily: Fonts.Regular,
    fontWeight: '400',
    fontSize: FontSize[12],
    color: Colors.Black,
  },
  RegularTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: FontSize[17],
    fontWeight: '400',
    color: Colors.Black,
  },
  inputToolbarContainer: {
    backgroundColor: Colors.White,
    paddingHorizontal: Dimensions.WP_5_1, //20,
    borderRadius: 500,
    borderTopWidth: 0,
  },
  inputToolbarPrimary: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: Colors.White,
    borderWidth: 1,
    paddingTop: 0,
    paddingLeft: Dimensions.WP_2_5, // 10,
  },
  fontStyleChat: {
    fontSize: FontSize[17],
    fontFamily: Fonts.Regular,
    fontWeight: '400',
  },
  dateHeading: {
    fontSize: FontSize[14],
    fontWeight: '600',
    fontFamily: Fonts.Regular,
    textAlign: 'center',
  },
  ContainerBox: {
    padding: 2,
    width: Dimensions.WP_71, // 0.71,
    minHeight: Dimensions.HP_23,//195,
    // flex:1,
    marginVertical: Dimensions.HP_0_6,//5,
    borderWidth: 1,
    borderColor: '#ECEBEB',
    borderRadius: 16,
    backgroundColor: 'black',
  },
  iconStyle: {
    // borderRadius:50,
    width: 150,
    height:150,
    alignSelf: 'center',
    alignContent: 'center',
  },
});
