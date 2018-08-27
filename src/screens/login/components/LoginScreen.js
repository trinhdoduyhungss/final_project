import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
  Alert
} from 'react-native';
export var usersss;
export var avatarus;
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '', pass: '' };
    this.Signin = this.Signin.bind(this);
  }
  Signin(user, pass) {
    fetch('http://192.168.88.105:3000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: user,
        password: pass
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message === "success") {
          usersss = responseJson.user_name;
          avatarus = responseJson.avatar_u;
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
  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'red', borderWidth: 2 }}
          onChangeText={(user) => this.setState({ user })}
          placeholder={'nhap user'}
          value={this.state.user}
        />
        <TextInput
          style={{ height: 40, borderColor: 'green', borderWidth: 1 }}
          onChangeText={(pass) => this.setState({ pass })}
          placeholder={'nhap pass'}
          value={this.state.pass}
        />
        <Text />
        <Button title='Login' onPress={() => this.Signin(this.state.user, this.state.pass)} />
      </View>
    );
  }
}