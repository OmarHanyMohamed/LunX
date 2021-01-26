import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Fire from '../../Fire';
import { connect } from 'react-redux';

const firebase = require('firebase');
require('firebase/firestore');

class PostScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            timeStamp: 1581953603500,
            imageSource: null,
            imagePath: null,
            avatar: null,
            name: ''
        }
    }

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });
        this.setState({
            avatar: this.props.photo,
            name: displayName
        }, () => console.log(this.state.name))
    }

    upload_post = () => {
        if (this.state.avatar == null) {
            this.setState({
                avatar: '../img/avatar.png'
            })
        }
        fetch("https://secure-anchorage-88351.herokuapp.com/posts", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                avatar: this.state.avatar,
                timeStamp: this.state.timeStamp,
                text: this.state.text,
                image: this.state.imageSource
            })
        })
            .then(res => res.json())
            .then(this.props.navigation.goBack())
            .catch(error => console.log(error))
    }

    selectImage = async () => {
        ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    imageSource: response.uri,
                    imagePath: response.path
                });
            }
        });
    }

    handlePost = () => {
        Fire.shared.addPost({ text: this.state.text.trim(), localUri: this.state.imageSource })
            .then(ref => {
                this.setState({ text: '', imageSource: null });
                this.props.navigation.goBack();
            })
            .catch(error => {
                alert(error);
            });
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name='ios-arrow-back' size={35} color='#73788B' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.upload_post}>
                        <Text style={{ fontWeight: '500', fontSize: 18, color: '#73788B' }}>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image
                        source={require('../img/avatar.png')}
                        style={styles.avatar}
                    ></Image>
                    
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder='Share Your Story'
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>
                <TouchableOpacity style={styles.photo}>
                    <Icon name='md-camera' size={32} color='#D8D9DB' onPress={this.selectImage} />
                </TouchableOpacity>

                <View style={{ marginHorizontal: 32, marginTop: 32, height: 300 }}>
                    <Image source={{ uri: this.state.imageSource }} style={{ width: '100%', height: '100%' }} />
                </View>

            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.auth.name,
        photo: state.auth.photo
    }
}


export default connect(mapStateToProps)(PostScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D8D9DB'
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginHorizontal: 16
    },

})