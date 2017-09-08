import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Button, Dimensions, View, Text } from 'react-native';
import colors from '../../styles/colors'
import text from '../../styles/text'
import StatusIndicator from '../StatusIndicator/StatusIndicator'
import RequestButton from '../RequestButton/RequestButton'


//vars
var { height, width } = Dimensions.get('window');


export default class RequestStatusButton extends Component {
    constructor(props) {
        super(props);
        this.onPressRow = this.onPressRow.bind(this);
        console.log("requeststatusButton")
    }

    onPressRow() {
        this.props.onPress(this.props.data);
    }

    render() {
        return (

            <View style={styles.shadowContainer}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <StatusIndicator status={this.props.data.itemStatus} defaultColor={colors.primaryBrandColors.macysGrey6} />
                    <RequestButton buttonStyle={this.props.buttonStyle} onPress={this.props.onPress} data={this.props.data} />
                </View >
            </View>

        )
    }

}

const styles = StyleSheet.create({
    shadowContainer: {
        width: 60 + (width - 110) - 1,
        height: 60,
        shadowOffset: { width: 1, height: 4 },
        shadowColor: 'grey',
        shadowOpacity: 1.0,
        marginBottom: 30,
    },

});

