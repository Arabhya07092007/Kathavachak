import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {memo, useState} from 'react';
import Dimensions from '../../utils/dimension/dimensions';
import CustomText from '../atoms/CustomText';
import {Images} from '../../utils/imageSource/imageSource';
import {Colors} from '../../utils/colors/colors';
import {Fonts} from '../../utils/fonts/fonts';
import StatusView from './StatusView';
import FastImage from 'react-native-fast-image';
import {ShadowStyle} from '../../utils/constants/constants';

const FlatlistImageView = (props: any) => {
  const {
    width = Dimensions.WP_52,
    source,
    style,
    imageStyle,
    aspectRatio,
    image
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  // console.log(`isSave:${isSave}`);
  return (
    <View
      style={[
        {
          width: width,
          aspectRatio: aspectRatio ? aspectRatio : 1,
          ...ShadowStyle(),
          backgroundColor: 'white',
        },
        style,
      ]}>
      <FastImage
        source={
          source && source.length > 0
            ? {uri: source, priority: FastImage.priority.high}
            : Images.imagePlaceholder
        }
        resizeMode={FastImage.resizeMode.cover}
        style={[
          {
            width: width,
            aspectRatio: aspectRatio ? aspectRatio : 1,
            borderRadius: 20,
            backgroundColor: Colors.White,
          },
          imageStyle,
        ]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        // defaultSource={Images.imagePlaceholder}
      >
        {isLoading && (
          <View
            style={{
              // width: Dimensions.WP_100,
              width: width,
              aspectRatio: 1,
              // height: Dimensions.HP_35,1
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={Colors.Black} size="large" />
          </View>
        )}
      </FastImage>
     
    </View>
    // null
  );
};

export default memo(FlatlistImageView);

const styles = StyleSheet.create({});
