import React from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextLayoutEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface ChildComponentProps {
    source?: string;
    style?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    onPress?: Function;
    title?: string;
    children?: JSX.Element | JSX.Element[];
  }
  
  export interface CustomTextProps {
    style?: StyleProp<TextStyle>;
    allowFontScaling?: boolean;
    numberOfLines?: number | undefined;
    children?: string | string[] | number | number[] | Element;
    onPress?: Function;
    onTextLayout?:
      | ((event: NativeSyntheticEvent<TextLayoutEventData>) => void)
      | undefined;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  }
  