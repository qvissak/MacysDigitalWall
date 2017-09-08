import React, { Component } from 'react';
import { Alert, Modal, Text, TouchableHighlight, View, Button, StyleSheet, Dimensions } from 'react-native';
import RequestButton from '../RequestButton/RequestButton'
import colors from '../../styles/colors'
import text from '../../styles/text'

var { height, width } = Dimensions.get('window');

export default class Profile extends Component {


    constructor(props) {
        super(props);
        this.updateItemRequestStatus = this.updateItemRequestStatus.bind(this);
        //this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.state = {
            acceptBtnEnabled: true,
            fulfillBtnEnabled: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        // if clicking a different request list button, update the state of the buttons reflected in the modal based on request status
        if (this.props.data.requestId != nextProps.data.requestId) {
            this.updateItemRequestStatus(nextProps.data.requestId, nextProps.data.itemStatus)
        }
    }


    closeModal() {
        this.props.closeModal()
    }

   async updateItemRequestStatus(itemRequestId, newItemStatus) {
       console.log(newItemStatus)
        if (newItemStatus == 'PENDING') {
            console.log("Pending")
            this.setState({
                acceptBtnEnabled: false,
                fulfillBtnEnabled: true
            });

            //this.closeModal()

        }
        else if (newItemStatus == 'FULFILLED') {
            console.log("Fulfilled")
            this.setState({
                acceptBtnEnabled: false,
                fulfillBtnEnabled: false
            });

            //this.closeModal()

        } else if (newItemStatus == "NEW") {
            console.log("New")
            this.setState({
                acceptBtnEnabled: true,
                fulfillBtnEnabled: false
            });

            //return;
            //this.closeModal()
        }

        let form = new FormData();
        form.append("requestId", itemRequestId);
        form.append("newStatus", newItemStatus);

        let updateResponse = await fetch("http://172.17.0.62:8080/associate/statusrequest",
            {
                method: "POST",
                body: form
            }
        ).then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            return response.json();
        });
        if (updateResponse.errorMessage = '') {
            console.log("Error occured : " + updateResponse.errorMessage);
            //TODO handle this error
        }
        if (updateResponse.successful) {
            this.props.statusUpdateCallback(itemRequestId, newItemStatus)
        }

        //console.log("is update successful?: " + updateResponse.successful);



    }

    render() {
        //console.log("profile.js render")
        var time_str = String(this.props.data.create_timestamp);
        var time_array = time_str.split(" ");
        var time = String(time_array[1]).substring(0, 8);

        return (

            <View>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.props.isVisible}
                    onRequestClose={() => this.closeModal()}
                >
                    <View style={{ marginTop: 22 }}>

                        <View style={styles.textView}>
                            <Text style={text.title}>{this.props.data.customerName}</Text>
                            <Text style={text.subTitle}>Request No.: {this.props.data.requestId}</Text>
                            <Text style={text.subTitle}>Item: {this.props.data.itemName}</Text>
                            <Text style={text.subTitle}>Color: {this.props.data.itemColorId}</Text>
                            <Text style={text.subTitle}>UPC: {this.props.data.itemUpcCode}</Text>
                            <Text style={text.subTitle}>WebID: {this.props.data.itemWebId}</Text>
                            <Text style={text.subTitle}>Status: {this.props.data.itemStatus}</Text>
                            <Text style={text.subTitle}>Time: {time}</Text>
                        </View>

                        <View style={styles.acceptBtn}>
                            <RequestButton disabled={!this.state.acceptBtnEnabled} buttonStyle={"halfButton"} data={{ itemName: "ACCEPT" }} onPress={() => { this.updateItemRequestStatus(this.props.data.requestId, "PENDING"); this.closeModal() }} />
                        </View>

                        <View style={styles.fulfillBtn}>
                            <RequestButton disabled={!this.state.fulfillBtnEnabled} buttonStyle={"halfButton"} data={{ itemName: "FULFILL" }} onPress={() => { this.updateItemRequestStatus(this.props.data.requestId, "FULFILLED"); this.closeModal() }} />
                        </View>

                        <View style={styles.backBtn}>
                            <RequestButton buttonStyle={"fullButton"} data={{ itemName: "BACK" }} onPress={() => { this.closeModal() }} />
                        </View>


                    </View>
                </Modal>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        top: 15,
        //position: 'absolute'
    },
    home: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        //justifyContent: 'center',
        top: 0,
        //position: 'absolute'

    },
    textView: {
        paddingLeft: 25
    },

    acceptBtn: {
        alignItems: 'center',
        position: 'absolute',
        left: 25,
        top: height - 22 - 80 - 60 - 10
        //top: height - 100
        //bottom: 10
    },

    fulfillBtn: {
        alignItems: 'center',
        position: 'absolute',
        left: width - 25 - (((width - 50) / 2) - 5),
        top: height - 22 - 80 - 60 - 10
        //top: height - 100
        //bottom: 10
    },

    backBtn: {
        alignItems: 'center',
        position: 'absolute',
        left: (width - (width - 50)) / 2,
        top: height - 22 - 80
        //top: height - 100
        //bottom: 10
    },


    image: {
        //flex: 1,
        aspectRatio: 4.5,
        resizeMode: 'contain',
        top: 15,
        left: -5
    }

});