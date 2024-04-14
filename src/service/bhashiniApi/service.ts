import {HttpMethods} from '../../utils/constants/constants';
import {Url} from '../../utils/urls/url';
import {request} from '../common/request';

export const textTranslationNMT = async (
  reqObj: any,
  ErrorContext: any,
  setData: Function,
) => {
  console.log('textTranslation(NMT) reqObj:', JSON.stringify(reqObj));

  const url = `${Url}`;
  return new Promise((resolve, reject) => {
    request(url, HttpMethods.Post, reqObj, ErrorContext, false)
      .then(res => {
        //@ts-ignore
        const resposneData = JSON.parse(res?.request?._response);
        //@ts-ignore
        resolve(resposneData)
      })
      .catch(error => {
        console.log('textTranslationApi error:', error);
      });
  });
};

export const textTranslationNMT_TTS = async (
  setCallApi: Function,
  reqObj: any,
  ErrorContext: any,
) => {
  console.log('textTranslation(NMT+TTS) reqObj:', JSON.stringify(reqObj));
  setCallApi(true);
  const url = `${Url}`;
  return new Promise((resolve, reject) => {
    request(url, HttpMethods.Post, reqObj, ErrorContext, false)
      .then(res => {
        console.log(`res in NMT+TTS:`); // ${JSON.stringify(res)}`);
        //@ts-ignore
        const resposneData = JSON.parse(res?.request?._response);
            resolve(resposneData)
            setCallApi(false);
      })
      .catch(error => {
        console.log('textTranslationApi error:', error);
        setCallApi(false);
        reject(error)
      });
  });
};
