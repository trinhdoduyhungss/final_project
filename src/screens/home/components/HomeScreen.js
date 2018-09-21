import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableWithoutFeedback, Alert, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import Header from "@common/Header";
import { keyofuser } from "@login/components/LoginScreen";
import { requestFriendApiData } from "@action/actions";
import { requestFriendPendingApiData } from "@action/actions";
import { requestFriendRejectApiData } from "@action/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { totalfriendactive } from '@apiConfig/apis'
import { totalfriendPending } from '@apiConfig/apis'
import { totalfriendReject } from '@apiConfig/apis'
export var nameofFriend;
export var cancle_fetch_data_friend_acitve;
var datainfoFriend;
var nameFriendinfo;
var listimagess
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openActive: true,
      openPending: false,
      openReject: false,
      openInfoFriend: false,
      openMoreInfo: true,
      openPhoto: false,
      colorActive: 'red',
      colorPending: 'gray',
      colorReject: 'gray',
      colorMoreInfo: 'orange',
      colorPhoto: 'gray'
    };
  };
  componentDidMount() {
    cancle_fetch_data_friend_acitve = false;
    this.props.requestFriendApiData();
    // this.props.requestFriendPendingApiData();
    console.log(this.props)
  }
  openViewActive() {
    cancle_fetch_data_friend_acitve = false;
    this.props.requestFriendApiData();
    console.log(this.props)
    this.setState({
      openActive: true,
      openReject: false,
      openPending: false,
      colorActive: 'red',
      colorReject: 'gray',
      colorPending: 'gray',
    })
  }
  openViewReject() {
    cancle_fetch_data_friend_acitve = true;
    this.props.requestFriendRejectApiData();
    console.log(this.props)
    this.setState({
      openActive: false,
      openReject: true,
      openPending: false,
      colorActive: 'gray',
      colorReject: 'orange',
      colorPending: 'gray',
    })
  }
  openViewPending() {
    cancle_fetch_data_friend_acitve = true;
    this.props.requestFriendPendingApiData();
    console.log(this.props)
    this.setState({
      openActive: false,
      openReject: false,
      openPending: true,
      colorActive: 'gray',
      colorReject: 'gray',
      colorPending: 'orange',
    })

  }
  openViewMoreInfoFriend(name) {
    datainfoFriend = []
    listimagess = []
    console.log(name)
    fetch('http://192.168.88.105:3000/api/getUsers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: name
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message === "successfully fetch data") {
          nameFriendinfo = name
          datainfoFriend = responseJson.data;
          listimagess = responseJson.listimage
          console.log(listimagess)
          this.setState({
            openInfoFriend: true
          })
        } else {
          Alert.alert(
            'Co loi khong mong muon da xay ra',
            'Vui long xem lai duong truyen mang',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false })
        }
      })
  }
  deleteFriendPending(keyofdelete) {
    console.log("test_cacle_again " + cancle_fetch_data_friend_acitve)
    try {
      fetch('http://192.168.88.105:3000/api/deleteFriendPending', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          user_key: keyofuser,
          key_friend_delete: keyofdelete
        }),
      })
      console.log(keyofdelete)
      Alert.alert(
        'Xoa loi moi thanh cong thanh cong',
        'Nhan OK de hoan tat',
        [
          { text: 'OK', onPress: () => this.openViewReject() },
        ],
        { cancelable: false })
    } catch (err) {
      console.log(err)
    }
  };
  acceptFriendPending(keyofdelete) {
    try {
      fetch('http://192.168.88.105:3000/api/acceptFriendPending', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          user_key: keyofuser,
          key_friend_delete: keyofdelete
        }),
      })
      console.log(keyofdelete)
      Alert.alert(
        'Da them ban thanh cong thanh cong',
        'Nhan OK de hoan tat',
        [
          { text: 'OK', onPress: () => this.openViewActive() },
        ],
        { cancelable: false })
    } catch (err) {
      console.log(err)
    }
  };
  render() {
    return (
      <View style={{ backgroundColor: '#202E3E' }}>
        {
          this.state.openInfoFriend == false ?
            <View style={{ flexDirection: 'column', backgroundColor: '#202E3E' }}>
              <View style={{ backgroundColor: '#202E3E' }}>
                <Header navigation={this.props.navigation} title='HOME' />
              </View>
              <View style={{ backgroundColor: '#fff', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
                <View style={{ height: 100, flexDirection: 'row' }}>
                  <TouchableWithoutFeedback onPress={() => this.openViewActive()}>
                    <View style={{ flexDirection: 'column', margin: 18, marginLeft: Dimensions.get('window').width / 10, marginRight: Dimensions.get('window').width / 10 }}>
                      <Text style={{ textAlign: 'center', fontSize: 20, color: this.state.colorActive }}>{totalfriendactive}</Text>
                      <Text style={{ textAlign: 'center', fontSize: 20, color: this.state.colorActive }}>ACTIVE</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.openViewReject()}>
                    <View style={{ flexDirection: 'column', margin: 18, marginLeft: Dimensions.get('window').width / 10, marginRight: Dimensions.get('window').width / 10 }}>
                      <Text style={{ textAlign: 'center', fontSize: 20, color: this.state.colorReject }}>{totalfriendReject}</Text>
                      <Text style={{ textAlign: 'center', fontSize: 20, color: this.state.colorReject }}>REJECT</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.openViewPending()}>
                    <View style={{ flexDirection: 'column', margin: 18, marginLeft: Dimensions.get('window').width / 10, marginRight: Dimensions.get('window').width / 10 }}>
                      <Text style={{ marginLeft: 36, textAlign: 'left', fontSize: 20, color: this.state.colorPending }}>{totalfriendPending}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: this.state.colorPending }}>PENDING</Text>
                        {
                          totalfriendPending != 0 && totalfriendPending != null ?
                            <Text style={{ margin: 5, marginTop: 13, height: 6, width: 6, backgroundColor: 'orange', borderRadius: 25 }}></Text> :
                            <Text style={{ height: 0, width: 0 }}></Text>
                        }
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                {
                  this.state.openActive ?
                    <View style={{ height: Dimensions.get('window').height - 214, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                      <FlatList
                        data={this.props.data}
                        renderItem={({ item, index }) =>
                          <TouchableWithoutFeedback onPress={() => this.openViewMoreInfoFriend(item.name)}>
                            <Card style={{ backgroundColor: 'white', margin: 5, borderRadius: 0.5, borderWidth: 0.5, borderColor: 'gray', shadowColor: 'red', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2 }}>
                              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }} key={item.name}>
                                <Image source={{ uri: item.profile_image }} style={{ width: 100, height: 100, marginLeft: 5, marginRight: 5, marginTop: 25, marginBottom: 25 }} borderRadius={50} />
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                  <Text style={{ color: 'black', padding: 8, fontSize: 22 }}>{item.name}</Text>
                                  <Text style={styles.flat}>{item.job}</Text>
                                  <Text style={styles.flat}>{item.gender}</Text>
                                  <Text style={styles.flat}>{item.address}</Text>
                                </View>
                                {
                                  item.haveimage == true ?
                                    <View style={{ flexDirection: 'row', margin: 40, marginTop: 30, alignItems: 'center' }}>
                                      <Image source={require('@assets/images/attachments.png')} />
                                    </View> : <View></View>
                                }
                              </View>
                            </Card>
                          </TouchableWithoutFeedback>
                        }
                      >
                      </FlatList>
                    </View> : <View></View>
                }
                {
                  this.state.openReject ?
                    <View style={{ height: Dimensions.get('window').height - 214, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                      <FlatList
                        data={this.props.data}
                        renderItem={({ item, index }) =>
                          <Card style={{ backgroundColor: 'white', margin: 5, borderRadius: 0.5, borderWidth: 0.5, borderColor: 'gray', shadowColor: 'red', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2 }}>
                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }} key={item.name}>
                              <Image source={{ uri: item.profile_image }} style={{ width: 100, height: 100, marginLeft: 5, marginRight: 5, marginTop: 25, marginBottom: 25 }} borderRadius={50} />
                              <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'black', padding: 8, fontSize: 22 }}>{item.name}</Text>
                                <Text style={styles.flat}>{item.job}</Text>
                                <Text style={styles.flat}>{item.gender}</Text>
                                <Text style={styles.flat}>{item.address}</Text>
                              </View>
                            </View>
                          </Card>
                        }
                      >
                      </FlatList>
                    </View> : <View></View>
                }
                {
                  this.state.openPending ?
                    <View style={{ height: Dimensions.get('window').height - 216, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                      <FlatList
                        data={this.props.data}
                        renderItem={({ item, index }) =>
                          <TouchableWithoutFeedback onPress={() => this.openViewMoreInfoFriend(item.name)}>
                            <Card style={{ backgroundColor: 'white', margin: 5, borderRadius: 0.5, borderWidth: 0.5, borderColor: 'gray', shadowColor: 'red', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2 }}>
                              <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }} key={item.key_of_friend}>
                                <Image source={{ uri: item.profile_image }} style={{ width: 100, height: 100, marginLeft: 5, marginRight: 5, marginTop: 25, marginBottom: 25 }} borderRadius={50} />
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                  <Text style={{ color: 'black', padding: 8, fontSize: 22 }}>{item.name}</Text>
                                  <Text style={styles.flat}>{item.job}</Text>
                                  <Text style={styles.flat}>{item.gender}</Text>
                                  <Text style={styles.flat}>{item.address}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', margin: 40, marginTop: 30, alignItems: 'center' }}>
                                  <TouchableWithoutFeedback onPress={() => this.acceptFriendPending(item.key_of_friend)}>
                                    <View style={{ margin: 8, marginLeft: 30, marginRight: 50 }}>
                                      <Image source={require('@assets/images/oval5accept.png')} />
                                    </View>
                                  </TouchableWithoutFeedback>
                                  {console.log("testkeyagain  " + item.key_of_friend)}
                                  <TouchableWithoutFeedback onPress={() => this.deleteFriendPending(item.key_of_friend)}>
                                    <View style={{ margin: 8 }}>
                                      <Image source={require('@assets/images/oval5.png')} />
                                    </View>
                                  </TouchableWithoutFeedback>
                                </View>
                              </View>
                            </Card>
                          </TouchableWithoutFeedback>
                        }
                      >
                      </FlatList>
                    </View>
                    : <View></View>
                }
              </View>
            </View>
            : <View style={{ marginTop: 25, backgroundColor: '#fff', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
              <View style={{ height: Dimensions.get('window').height - 86, borderBottomColor: 'gray', borderBottomWidth: 0.5, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                  <View style={{ margin: 14, marginLeft: Dimensions.get('window').width - (Dimensions.get('window').width / 2 + 80), alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', fontWeight: 'bold' }}>{nameFriendinfo}</Text>
                  </View>
                  <View style={{ marginTop: 14, marginBottom: 14, marginRight: 14, marginLeft: Dimensions.get('window').width - (Dimensions.get('window').width / 2 + 88) }}>
                    <TouchableWithoutFeedback onPress={() => this.setState({ openInfoFriend: false })}>
                      <Image source={require('@assets/images/group2.png')} />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                {
                  datainfoFriend.map(item =>
                    <View style={{ flexDirection: 'column', margin: 0 }}>
                      <View style={{ margin: 0, alignItems: 'center' }}>
                        <ImageBackground source={{ uri: item.cover_image }} style={{ backgroundColor: 'white', opacity: 0.8, width: Dimensions.get('window').width, height: 244, marginLeft: 0, marginRight: 0, marginTop: 1, marginBottom: 1 }}>
                          <View style={{ flex: 1, margin: 0, alignItems: 'center', flexDirection: 'row', backgroundColor: 'white', opacity: 1 }}>
                            <View style={{ marginTop: 26, marginBottom: 26, marginLeft: 33, marginRight: 33, opacity: 1, borderRadius: 100, backgroundColor: 'white' }}>
                              <Image source={{ uri: item.profile_image }} style={{ width: 162, height: 162, marginLeft: 6, marginRight: 6, marginTop: 6, marginBottom: 6, borderRadius: 100 }} />
                            </View>
                            <View style={{ opacity: 1, marginLeft: 15, marginTop: 26, marginBottom: 26, flexDirection: 'column' }}>
                              <Text style={{ fontSize: 20 }}>NAME</Text>
                              <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 19 }}>{item.name}</Text>
                              {
                                item.frienddate == null ?
                                  <View>
                                    <Text style={{ fontSize: 20 }}>SEND DATE</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{item.senddate}</Text>
                                  </View>
                                  :
                                  <View>
                                    <Text style={{ fontSize: 20 }}>FRIEND DATE</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{item.frienddate}</Text>
                                  </View>
                              }
                            </View>
                          </View>
                        </ImageBackground >
                        <View style={{ width: Dimensions.get('window').width, height: 60, flexDirection: 'row', marginBottom: 1, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                          <TouchableWithoutFeedback onPress={() => this.setState({ openMoreInfo: true, openPhoto: false, colorMoreInfo: 'orange', colorPhoto: 'gray' })}>
                            <View style={{ margin: 18, marginLeft: 14, marginRight: 14, borderBottomColor: this.state.colorMoreInfo }}>
                              <Text style={{ textAlign: 'center', fontSize: 17, color: this.state.colorMoreInfo }}>MORE INFO</Text>
                            </View>
                          </TouchableWithoutFeedback>
                          {
                            item.haveimage == true ?
                              <TouchableWithoutFeedback onPress={() => this.setState({ openMoreInfo: false, openPhoto: true, colorMoreInfo: 'gray', colorPhoto: 'orange' })}>
                                <View style={{ margin: 18, marginLeft: 14, marginRight: 14, borderBottomColor: this.state.colorPhoto }}>
                                  <Text style={{ textAlign: 'center', fontSize: 17, color: this.state.colorPhoto }}>PHOTOS</Text>
                                </View>
                              </TouchableWithoutFeedback> : <View></View>
                          }
                        </View>
                        {
                          this.state.openMoreInfo == true ?
                            <View style={{ flex: 1, marginLeft: 14, marginTop: 4 }}>
                              <Text style={{ fontSize: 17, color: 'rgba(40, 41, 43, 0.8)' }}>DESCRIPTION</Text>
                              <Text style={{ flexWrap: 'wrap', fontSize: 17, color: 'rgb(67, 71, 76)' }}>{item.description}</Text>
                            </View>
                            :
                            <View style={{ flex: 1, marginTop: 4, alignItems: 'baseline' }}>
                              <View style={{ flex: 1, marginLeft: 4,  alignItems: 'baseline', flexWrap:'wrap' }}>
                                <FlatList
                                  numColumns={Dimensions.get('window').width / 100 - 1}
                                  data={listimagess}
                                  renderItem={({ item, index }) =>
                                  <TouchableWithoutFeedback onPress={() => Alert.alert(
                                    'Ban da nhan vao hinh anh : ' + item,
                                    'Nhan OK de hoan tat',
                                    [
                                      { text: 'OK', onPress: () => this.openViewActive() },
                                    ],
                                    { cancelable: false })}>
                                    <Image style={{ borderRadius: 25, height: 100, width: 100, margin: 14 }} source={{ uri: item }} />
                                  </TouchableWithoutFeedback>
                                  } />
                              </View>
                            </View>
                        }
                      </View>
                    </View>
                  )
                }
              </View>
            </View>

        }
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
    color: 'gray',
    padding: 6,
    fontSize: 14
  }
});
const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch => bindActionCreators({ requestFriendApiData, requestFriendPendingApiData, requestFriendRejectApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
