import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const serverUrl = 'http://127.0.0.1:5000/';
const http = axios.create({
    baseURL: serverUrl,
});


export default class DetectionScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            imageSource: null,
            imageData: null,
            isPhoto: false,
            diagnose: '',
            info: '',
            data: [],
            img: null,
            loading: false
        }
    }

    selectImage = async () => {
        ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
            console.log('Response = ', response);

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
                    imageData: response.data,
                    isPhoto: true
                });
            }
        });
    }

    upload = () => {
        let photo = { uri: this.state.imageSource }
        let formdata = new FormData();
        this.setState({ loading: true })
        formdata.append("file", { uri: photo.uri, name: 'image.jpg', type: 'image/jpeg' })

        fetch('http://192.168.43.191:5000/upload', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        }).then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                this.setState({
                    data: responseJson.data,
                    diagnose: 'Diagnose: ',
                    info: 'More info',
                    loading: false
                }, () => console.log(this.state.data))
                fetch("https://secure-anchorage-88351.herokuapp.com/diagnosis", {
                    method: "post",
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: responseJson.data,
                        image: this.state.imageSource
                    })
                })
                    .then(res => res.json())
                    .catch(error => console.log(error))

                console.log(responseJson);

            })
            //If response is not in json then in error
            .catch((error) => {
                //Error 
                console.error(error);
            });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Ionicons name='ios-arrow-back' size={35} color='#73788B' />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    {
                        this.state.isPhoto ?

                            this.state.imageSource && <Image source={{ uri: this.state.imageSource }} style={{ width: '100%', height: 430, resizeMode: 'contain' }} />

                            :
                            <Text style={{ fontSize: 15, fontWeight: '500', color: '#73788B', alignSelf: 'center' }}>
                                Upload a CT-Scan Image
                            </Text>
                    }
                </View>
                <View style={{ flex: 0.2, alignItems: 'center' }}>
                    {
                        this.state.loading ?


                            <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center' }}>
                                <ActivityIndicator size={'large'} color='#189ad3' />
                            </View>

                            :
                            <View >
                                {
                                    this.state.data != [] ?
                                        <View>
                                            <Text style={{ color: '#73788B', fontWeight: 'bold', fontSize: 18 }}>
                                                {this.state.diagnose}
                                                {
                                                    <Text style={{ color: 'black' }}>
                                                        {this.state.data}
                                                        {'\n'}
                                                    </Text>
                                                }

                                            </Text>
                                        </View>
                                        :
                                        <Text>

                                        </Text>
                                }
                                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('InfoScreen', {
                                    photo: this.state.imageSource,
                                    data: this.state.data
                                })}>

                                    <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: '500', textDecorationLine: 'underline' }}>
                                        {this.state.info}
                                    </Text>

                                </TouchableOpacity>

                            </View>
                    }
                </View>

                <View style={styles.fixToText}>
                    <TouchableOpacity onPress={this.selectImage}>
                        <View style={styles.choosePhoto}>
                            <Text style={styles.choosePhotoText}>
                                Select Image
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.upload}>
                        <View style={[styles.choosePhoto, { backgroundColor: '#3FE0D0' }]}>
                            <Text style={styles.choosePhotoText}>
                                Diagnose
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    titleBar: {
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginHorizontal: 16
    },
    fixToText: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    choosePhoto: {
        height: 50,
        width: 150,
        backgroundColor: '#189ad3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    choosePhotoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    }
}
);