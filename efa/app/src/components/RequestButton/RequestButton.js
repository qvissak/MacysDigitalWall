import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Button, Dimensions, View, Text } from 'react-native';
import colors from '../../styles/colors'
import text from '../../styles/text'


//vars
var { height, width } = Dimensions.get('window');


export default class RequestButton extends Component {
    constructor(props) {
        super(props);
        this.onPressRow = this.onPressRow.bind(this);
        this.state = {
            data: this.props.data,
            //disabled: this.props.disabled,
            //buttonStyle: this.props.buttonStyle
        };

    }

    onPressRow() {
        this.props.onPress(this.state.data);
    }


    render() {

        var buttonStyle;
        var textStyle;

        switch (this.props.buttonStyle) {
            case "fullButton":
                buttonStyle = styles.fullButton
                break
            case "listButton":
                buttonStyle = styles.listButton
                break
            case "halfButton":
                buttonStyle = this.props.disabled ? styles.halfButtonGrey : styles.halfButton
                break;
            default:
                buttonStyle = styles.buttonFull
        }

        //textStyle = (this.props.disabled) ? text.dataGrey : text.data
        textStyle = (this.props.disabled) ? text.dataGrey : text.buttonData


        var abbrItemName = this.props.data.customerName + ": " + this.props.data.itemName
        // if (abbrItemName.length > 30) {
        //     abbrItemName = abbrItemName.substring(0,50) + "..."
        // }
        // console.log(abbrItemName)
        // console.log(buttonStyle == styles.listButton)



        // render more info on list item buttons
        if (buttonStyle == styles.listButton) { // ugly, but a shortcut
            return (

                <View >
                    < TouchableOpacity onPress={this.onPressRow} style={buttonStyle} disabled={this.props.disabled}>
                        {/* <Text style={textStyle}> {this.props.data.customerName}: {this.props.data.itemName}</Text> */}
                        <Text style={textStyle} numberOfLines={2} ellipsizeMode={'tail'}>{abbrItemName}</Text>
                    </TouchableOpacity >
                </View >
            )
        } else {
            return (
                <View >
                    < TouchableOpacity onPress={this.onPressRow} style={buttonStyle} disabled={this.props.disabled}>
                        <Text style={textStyle}> {this.props.data.itemName} </Text>
                    </TouchableOpacity >
                </View >
            )
        }

    }

}

const styles = StyleSheet.create({
    fullButton: {
        width: width - 50,
        height: 60,
        backgroundColor: colors.primaryBrandColors.macysRed,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        borderColor: '#000000',
        borderWidth: 1,
        //position: 'relative',
    },

    listButton: {
        width: width - 110,
        height: 60,
        backgroundColor: colors.primaryBrandColors.macysRed,
        alignItems: 'center',
        justifyContent: 'center', //vertical
        //marginBottom: 30,
        borderColor: '#000000',
        borderWidth: 1,
        //position: 'relative',
        left: -1, //accounts for margin
    },

    halfButton: {
        width: ((width - 50) / 2) - 5,
        height: 60,
        backgroundColor: colors.primaryBrandColors.macysRed,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        borderColor: '#000000',
        borderWidth: 1,
    },

    halfButtonGrey: {
        width: ((width - 50) / 2) - 5,
        height: 60,
        backgroundColor: colors.primaryBrandColors.macysGrey6,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        borderColor: '#000000',
        borderWidth: 1,
    }

});

