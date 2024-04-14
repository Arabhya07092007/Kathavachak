import React, { memo, useState } from 'react';

import {

    ActivityIndicator,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../utils/colors/colors';
import { Fonts } from '../../utils/fonts/fonts';
import CustomText from '../atoms/CustomText';


const BottomText = (props: any) => {


    const {
        title = '',
        subTitle = '',
        onPress,
        style,
        loading = false,
        indicatorColor = Colors.White,
        titleStyle,
        subTitleStyle
    } = props


    return (

        <View style={[{ flexDirection: 'row', marginTop: 20, alignSelf: 'center' }, style]}>
            {loading ?
                <ActivityIndicator size={'large'} color={indicatorColor} ></ActivityIndicator>
                :
                <>
                    <CustomText style={[{ alignSelf: 'center', fontSize: 17, fontFamily: Fonts.Bold },titleStyle]}>{title}</CustomText>
                    <TouchableOpacity onPress={onPress}>
                        <CustomText style={[{ color: Colors.PeacockBlue, fontSize: 17, fontFamily: Fonts.Bold },subTitleStyle]}>{subTitle}</CustomText>
                    </TouchableOpacity>
                </>}
        </View>
    )


}

export default memo(BottomText)