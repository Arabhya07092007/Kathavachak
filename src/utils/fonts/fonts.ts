import {calculateFontSize} from '../constants/fontConstants';

export enum Fonts {
  LatoRegular='Lato-Regular',
  Regular = 'Lato-Regular',
  Bold = 'Lato-Bold',
  Light = 'Lato-Light',
  PoppinsLight = 'Poppins-Light',
  SoraBold = 'Sora-Bold',
  SoraSemiBold = 'Sora-SemiBold',
  SoraRegular = 'Sora-Regular'
  // ExtraBold = 'NunitoSans-ExtraBold',
  // SemiBold = 'NunitoSans-SemiBold',
  // WalsheimPro = 'GTWalsheimPro-Medium',
  // PlaceHolderBold = 'Poppins-Bold',
}

export const FontSize = {
  '10':10,
  '11':11,
  '12': 12,
  '12.5': 12.5,
  '13': 13,
  '14': 14,
  '15': 15,
  '16': 16,
  '17': calculateFontSize(17 / 3, 17, false),
  '18': calculateFontSize(18 / 3, 18),
  '19': 19,
  '20': 20,
  '22': 22,
  '24': calculateFontSize(24 / 3, 24),
  '25': 25,
  '28': 28,
  '30' : 30,
  '32':calculateFontSize(32 / 3, 32),
  '34': calculateFontSize(34 / 3, 34),//34,
  '48':48
};
