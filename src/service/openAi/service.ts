import { HttpMethods } from "../../utils/constants/constants";
import { Url_Google_Vision, Url_openAI } from "../../utils/urls/url";
import { request } from "../common/request";

export const OPENAI_ChatGPT = async (
    setCallApi: Function,
    reqObj: any,
    ErrorContext: any,
  ) => {
    // console.log('chat_completion_openAI reqObj:', JSON.stringify(reqObj));
    setCallApi(true);
    const url = `${Url_openAI}`;
    console.log(`chat_completion_openAI: ${url}`);
    return new Promise((resolve, reject) => {
      request(url, HttpMethods.Post, reqObj, ErrorContext, false)
        .then(res => {
          // console.log(`res in chat_completion_openAI: ${res}`); // ${JSON.stringify(res)}`);
          //@ts-ignore
          resolve(res);
          setCallApi(false);
        })
        .catch(error => {
          console.log('chat_completion_openAI error:', error);
          setCallApi(false);
          reject(error);
        });
    });
  };