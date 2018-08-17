import React from 'react'
import {View, TouchableWithoutFeedback, Text, StyleSheet} from 'react-native'
import SearchInput from './SearchInput'

const Header = (props) => {
    return(
        <View style={styles.header}>
            <SearchInput />
            <TouchableWithoutFeedback onPress={props.onPressClose}>
              <View>
                <Text style={styles.closeBtn}>Đóng</Text>
              </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: '#02737B',
        paddingTop: 30,
        paddingHorizontal: 20,
        paddingBottom:10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    closeBtn: {
        color: '#fff',
        fontSize: 16,
        paddingLeft : 20,
        textAlign:'center'
    }
})

export default Header