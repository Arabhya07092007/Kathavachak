import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Fonts } from '../../utils/fonts/fonts'
import { Colors } from '../../utils/colors/colors'
import CustomText from '../atoms/CustomText'

const StatusView = (props: any) => {

    const {
        title = '',
        style,
        textStyle
    } = props

    return (
        <View style={[{ paddingHorizontal: 10, paddingVertical: 0, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.Grey }, style]}>
            <CustomText style={[{ fontSize: 12, fontFamily: Fonts.Bold }, textStyle]}>{title}</CustomText>
        </View>
    )
}

export default memo(StatusView)

const styles = StyleSheet.create({})