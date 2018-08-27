import React from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { usersss } from "@login/components/LoginScreen";
import Header from "@common/Header"
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datas: [] };
  }
  componentWillMount() {
    fetch('http://192.168.88.105:3000/api/getFriend', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: usersss
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          datas: responseJson.data
        })
        console.log(responseJson.data)
        console.log(this.state.datas)
      })
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{backgroundColor: '#202E3E'}}>
          <Header navigation={this.props.navigation} title='HOME' />          
        </View>
        <View style={{  backgroundColor: '#fff' }}>
          <FlatList
            data={this.state.datas}
            renderItem={({ item, index }) =>
              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: index % 2 == 0 ? 'mediumseagreen' : 'tomato' }} key={item.key}>
                <Image source={{ uri: item.avatar }} style={{ width: 100, height: 100, marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10 }} borderRadius={50} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <Text style={styles.flat}>{item.name}</Text>
                  <Text style={styles.flat}>{item.job}</Text>
                  <Text style={styles.flat}>{item.address}</Text>
                </View>
              </View>}
          >
          </FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 6,
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'left',
    margin: 6,
  },
  flat: {
    color: 'white',
    padding: 10,
    fontSize: 16
  }
});
