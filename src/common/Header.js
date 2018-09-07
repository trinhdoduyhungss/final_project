import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import hamburgerBtn from '@assets/images/hamburger.png';
import SearchInput from '@common/SearchInput'
const Header = (props) => {
    return (
            <View style={styles.wrapHeader} >
                <View style={{flexDirection: 'row', alignItems: 'center',   justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                    <View style={styles.drawerBtn}>
                        <Image source={hamburgerBtn} style={styles.imageLogo} />
                    </View>
                </TouchableOpacity>
                <View style={{ flex:1,alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={styles.titleText}>{props.title}</Text>
                    <View style={{ alignItems: 'center'}}></View>
                </View>
                </View>
                <View style={{  margin: 5}}>
                    <SearchInput />
                    <View style={{alignItems: 'center'}}></View>
                </View>

            </View>
    )
}

export default Header

const styles = StyleSheet.create({
    wrapHeader: {
        backgroundColor: '#202E3E',
        height: Platform.OS === 'android' ? 96 : 110,
        marginTop: Platform.OS === 'ios' ? 0 : 24,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        //flexWrap: 'wrap'
    },
    drawerBtn: {
        paddingLeft: 20
    },
    titleText: {
        color: '#fff',
        fontSize: 17,
        alignItems:'center',
        flex:1,
        paddingLeft: 206
    }
})