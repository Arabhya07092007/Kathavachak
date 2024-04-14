export const connectionStatus = {
  HIGH: 'HIGH',
  LOW: 'LOW',
  MISSING: 'MISSING',
};

export const MessageType = {
  Success: 'success',
  Error: 'danger',
  Warning: 'warning',
};

export enum Provider {
  'google' = 'google_auth2',
  'apple' = 'apple',
}

export enum Userkey {
  'username' = 'name',
  'email' = 'email',
  'firstName' = 'givenName',
  'lastName' = 'familyName',
  'profilePic' = 'photo',
}
export enum firebaseKey {
  'username' = 'displayName',
  'email' = 'email',
  'profilePic' = 'photoURL',
}

export enum Translation {
  'NMT' = 'translation',
  'TTS' = 'tts',
  'ASR' = 'asr',
}

export enum Language {
  'hi' = 'Hindi/हिंदी',
  'mr' = 'Marathi/मराठी',
  'kn' = 'Kannada/ಕನ್ನಡ',
  'as' = 'Assamese/অসমীয়া',
  'ta' = 'Tamil/தமிழ்',
  'gu' = 'Gujarati/ગુજરાતી',
  'en' = 'English',
  'bn' = 'Bangla/বাংলা',
  'or' = 'Odia/ଓଡିଆ',
  'pa' = 'Punjabi/ਪੰਜਾਬੀ',
  'ml' = 'Malayalam/മലയാളം',
}

export const asr_servic_id = 'ai4bharat/conformer-hi-gpu--t4';
export const tts_service_id = 'ai4bharat/indic-tts-coqui-indo_aryan-gpu--t4';
export const nmt_service_id = 'ai4bharat/indictrans-v2-all-gpu--t4';
export const trans_service_id = 'ai4bharat/indicxlit--cpu-fsv2';
export const user_id = 'c68d8dde54274cb1a87bb3d976f5da05';
