import React from 'react';
import { Alert, Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import _ from 'lodash';
import { authUrl, URL_NAME } from './urls';
import DeviceInfo from 'react-native-device-info';

const { height, fontScale, width } = Dimensions.get('window');
const standardLength = width > height ? width : height;
export const paddingHorizontal = width * 0.051
const guidelineBaseWidth = 375;
const defaultScaleFactor = width < guidelineBaseWidth ? 0.5 : 1;
const scale = size => (width / guidelineBaseWidth) * size;

export const fontScaleNormalize = _.memoize(
    (size, factor = defaultScaleFactor) =>
        fontScale > 1.4
            ? ((size + (scale(size) - size) * factor) / fontScale) * 1.353
            : size + (scale(size) - size) * factor,
);

const isIos = Platform.OS === 'ios';
const APIGTE21 = Platform.OS === 'android' && Platform['Version'] >= 21;
const APILT21 = Platform.OS === 'android' && Platform['Version'] < 21;
const Ratio = {
    ldpi: 0.75,
    mdpi: 1,
    tvdpi: 1.3,
    hdpi: 1.5,
    xhdpi: 2,
    xxhdpi: 3,
    xxxhdpi: 3.5,
    xxxxhdpi: 4,
};
export const parseFloat2Decimals = (value, toFixed) => {
    return parseFloat(parseFloat(value).toFixed(toFixed));
};
/**
 * part of ptToPx but move to new function for refactor
 * @returns return ratio.
 */
export function dpForPtPx() {
    const pixelratio = PixelRatio.get();
    const ratio = parseFloat2Decimals(
        pixelratio + '',
        pixelratio == 0.75 ? 2 : 1,
    );
    return ratio;
}
export const deviceHeight = DeviceInfo.hasNotch()
    ? standardLength - 48 // iPhone X style SafeAreaView size in portrait
    : Platform.OS === 'android'
        ? standardLength - StatusBar.currentHeight
        : standardLength;

export function RFPercentage(percent) {
    const heightPercent = (percent * deviceHeight) / 100;
    return Math.round(heightPercent);
}

// guideline height for standard 5" device screen is 680
export function RFValue(fontSize, standardScreenHeight = 480) {
    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
    return Math.round(heightPercent);
}

export function calculateFontSize(
    sizeInptiOS,
    sizeAndroidiOS,
    forImage = false,
) {
    const ratio = dpForPtPx();
    return isIos
        ? ptToPx(sizeInptiOS, ratio, forImage)
        : fontScaleNormalize(sizeAndroidiOS);
}
export const InProgress = () => {
    Alert.alert("Alert", 'In Progress')
}
/**
 * convert float size pt to pixel to display on ios or android
 * @param {float} sizeInpt - font size in pt. unit is 1
 * @returns pixel converted value
 */
export function ptToPx(sizeInpt, ratio, forImage = false) {
    var dp = isIos ? sizeInpt : sizeInpt * 2.22; // dp is 2.22 times than pt

    if (isIos) {
        if (forImage) {
            // for images
            dp = dp * Ratio.xxhdpi * 2.22; // here dp variable is actually pt size in ios so we need to convert pt to ration and convert to dp
        }

        return dp * Ratio.xxhdpi;
    }

    if (ratio <= Ratio.ldpi) {
        if (forImage) {
            // for images
            dp = dp * Ratio.ldpi * 2.22; // here dp variable is actually pt size in ios so we need to convert pt to ration and convert to dp
        }

        return dp;
    } else if (ratio > Ratio.ldpi && ratio <= Ratio.mdpi) {
        if (forImage) {
            // for images
            dp = dp * Ratio.mdpi * 2.22; // here dp variable is actually pt size in ios so we need to convert pt to ration and convert to dp
        }

        return dp;
    } else if (ratio > Ratio.mdpi && ratio <= Ratio.tvdpi) {
        if (forImage) {
            // for images
            dp = dp * Ratio.tvdpi * 2.22; // here dp variable is actually pt size in ios so we need to convert pt to ration and convert to dp
        }
        return dp;
    } else if (ratio > Ratio.tvdpi && ratio <= Ratio.hdpi) {
        if (forImage) {
            // for images
            dp = dp * Ratio.hdpi * 2.22; // here dp variable is actually pt size in ios so we need to convert pt to ration and convert to dp
        }

        return dp;
    } else if (ratio > Ratio.hdpi && ratio <= Ratio.xhdpi) {
        //iPhone SE, 6S, 7, 8,XR,11
        if (forImage) {
            // for images
            dp = dp * Ratio.xhdpi * 2.22; // here dp variable is actually pt size in ios so we need to convert pt to ration and convert to dp
        }

        return dp;
    } else if (ratio > Ratio.xhdpi && ratio <= Ratio.xxhdpi) {
        // Phone 6S Plus, 7 Plus, 8 Plus,X, XS, XS Max,11 Pro, 11 Pro Max,Pixel, Pixel 2
        if (forImage) {
            // for images
            dp = dp * Ratio.xxhdpi * 2.22; // here dp variable is actually pt size in ios so we need to convert pt to ration and convert to dp
        }

        return dp;
    } else if (ratio > Ratio.xxhdpi && ratio <= Ratio.xxxhdpi) {
        //Nexus 6,Pixel XL, Pixel 2 XL

        if (forImage) {
            // for images
            dp = dp * Ratio.xxxhdpi * 2.22; // here dp variable is actually pt size in ios so we need to convert pt to ration and convert to dp
        }

        return dp;
    } else if (ratio > Ratio.xxxhdpi && ratio <= Ratio.xxxxhdpi) {
        if (forImage) {
            // for images
            dp = dp * Ratio.xxxxhdpi * 2.22; // here dp variable is actually pt size in ios so we need to convert pt to ration and convert to dp
        }

        return dp;
    } else {
        return dp;
    }
}

const widthBaseScale = width / 414;
const heightBaseScale = height / 896;

function normalize(size, based = 'width') {
    const newSize =
        based === 'height' ? size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
const widthPixel = size => {
    return normalize(size, 'width');
};
//for height  pixel
const heightPixel = size => {
    return normalize(size, 'height');
};

//for Margin and Padding vertical pixel
const pixelSizeVertical = size => {
    return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = size => {
    return widthPixel(size);
};
export { widthPixel, heightPixel, pixelSizeVertical, pixelSizeHorizontal };
