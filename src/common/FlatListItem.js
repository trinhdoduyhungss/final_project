import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default class FlatListItem extends React.Component {
    render(){
        return(
            <View style={{flex:1, backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato'}}>
                <Text style={styles.flat}>{this.props.item.name}</Text>
                <Text>{this.props.item.address}</Text>
            </View>
        )
    }
}