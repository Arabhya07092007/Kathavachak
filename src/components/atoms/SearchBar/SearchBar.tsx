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
import { Colors } from '../../../utils/colors/colors';
import { Fonts } from '../../../utils/fonts/fonts';
import { activeOpacity } from '../../../utils/constants/constants';

const SearchBar = (props: any) => {
  const {
    textInputStyle,
    mainStyle,
    onChangeText,
    onSearchPress,
    OnSearchPressRight,
    left = true,
    customizableLeft = false,
    right = false,
    placeholder = 'Search Here...',
    onFocus,
    customizableRight = false,
    src,
    rightSource,
    onPressIn,
    ...otherProps
  } = props;

  const SearchIcon = ({ src = require('./search.png'), rightIcon }) => {
    return (
      <TouchableOpacity
        style={{ alignSelf: 'center' }}
        onPress={rightIcon == true ? OnSearchPressRight : onSearchPress}
        activeOpacity={activeOpacity}>
        <Image
          source={src || rightSource}
          resizeMode={'contain'}
          style={{ height: 25, width: 25, alignSelf: 'center' }}></Image>
        {/* <Image
          source={rightSource}
          resizeMode={'contain'}
          style={{height: 25, width: 25, alignSelf: 'center'}}></Image> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.mainStyle, mainStyle]}>
      {left ? <SearchIcon rightIcon={false} src={src} /> : null}
      {/* <TouchableOpacity> */}
      {/* style={{width: '100%', height: 10}}>*/}
      <TextInput
        onChangeText={onChangeText}
        onPressIn={onPressIn}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor={Colors.Black}
        style={[styles.textInputStyle, textInputStyle]}
        {...otherProps}></TextInput>
      {right ? (
        <SearchIcon
          rightIcon={true}
          // OnSearchPressRight={OnSearchPressRight}
          src={rightSource}
        />
      ) : null}
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  textInputStyle: {
    flex: 1,
    marginLeft: 10,
    fontFamily: Fonts.Bold,
    color: Colors.Black,
    fontSize: 16,
  },

  mainStyle: {
    flexDirection: 'row',
    // marginHorizontal: 20,
    // marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS == 'ios' ? 15 : 5,
    borderRadius: 50,
    backgroundColor: Colors.GreyLight,
  },
});
