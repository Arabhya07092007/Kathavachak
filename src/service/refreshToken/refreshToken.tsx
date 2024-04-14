import axios from 'axios';
import {autoLogout} from '../../utils/functions/commanFunctions';
import {AsyncKey, Storage} from '../../utils/storage/storage';
import {Url, Url_Google_Vision, Url_openAI} from '../../utils/urls/url';

let isRefreshing = false;
let refreshSubscribers: Array<string> = [];

export const axiosApiInstance = axios.create();

// function subscribeTokenRefresh(cb) {

//     refreshSubscribers.push(cb);

// }

function onRefreshed(token: string) {
  //@ts-ignore
  refreshSubscribers.map(cb => cb(token));
}

axiosApiInstance.interceptors.request.use(
  async request => {
    const url = request?.url;
    if (url?.includes(Url_Google_Vision)) {
      const apiKey = 'AIzaSyBkf4xH5LkWU53mRYFaKWQ';
      // request.headers.Authorization = 'Bearer AIzaSyBkf4xH5LkWU53mRYFaKWQ';
      request.url += `?key=${apiKey}`;
      // console.log(`url${url}`);
    } else if (url?.includes(Url)) {
      request.headers.Authorization =
        'ZZiuNxfnJBUTWXXZmxQ7Wm6xk-R7vBZaFIZjf7nse8UXe3Oc4r4B_YW9KMgwZI_M';
    } else if (url?.includes(Url_openAI)) {
      request.headers.Authorization =
        'Bearer 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';
    }

    // if (Storage.contains(AsyncKey.idToken)) {
    //     console.log(Storage);
    //     var accessToken = Storage.getString(AsyncKey.idToken)
    //     request.headers.Authorization = `Bearer ${accessToken}`
    // }s
    // console.log(request);
    return request;
  },
  err => {
    return Promise.reject(err);
  },
);

axiosApiInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    console.warn('main error is here', error);
    const {
      config,
      response: {status},
    } = error;
    const originalRequest = config;

    if (status == 401) {
      console.warn('Unauthorized access, handle as needed');
      // console.warn("isRefreshing value", isRefreshing);
      // if (!isRefreshing) {

      //     isRefreshing = true
      //     let tokenRefershResponse = await callNewAccessToken()

      //     if (tokenRefershResponse && tokenRefershResponse.data && tokenRefershResponse.status == 200) {

      //         isRefreshing = false
      //         let accessToken = tokenRefershResponse.data.access_token
      //         onRefreshed(accessToken)
      //         Storage.set(AsyncKey.AccessToken, accessToken)
      //         originalRequest.headers.Authorization = `Bearer ${accessToken}`
      //         return axiosApiInstance(originalRequest)

      //     }
      // }
      // return new Promise((resolve) => {

      //     subscribeTokenRefresh((token) => {
      //         originalRequest.headers['Authorization'] = `Bearer ${token}`;
      //         console.warn("original request", originalRequest);
      //         resolve(axiosApiInstance(originalRequest))
      //     })
      // }).catch((error) => { console.warn("catching error", error); })
    } else {
      return Promise.reject(error);
    }
  },
);

async function callNewAccessToken() {
  // var refreshToken = await AsyncStorage.getItem(AsyncKey.RefreshToken)
  var accessToken = Storage.getString(AsyncKey.idToken);
  return axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    url: `${Url}/tokens/refresh`,
  }).catch(error => {
    console.warn('error coming in refreshToken', error);
    autoLogout();
  });
}
