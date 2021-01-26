import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, StatusBar, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class VisitorProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSource: null
        }
    }

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        avatar = navigation.getParam('avatar', '')
        name = navigation.getParam('name', '')
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor='#189ad3'></StatusBar>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.titleBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 30 }}>
                            <Ionicons name='ios-arrow-back' size={35} color='#525750' />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 0.1, alignItems: 'flex-end' }}>
                            <Ionicons name='md-more' size={35} color='#525750' />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                        <View style={styles.profileImage}>
                            {
                                this.state.imageSource ?
                                    <Image source={{ uri: this.state.imageSource }} style={styles.image} resizeMode='center' />
                                    :
                                    <Image source={require('../img/avatar.png')} style={styles.image} resizeMode='center' />
                            }
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { fontWeight: '200', fontSize: 15 }]}>{name}</Text>
                        <Text style={[styles.text, { color: '#AEB5BC', fontSize: 14, marginTop: 10 }]}>Bio</Text>
                        <View style={styles.bio}>
                            <Ionicons name='logo-twitter' size={22} color='#00ACEE' style={{}} />
                            <Text style={styles.bioText}>
                                {' '}
                                @OmarHanyyy
                            </Text>
                        </View>
                        <View style={[styles.bio, { marginTop: '2%' }]}>
                            <Ionicons name='logo-facebook' size={22} color='#3B5998' style={{}} />
                            <Text style={styles.bioText}>
                                {'  '}
                                @OmarHanyyy
                            </Text>
                        </View>
                        <MaterialIcons name='person-pin' size={33} color='#189ad3' style={{ marginTop: '5%', }} />
                        <View style={styles.description}>
                            <Text style={[styles.bioText, { marginLeft: 10, marginRight: 10, marginTop: 15 }]}>
                                Hi, I had lung cancer for 2 years but now i'm fully recovered and decided to share my story....
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginHorizontal: 16
    },

    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },

    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden'
    },

    changeImage: {
        backgroundColor: '#189ad3',
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 50,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },

    infoContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    bio: {
        marginTop: '5%',
        flexDirection: 'row'
    },
    bioText: {
        color: 'grey'
    },
    description: {
        height: 100,
        width: 140 * 2,
        borderWidth: 1,
        borderColor: '#e6e6ea',
        borderRadius: 20
    }
})
