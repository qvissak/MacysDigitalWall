import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity, Button, Image, FlatList } from 'react-native';
import RequestButton from "./app/src/components/RequestButton/RequestButton";
import RequestStatusButton from "./app/src/components/RequestStatusButton/RequestStatusButton";
import Profile from "./app/src/components/Profile/Profile"
import data from "./app/src/utils/sampleData"
import images from "./app/src/config/images"
import StatusIndicator from './app/src/components/StatusIndicator/StatusIndicator'
import colors from './app/src/styles/colors'

var { height, width } = Dimensions.get('window');
var lastTimestampPolled = null;


export default class App extends Component {

    constructor(props) {
        super(props);
        this.handleOnPressOrder = this.handleOnPressOrder.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateItemRequestData = this.updateItemRequestData.bind(this);
        this.profileItemRequestStatusChangeCallback = this.profileItemRequestStatusChangeCallback.bind(this);

        this.updateOldItemRequestData = this.updateOldItemRequestData.bind(this);

        this.state = {
            allowUpdateOldItems: false,
            activeData: [],
            modalVisible: false,
            allData: [],
        };
        console.log("inside constructor");
    }

    componentDidMount() {
        // if we want to use real data, we must uncomment these and in constructor state.allData must be assigned to an empty array :[]
        this.updateItemRequestData();
        setInterval(this.updateItemRequestData, 15 * 1000);
        setInterval(this.updateOldItemRequestData, 5 * 1000);

        console.log("inside componentDidMount");
    }

    async updateOldItemRequestData() {
        if (this.state.allowUpdateOldItems) {
            var newItemRequests = await fetch("http://172.17.0.62:8080/associate/getolditems?departmentId=313&timestamp=" + lastTimestampPolled).then(

                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    return response.json();

                }
            ).then(function (jsonResponse) {
                return jsonResponse.itemRequests;
            });

            if (typeof newItemRequests != 'undefined') {
                if (this.state.allData.length > 0) {

                    console.log(newItemRequests)
                    this.setState({ allowUpdateOldItems: true, allData: this.state.allData.splice( 0, newItemRequests.length -1, newItemRequests) });
              
                }
            }
        }
    }

    async updateItemRequestData() {

        var newItemRequests = await fetch("http://172.17.0.62:8080/associate?departmentId=313&timestamp=" + lastTimestampPolled).then(

            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                return response.json();

            }
        ).then(function (jsonResponse) {
            lastTimestampPolled = jsonResponse.lastTimestamp;
            console.log(lastTimestampPolled);
            return jsonResponse.itemRequests;
        });

        if (typeof newItemRequests != 'undefined') {
            this.setState({ allData: this.state.allData.concat(newItemRequests) });
        } else {
            console.log(" no new items to added");
        }
    }

    handleOnPressOrder(newdata) {
        this.setState({ activeData: newdata, modalVisible: true }, function () {
            console.log("modal is on");
        })
    }

    closeModal() {
        this.setState({ activeData: this.state.activeData, modalVisible: false }, function () {
            console.log("modal is off");
        });
    }

    _keyExtractor = (item, index) => item.requestId;

    //called when item status changes via profile component
    //we must copy the allData array, make changes to it. then reset the allDataset
    profileItemRequestStatusChangeCallback(requestId, newStatus) {
        //console.log("App.js profileItemRequestStatusChangeCallback")
        //console.log(requestId + "  " + newStatus)
        var newArray = this.state.allData.splice(0)
        //console.log(newArray);
        for (var i = 0; i < newArray.length; i++) {
            if (newArray[i].requestId == requestId) {
                newArray[i].itemStatus = newStatus;
                this.setState({ allData: newArray })
            }
        }

    }

    render() {
        //console.log("app.js rerendering")
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.containerTitle}>
                    <Image style={styles.logo} source={images.customer_requests2} />
                </View>

                <View style={styles.containerMain}>
                    <FlatList keyExtractor={this._keyExtractor} data={this.state.allData}
                        renderItem={({ item }) => <RequestStatusButton buttonStyle={'listButton'} onPress={this.handleOnPressOrder} data={item} />}
                    />
                    <Profile statusUpdateCallback={this.profileItemRequestStatusChangeCallback} isVisible={this.state.modalVisible} closeModal={this.closeModal} data={this.state.activeData} />
                </View>

                <View style={styles.containerFooter}>
                    <Image style={styles.legend} source={images.status_legend2} />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerTitle: {
        flex: 1.1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor: '#00ff00',
        //borderWidth: 5,
    },
    containerMain: {
        flex: 6,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor: '#ff0000',
        //borderWidth: 5
    },
    containerFooter: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor: '#0000ff',
        //borderWidth: 5
    },
    logo: {
        aspectRatio: 3.6,
        resizeMode: 'contain',
        top: 3,
        flex: 1
    },
    legend: {
        aspectRatio: 3.1,
        resizeMode: 'contain',
        flex: 1
    },

});