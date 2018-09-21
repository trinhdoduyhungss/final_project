import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Alert,
  Platform,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import iconemail from '@assets/images/emailIcon.png';
import iconpass from '@assets/images/lockIcon.png';
export var usersss;
export var avatarus;
export var t_friend;
export var namess;
export var keyofuser;
var canclefetchlogin = false;
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', pass: '' };
    this.Signin = this.Signin.bind(this);
  }
  Signin(email, pass) {
    console.log("test_cancle_inlogin "+canclefetchlogin)
    if(canclefetchlogin == false){
      fetch('http://192.168.88.105:3000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pass
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message === "success") {
          usersss = responseJson.user_name;
          avatarus = responseJson.avatar_u;
          t_friend = responseJson.totalFriend;
          namess = responseJson.name
          keyofuser = responseJson.user_key
          canclefetchlogin =true
          console.log(keyofuser)
          this.props.navigation.navigate('BottomTab');
        } else {
          Alert.alert(
            'Dang nhap khong thanh cong',
            'Xem lai tai khoan hoac mat khau',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false })
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
  render() {
    return (
      <View style={{ backgroundColor: '#374E69', flexDirection: 'column' }}>
        <View style={{ alignItems: 'center', backgroundColor: '#374E69', justifyContent: 'space-between' }}>
          <Text style={{ backgroundColor: '#374E69', alignItems: 'center', color: 'white', marginTop: Platform.OS === 'ios' ? 0 : 24, marginBottom: Platform.OS === 'ios' ? 0 : 24, fontSize: 17 }}>LOGIN</Text>
        </View>
        <View style={{ backgroundColor: '#fff', borderTopEndRadius: 10, borderTopStartRadius: 10 }}>
          <Text style={{ marginLeft: 38, marginTop: 67, marginBottom: 8, fontSize: 14, color: 'gray' }}>Email</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 38, height: 40, borderColor: '#C7CBD1', borderWidth: 2, marginRight: 38, marginBottom: 19, borderRadius: 5 }}>
            <Image source={iconemail} style={{ margin: 14 }} />
            <TextInput
              style={{ paddingLeft: 3, height: 34, borderColor: '#fff', borderWidth: 2, flex: 1 }}
              onChangeText={(email) => this.setState({ email })}
              placeholder={'example@gmail.com'}
              value={this.state.email}
              underlineColorAndroid='transparent'
            />
          </View>
          <Text style={{ marginLeft: 38, marginBottom: 8, fontSize: 14, color: 'gray' }}>Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 38, height: 40, borderColor: '#C7CBD1', borderWidth: 2, marginRight: 38, marginBottom: 19, borderRadius: 5 }}>
          <Image source={iconpass} style={{ margin: 14 }} />
            <TextInput
              style={{ paddingLeft: 3, height: 34, borderColor: '#fff', borderWidth: 2, flex: 1 }}
              onChangeText={(pass) => this.setState({ pass })}
              placeholder={'*******************'}
              value={this.state.pass}
              underlineColorAndroid='transparent'
              secureTextEntry={true}
            />
          </View>
          <Text />
          <TouchableWithoutFeedback onPress={() => this.Signin(this.state.email, this.state.pass)}>
            <View style={{ backgroundColor: '#374E69', borderRadius: 25, marginLeft: 162, marginRight: 162, marginTop:71 }}>
              <Text style={{ textAlign: 'center', color: '#fff', fontSize: 15, marginTop: 11, marginBottom: 11, marginLeft: 24, marginRight: 24 }}>LOGIN</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={{ marginBottom: Dimensions.get('window').height - 319 }}></Text>
        </View>
      </View>
    );
  }
}