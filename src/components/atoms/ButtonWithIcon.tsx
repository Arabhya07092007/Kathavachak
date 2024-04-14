import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { Fonts } from '../../utils/fonts/fonts'
import { Colors } from '../../utils/colors/colors'
import RightArrow from '../../assets/svgs/RightArrow'
import { activeOpacity } from '../../utils/constants/constants'

const ButtonWithIcon = (props: any) => {

    const {
        showIconLeft = true,
        title = '',
        style,
        icon = '',
        disable = false,
        onPress,
        textStyle,
        loading = false,
        indicatorColor = Colors.White,
        disableColor,
        disableBorderColor
    } = props

    const RightIcon = () => {

        return (

            props.rightIcon

        )
    }

    const leftIcon = () => {

        return (
            props.leftIcon
        )
    }

    /**
     * * Use : To implement the button with title and left icon or right icon
     */
    return (
        <TouchableOpacity style={[{
            width: '100%',
            // backgroundColor: 'white',
            borderColor: disable ? Colors.LightPurple : disableBorderColor,
            borderWidth: 1,
            // height: 62,
            paddingVertical: 13,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: disable ? Colors.LightPurple : disableColor,
        },
            style]}
            activeOpacity={activeOpacity}
            disabled={disable ? disable : loading ? true : false}
            onPress={onPress}
        >{
                loading ?
                    <ActivityIndicator size={'large'} color={indicatorColor}></ActivityIndicator>
                    :
                    <>
                        {
                            leftIcon()
                        }
                        <CustomText style={[{ fontSize: 16, fontFamily: Fonts.Regular, color: Colors.White, marginHorizontal: 7 }, textStyle]}>{title}</CustomText>
                        {
                            RightIcon()
                        }
                    </>}

        </TouchableOpacity>
    )
}

export default ButtonWithIcon

const styles = StyleSheet.create({})