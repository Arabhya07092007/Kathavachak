import axios from 'axios';
import {Alert} from 'react-native';
import {currentErrorEnum} from '../../context/error_message_context';
import {MessageType} from '../../utils/enum/enums';
import {
  resetStack,
  showToastMessage,
} from '../../utils/functions/commanFunctions';
import {AsyncKey, Storage} from '../../utils/storage/storage';
import {axiosApiInstance} from '../refreshToken/refreshToken';

export const request = async (
  url: string,
  method: string,
  req: Object | null,
  ErrorContext: any,
  showToast: boolean = true
) => {
  return new Promise(async (resolve, reject) => {
    let data = {...currentErrorEnum};
    // let accessToken = Storage.getString(AsyncKey.AccessToken)
    axiosApiInstance({
      method: method,
      url: url,
      headers: {
        Accept: 'application/json',
      },
      data: req ? req : null,
    })
      .catch(error => {
        console.log(`============error==============`);
        console.log('error::::::',error);
        console.log(`============error==============`);
        if (error?.response?.status == 401) {
          // Alert.alert("Oops", "User session time out")
          // resetStack()
        } else {
          var message = '';
          if (typeof error?.response?.data?.message == 'object') {
            var errorData = error.response.data.message;
            var keys = Object.keys(error?.response?.data?.message);
            if (keys.length > 0 && errorData[keys[0]].length > 0) {
              data.errorMessage = errorData[keys[0]];
              data.show = true;
              data.success = false;
              ErrorContext.setCurrentError(data);
            }
          } else {
            data.errorMessage = error?.response?.data?.message;
            data.show = true;
            data.success = false;
            ErrorContext.setCurrentError(data);
          }
        }

        reject(error.response);
      })
      .then(async result => {
        if (
          result?.status == 201 ||
          result?.status == 200 ||
          result?.status == 204 ||
          result?.status == 204
        ) {
          // data.errorMessage = result.data.message;
          data.show = true;
          data.success = true;
          // ErrorContext.setCurrentError(data);
          if (showToast) {
            showToastMessage(result.data.message, MessageType.Success);
          }
          // console.log(`in resolve::::: ${result?.pipelineResponse?.output?.target}`);
          resolve(result);
        } else if (result?.data?.statusCode == 401) {
          // alert('User session timeout')
          Alert.alert('Oops', 'User session time out');
          resetStack();
          // let refreshTokenAPIresult = await refreshTokenAPI()
          // if (refreshTokenAPIresult?.data?.statusCode == 201 || refreshTokenAPIresult?.data?.statusCode == 200) {
          //     return request(url, method, ErrorContext, setCallingAPI, req)
          // }
        } else {
          console.log('status in request', result);

          if (typeof result?.data?.message == 'string') {
            data.errorMessage = result?.data?.message;
            data.show = true;
            data.success = false;
            ErrorContext.setCurrentError(data);
            reject(result?.data?.message);
          } else {
            reject(result?.data);
          }
        }
      });
  });
};

// export const asr_servic_id = 'ai4bharat/conformer-hi-gpu--t4'
// export const tts_service_id = 'ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4'
// export const nmt_service_id = 'ai4bharat/indictrans-v2-all-gpu--t4'
// export const trans_service_id = 'ai4bharat/indicxlit--cpu-fsv2'
// export const user_id = 'c68d8dde54274cb1a87bb3d976f5da05'

