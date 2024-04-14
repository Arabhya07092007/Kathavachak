import { HttpMethods } from "../../utils/constants/constants";
import { Url_Google_Vision } from "../../utils/urls/url";
import { request } from "../common/request";

export const OCR_API = async (
    setCallApi: Function,
    reqObj: any,
    ErrorContext: any,
  ) => {
    // console.log('OCR_API reqObj:', JSON.stringify(reqObj));
    setCallApi(true);
    const url = `${Url_Google_Vision}`;
    return new Promise((resolve, reject) => {
        request(url, HttpMethods.Post, reqObj, ErrorContext, false)
        .then(res => {
            console.log(`res in OCR_API: `)//${JSON.stringify(res)}`);
            console.log(url);
            //@ts-ignore
            //   const resposneData = JSON.parse(res?.request?._response);
            resolve(res)
            setCallApi(false);
        })
        .catch(error => {
            //   console.log('OCR_API error:', error);
            console.log(url);
            setCallApi(false);
          reject(error)
        });
    });
  };