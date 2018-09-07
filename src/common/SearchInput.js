import React from 'react'
import { View, StyleSheet, Platform, StatusBar} from 'react-native'
import { SearchBar } from 'react-native-elements'
const SearchInput = (props) => (
  <View style={styles.wrapper}>
    <SearchBar
      icon={{ type: 'font-awesome', name: 'search' }}
      placeholder=''
      inputStyle={{width:515, height: StatusBar.currentHeight + 16, backgroundColor:'#fff', paddingLeft:28, paddingRight:3, borderRadius:5 }}
      containerStyle={{backgroundColor: 'transparent', borderBottomColor:'#202E3E', borderTopColor:'#202E3E'}}
    />
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    height: Platform.OS === 'android' ? 76 : 100,
    width: 535,
    flexDirection: 'row',
    backgroundColor: '#202E3E',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 4,
    paddingRight: 4,
    alignItems: 'center',
  }
})

export default SearchInput