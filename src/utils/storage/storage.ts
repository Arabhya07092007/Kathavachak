import {MMKV} from 'react-native-mmkv';

export const AsyncKey = {
  idToken: 'idToken',
  RefreshToken: 'RefreshToken',
  UserData: 'UserData',
  UserId: 'UserId',
  Uid: 'uid',
};

export const Storage = new MMKV();

export function storeToLocal(data: any) {
  try {
    if (data?.idToken && data?.user?.uid) {
      Storage.set(AsyncKey.idToken, data.idToken);
      Storage.set(AsyncKey.Uid,(data?.user?.uid));
    }
    Storage.set(AsyncKey.UserId, JSON.stringify(data?.user?.id));
    Storage.set(AsyncKey.UserData, JSON.stringify(data?.user));
  } catch (error) {}
}

export function storeEmailLogin(data: any) {
  try {
    if (data?.uid) {
      Storage.set(AsyncKey.idToken, data?.uid);
      Storage.set(AsyncKey.Uid, data?.uid);
    }
    Storage.set(AsyncKey.UserData, JSON.stringify(data));
  } catch (error) {
    // @ts-ignore
    console.log(`storeEmailLogin error: ${error?.message}`);
  }
}

export const AsyncTextConversionKey = {
  Text: 'Text',
  Audio: 'Audio',
  filename: 'fileName',
  fromLangName: 'fromLangName',
};

export function storeConvertedTextToLocal(
  fileName: string,
  data: any,
  fromLangName: string,
) {
  try {
    console.log('storage data:', fileName);
    console.log(
      'storage data text:',
      data?.pipelineResponse[0]?.output[0]?.target,
    );
    Storage.set(
      AsyncTextConversionKey.Text,
      JSON.stringify(data?.pipelineResponse[0]?.output[0]?.target),
    );
    Storage.set(
      AsyncTextConversionKey.Audio,
      JSON.stringify(data?.pipelineResponse[1]?.audio[0]?.audioContent),
    );
    Storage.set(AsyncTextConversionKey.filename, JSON.stringify(fileName));
    Storage.set(
      AsyncTextConversionKey.fromLangName,
      JSON.stringify(fromLangName),
    );
  } catch (error) {}
}
