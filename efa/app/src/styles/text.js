import { StyleSheet } from 'react-native'
import colors from './colors'

var font = "Helvetica Neue"
//var font = "normal"

const text = StyleSheet.create({
    title: {
        color: colors.primaryBrandColors.macysGrey1,
        fontFamily: font,
        fontSize: 50,
        fontWeight: 'bold',
    },
    subTitle: {
        color: colors.primaryBrandColors.macysGrey2,
        fontFamily: font,
        fontSize: 30,
        fontWeight: '200'
    },
    data: {
        color: colors.primaryBrandColors.macysWhite,
        fontFamily: font,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonData: {
        color: colors.primaryBrandColors.macysWhite,
        fontFamily: font,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
    },
    dataGrey: {
        color: colors.primaryBrandColors.macysGrey1,
        fontFamily: font,
        fontSize: 20,
        fontWeight: 'bold'
    },

});

export default text;