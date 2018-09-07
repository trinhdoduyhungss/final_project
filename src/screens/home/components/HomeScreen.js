import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';
import { Card } from 'react-native-elements'
import Header from "@common/Header"
import { requestFriendApiData } from "@action/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.requestFriendApiData();
    console.log(this.props)
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#202E3E' }}>
        <View style={{ backgroundColor: '#202E3E' }}>
          <Header navigation={this.props.navigation} title='HOME' />
        </View>
        <View style={{ backgroundColor: '#fff', borderTopStartRadius: 10, borderTopEndRadius: 10 }}>
          <View style={{ height: 100, flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column', margin: 18 }}>
              <Text style={{ textAlign: 'center', fontSize: 18 }}>26</Text>
              <Text style={{ textAlign: 'center', fontSize: 12 }}>ACTIVE</Text>
            </View>
          </View>
          <View style={{height: Dimensions.get('window').height - 214, borderBottomColor: 'gray' , borderBottomWidth: 0.5}}>
            <FlatList
              data={this.props.data}
              renderItem={({ item, index }) =>
              <Card style={{backgroundColor: 'white', margin: 5, borderRadius: 0.5, borderWidth: 0.5, borderColor: 'gray', shadowColor: 'red', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2,}}>
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }} key={item.key}>
                  <Image source={{ uri: item.avatar }} style={{ width: 100, height: 100, marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10 }} borderRadius={50} />
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={styles.flat}>{item.name}</Text>
                    <Text style={styles.flat}>{item.job}</Text>
                    <Text style={styles.flat}>{item.address}</Text>
                  </View>
                </View>
              </Card>
              }
            >
            </FlatList>
          </View>
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
    color: 'black',
    padding: 10,
    fontSize: 16
  }
});
const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch => bindActionCreators({ requestFriendApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
