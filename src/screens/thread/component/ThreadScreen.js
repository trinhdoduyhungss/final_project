import React, { Component } from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import iconthread from '@assets/images/group.png';
import gifload from '@assets/images/30.gif';
export class ThreadScreen extends Component {
    constructor(props) {
        super(props);       
        this.Load = this.Load.bind(this);
    }
    Load(seconds){
        var counter = seconds;
        var interval = setInterval(() => {
            console.log(counter);
            counter--;
            if (counter < 0 ) {
                clearInterval(interval);
                this.props.navigation.navigate('LoginScreen')
                console.log('Ding!');
            }	
        }, 1000);
    }
    render() {
        return (
    <View style={[styles.container]}>
        <Image source={iconthread} />
        <Text/>
        <Image source={gifload} />
        {this.Load(5)}
    </View>
    )
  }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#374E69',
        alignItems: 'center',
        justifyContent: 'center',
    }
  })
export default ThreadScreen;