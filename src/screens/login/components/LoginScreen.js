import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Button,
  Text,
  TextInput,
  Alert
} from 'react-native';
//import {databaseacc} from '@login/components/LoginScreen';
import * as firebase from 'firebase';
import * as c from "@thread/component/constants"
// var firebase = require('firebase')
const config = {
    apiKey: c.FIREBASE_API_KEY,
    authDomain: c.FIREBASE_AUTH_DOMAIN,
    databaseURL: c.FIREBASE_DATABASE_URL,
    projectId: c.FIREBASE_PROJECT_ID,
    storageBucket: c.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: c.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);
var verifyuser
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', pass:'' };
    this.Signin = this.Signin.bind(this);
  }
  Signin(user, pass){
    // var verifyformat = user.findIndex("@gmail.com"||"@gmail.com.vn") > -1
    //console.log(databaseacc)
    console.log(user +' '+pass)
    verifyuser=firebase.database().ref(user)
    verifyuser.on('value', snapshot =>{
        console.log(snapshot.val())
        if(pass == snapshot.val() && pass != '' && snapshot.val() != ''){
            this.props.navigation.navigate('HomeScreen')
        }else{
            Alert.alert(
            'Dang nhap khong thanh cong',
            'Xem lai tai khoan hoac mat khau',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false })
        }
    })
    // if(verifyformat){
    // }else{
    //     Alert.alert(
    //         'Dang nhap khong thanh cong',
    //         'Xem lai tai khoan hoac mat khau',
    //         [
    //           {text: 'OK', onPress: () => console.log('OK Pressed')},
    //         ],
    //         { cancelable: false })
    // }
  }
  render() {
    return (
      <View>
        {/* {renderProduct(this.props.list, this.props.deleteListProduct)} */}
        <TextInput
        style={{height: 40, borderColor: 'red', borderWidth: 2}}
        onChangeText={(user) => this.setState({user})}
        placeholder={'nhap user'}
        value={this.state.user}
        />
        <TextInput
        style={{height: 40, borderColor: 'green', borderWidth: 1}}
        onChangeText={(pass) => this.setState({pass})}
        placeholder={'nhap pass'}
        value={this.state.pass}
        />
        <Text />
        <Button title='Login' onPress={()=>this.Signin(this.state.user, this.state.pass)}/>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     alignSelf: 'center',
//     marginTop: 30,
//     // flexDirection: 'row'
//   },
//   textList: {
//     fontSize: 30,
//     marginBottom: 20,
//     fontWeight: 'bold'
//   }
// });