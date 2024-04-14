import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../utils/colors/colors';
import {FontSize, Fonts} from '../../../utils/fonts/fonts';
import Dimensions from '../../../utils/dimension/dimensions';
import {activeOpacity} from '../../../utils/constants/constants';

const SearchBarTouchable = (props: any) => {
  const {
    textInputStyle,
    mainStyle,
    onSearchPress,
    left = true,
    customizableLeft = false,
    right = false,
    text = 'Search Here...',
    onFocus,
    customizableRight = false,
    src,
    onPress,
    ...otherProps
  } = props;

  const SearchIcon = ({src = require('./search.png')}) => {
    return (
      // <TouchableOpacity style={{alignSelf: 'center'}} onPress={onSearchPress}>
      <Image
        source={src}
        resizeMode={'contain'}
        style={{
          height: Dimensions.HP_3,
          width: Dimensions.WP_6_4,
          alignSelf: 'center',
        }}></Image>
      // </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <View style={[styles.mainStyle, mainStyle]}>
        {left ? <SearchIcon src={src} /> : null}
        <Text style={[styles.textInputStyle, textInputStyle]}>{text}</Text>
        {right ? <SearchIcon src={src} /> : null}
      </View>
    </TouchableOpacity>
  );
};

export default SearchBarTouchable;

const styles = StyleSheet.create({
  mainStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 20,
    height: Dimensions.HP_7_1,
    marginVertical: Dimensions.HP_1_9,
    paddingHorizontal: Dimensions.WP_6_4,
    paddingVertical:
      Platform.OS == 'ios' ? Dimensions.HP_2_1 : Dimensions.HP_1_4,
    borderRadius: 50,
    backgroundColor: Colors.GreyLight,
  },
  textInputStyle: {
    // flex: 1,
    marginLeft: Dimensions.WP_2_5,
    fontFamily: Fonts.Bold,
    color: Colors.Black,
    fontSize: FontSize[17],
    // textAlign: 'left',
  },
});
