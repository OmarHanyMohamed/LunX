import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, StatusBar, ImageBackground, Dimensions, LayoutAnimation, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

var { height, width } = Dimensions.get('window');

export default class LoginScreen extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        errorMessage: null,
        check_textInputChange: false,
        email_textInputChange: false,
        secureTextEntry: true,
    }

    secureTextEntry() {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        })
    }

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.upper}>
                    <View style={styles.greetings}>
                        <Text style={styles.greetingMessage}>
                            Sign Up {"&"} start using LunX
                        </Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <ImageBackground source={require('../img/a.jpg')} style={{ flex: 1, resizeMode: 'cover' }}>
                        <View style={styles.loginForm}>
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('../img/lunx_logo.png')} style={{ height: 60, width: 60 }} />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>Sign Up</Text>
                            </View>
                            <View style={styles.errorMessage}>
                                {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                            </View>
                            <View style={styles.form}>
                                <Text style={styles.text_footer}>Full Name</Text>
                                <View style={styles.action}>
                                    <FontAwesome
                                        name='user-o'
                                        color='#189ad3'
                                        size={20}
                                        style={{ marginTop: 10 }}
                                    />
                                    <TextInput
                                        placeholder='Your Full Name'
                                        style={styles.textInput}
                                        onChangeText={name => this.setState({ name })}
                                        value={this.state.name}
                                        autoCapitalize='none'
                                    />
                                </View>
                                <Text style={styles.text_footer}>Email-Address</Text>
                                <View style={styles.action}>
                                    <MaterialCommunityIcons
                                        name='email-outline'
                                        color='#189ad3'
                                        size={20}
                                        style={{ marginTop: 10 }}
                                    />
                                    <TextInput
                                        placeholder='Your Email'
                                        style={styles.textInput}
                                        onChangeText={email => this.setState({ email })}
                                        value={this.state.email}
                                        autoCapitalize='none'
                                    />
                                </View>
                                <Text style={styles.text_footer}>Password</Text>
                                <View style={styles.action}>
                                    <MaterialCommunityIcons
                                        name='lock-outline'
                                        color='#189ad3'
                                        size={23}
                                        style={{ marginTop: 7 }}
                                    />
                                    {this.state.secureTextEntry ?
                                        <TextInput
                                            placeholder='Your Password...'
                                            autoCapitalize='none'
                                            secureTextEntry={true}
                                            style={styles.textInput}
                                            onChangeText={password => this.setState({ password })}
                                            value={this.state.password}
                                        />
                                        :
                                        <TextInput
                                            placeholder='Your Password...'
                                            style={styles.textInput}
                                            onChangeText={password => this.setState({ password })}
                                            value={this.state.password}
                                        />
                                    }
                                    <TouchableOpacity onPress={() => this.secureTextEntry()}>
                                        {this.state.secureTextEntry ?
                                            <Feather
                                                name='eye-off'
                                                color='gray'
                                                size={20}
                                                style={{ marginTop: 10 }}
                                            />
                                            :
                                            <Feather
                                                name='eye'
                                                color='gray'
                                                size={20}
                                            />
                                        }

                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 12, color: 'grey' }}>
                                        Already have an account?
                                        {'  '}
                                    </Text>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 13 }}>
                                            Login
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 0.2 }}>
                                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                                    <Text style={{ alignSelf: 'center', fontWeight: '500', fontSize: 17, color: '#ffffff' }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    upper: {
        flex: 1,
        backgroundColor: '#189ad3'
    },
    greetings: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
    },
    greetingMessage: {
        fontSize: 25,
        fontWeight: '500',
        color: '#ffffff'
    },
    bottom: {
        flex: 1,
    },
    loginForm: {
        flex: 0.7,
        alignSelf: 'center',
        width: '90%',
        height: 500,
        zIndex: 1000,
        backgroundColor: '#fff',
        marginVertical: '-65%',
        borderRadius: 30,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderWidth: 0.2,
        borderColor: '#e6e6ea',
        elevation: 1,
    },
    form: {
        flex: 0.8,
        marginLeft: '5%'
    },
    text_footer: {
        color: '#189ad3',
        fontSize: 18,
        marginTop: 10
    },
    action: {
        flexDirection: 'row',
        marginRight: 20,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: 'grey'
    },
    button: {
        height: 50,
        width: 300,
        backgroundColor: '#189ad3',
        borderRadius: 30,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    errorMessage: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
});