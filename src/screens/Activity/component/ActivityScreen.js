import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import Header from "@common/Header";
export default class ActivityScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#202E3E' }}>
                <View style={{ backgroundColor: '#202E3E' }}>
                    <Header navigation={this.props.navigation} title='ACTIVITY' />
                </View>
                <View style={{ backgroundColor: '#fff', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                    <View style={{ height: Dimensions.get('window').height - 212}}>
                        <Text>ActivityScreen</Text>
                    </View>
                </View>
            </View>
        )
    }
}