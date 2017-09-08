import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../../styles/colors'
import text from '../../styles/text'


export default class StatusIndicator extends Component {
    constructor(props) {
        super(props);
        this.updateColorByStatus = this.updateColorByStatus.bind(this);

        this.state = {
            color: this.props.defaultColor
        };
    }
    componentDidMount() {
        this.updateColorByStatus(this.props.status);
    }
    
    componentWillUpdate(nextProps, nextState){
        //update the color only if the status has changed
        if(nextProps.status != this.props.status)
            this.updateColorByStatus(nextProps.status);
    }

    updateColorByStatus(status) {
        newColor = "";
        switch (status.toUpperCase()) {
            case "NEW":
                newColor = colors.primaryBrandColors.macysGrey6
                break;
            case "PENDING":
                newColor = colors.notificationColors.macysWarningSecondary
                break;
            case "FULFILLED":
                newColor = colors.notificationColors.macysValidation
                break;
        }

        this.setState({ color: newColor });
    }

    render() {

        const styles = {
            buttonFull: {
                width: 60,
                height: 60,
                backgroundColor: this.state.color != "" ? this.state.color :colors.primaryBrandColors.macysGrey6,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#000000',
                borderWidth: 1,
                //position: 'absolute',

            }
        }

        return (
            <View>
                < TouchableOpacity disabled={true} style={styles.buttonFull} />
            </View>
        )
    }

}

