import React, { Component } from 'react';
import { Animated, View, TextInput, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default class HeaderHome extends Component {

    render() {

        return (
            <Animated.View style={styles.topHeader}>
                <StatusBar barStyle='light-content' backgroundColor='#189ad3'></StatusBar>
                <View style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
                    <TouchableOpacity onPress={() => this.props.openDrawer()}>
                        <Ionicons name='ios-menu' size={30} color='#73788B' />
                    </TouchableOpacity>
                </View>

                <View style={{ alignSelf: 'flex-end', marginRight: 20, marginVertical: -30 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PostScreen')}>
                        <Text style={{ fontSize: 18, color: '#73788B', fontWeight: '600' }}>Post</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitle}>Community</Text>

                <View style={styles.searcBar}>
                    <View style={{ flexDirection: 'row' }}>
                        <EvilIcons name='search' size={25} color='grey' style={{ alignSelf: 'center', marginLeft: '2%', marginBottom: 2 }} />
                        <TextInput
                            placeholder=' Search for a topic'
                            placeholderTextColor='grey'
                            onChangeText={(text) => this.props.updateSearch(text)}
                            style={styles.search}
                        />
                    </View>
                </View>

            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    topHeader: {
        height:
            this.props !== undefined
                &&
                this.props.changingHeight !== undefined
                ? this.props.changingHeight : 120,

        paddingTop: 3,
        paddingBottom: 16,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EBECF4',
        shadowColor: '#454D65',
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10,
    },
    searcBar: {
        width: 180 * 2,
        height: 35,
        marginTop: '5%',
        backgroundColor: '#e6e6ea',
        borderRadius: 50,
    },
    search: {
        width: 160 * 2,
        height: 40,
    },
    headerTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold', 
    },
})