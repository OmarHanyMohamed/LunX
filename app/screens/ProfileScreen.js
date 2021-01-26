import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, LayoutAnimation, SafeAreaView, Image, StatusBar, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { user_data } from '../actions/ProfileActions';
import Row from './Row';
import ImagePicker from 'react-native-image-picker';

class ProfileScreen extends Component {

    state = {
        email: '',
        displayName: '',
        imageSource: null,
        expanded: false,
        text: '',
        age: '',
        gender: '',
        chronic: '',
        allergy: '',
        smoker: '',
        history: '',
        showMe: false
    }

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });
    };

    UNSAFE_componentWillMount() {
        this.flip = this.flip.bind(this);
    }

    flip() {
        this.setState({
            expanded: !this.state.expanded,
        });
        this.props.user_data(this.state.text)
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
                });
            }
        });
    }

    signOutUser = () => {
        firebase.auth().signOut();
    };

    renderFrontface() {
        return (
            <Frontface />
        );
    }

    renderBackface() {
        /**
         * You can nest <FoldView>s here to achieve the folding effect shown in the GIF above.
         * A reference implementation can be found in examples/Simple.
         */
        return (
            <Backface />
        );
    }

    addBio = (bio) => {
        this.setState({
            text: bio
        }, console.log(this.state.text))
    }

    update = () => {
        this.props.user_data(this.state.text, this.state.age, this.state.gender, this.state.chronic, this.state.allergy, this.state.smoker, this.state.history)
        console.log(this.props.age)
        console.log(this.props.gender)
        this.setState({
            showMe: true
        })
        setInterval(() => {
            this.setState({
                showMe: false
            })
        }, 2000)
    }

    render() {

        LayoutAnimation.easeInEaseOut();
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor='#189ad3'></StatusBar>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.titleBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <Ionicons name='ios-arrow-back' size={35} color='#73788B' />
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={this.signOutUser} >
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#73788B' }}>Logout</Text>
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
                        <View style={styles.changeImage}>
                            <TouchableOpacity onPress={this.selectImage}>
                                <MaterialIcons name='add-a-photo' size={25} color='#ffffff' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { fontWeight: '200', fontSize: 15 }]}>{this.state.displayName}</Text>


                        <MaterialIcons name='person-pin' size={33} color='#189ad3' style={{ marginTop: '1%', }} />
                        <View style={styles.description}>

                            <TextInput
                                autoFocus={false}
                                multiline={true}
                                numberOfLines={3}
                                style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}
                                placeholder='Add a bio.. '
                                onChangeText={text => this.addBio(text)}
                                value={this.state.text}
                            ></TextInput>
                        </View>
                    </View>
                    <View style={styles.report}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.medicalReport}>
                                Your Information
                            </Text>
                        </View>
                        <Text style={{ fontSize: 11, marginTop: 15, marginLeft: '5%', color: 'grey' }}>
                            *these information can help us in your diagnose
                        </Text>
                        <View style={styles.inputs}>
                            <Text style={styles.titleText}>Age:</Text>
                            <TextInput
                                placeholder='Enter your age'
                                placeholderTextColor='grey'
                                style={styles.inputText}
                                onChangeText={(data) => this.setState({ age: data })}
                                editable={this.props.editable}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <Text style={styles.titleText}>Gender:</Text>
                            <TextInput
                                placeholder='Male - Female'
                                placeholderTextColor='grey'
                                style={styles.inputText}
                                onChangeText={(data) => this.setState({ gender: data })}
                                editable={this.props.editable}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <Text style={styles.titleText}>Chronic diseases:</Text>
                            <TextInput
                                placeholder='have any chronic disease'
                                placeholderTextColor='grey'
                                style={styles.inputText}
                                onChangeText={(data) => this.setState({ chronic: data })}
                                editable={this.props.editable}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <Text style={styles.titleText}>Allergic to:</Text>
                            <TextInput
                                placeholder='ex: Food Allergy, Pollen Allergy, etc..'
                                placeholderTextColor='grey'
                                style={styles.inputText}
                                onChangeText={(data) => this.setState({ allergy: data })}
                                editable={this.props.editable}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <Text style={styles.titleText}>Smoker:</Text>
                            <TextInput
                                placeholder='Yes or No'
                                placeholderTextColor='grey'
                                style={styles.inputText}
                                onChangeText={(data) => this.setState({ smoker: data })}
                                editable={this.props.editable}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <Text style={styles.titleText}>history of lung cancer:</Text>
                            <TextInput
                                placeholder='Yes or No'
                                placeholderTextColor='grey'
                                style={styles.inputText}
                                onChangeText={(data) => this.setState({ history: data })}
                                editable={this.props.editable}
                            />
                        </View>
                        {
                            this.state.showMe ?
                                <ActivityIndicator size='large' color='#189ad3' style={{ alignSelf: 'center', marginTop: 30 }} />
                                :
                                <TouchableOpacity
                                    onPress={this.update}
                                    style={{ height: 40, width: '90%', borderRadius: 5, backgroundColor: '#189ad3', marginTop: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                    <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 17 }}>
                                        Save
                                    </Text>
                                </TouchableOpacity>
                        }

                    </View>
                    <View style={styles.report}>
                        <View style={{ flex: 0.2 }}>
                            <Text style={styles.medicalReport}>Medical Reports</Text>
                        </View>
                        <View style={{ flex: 1, marginTop: '3%' }}>
                            <Row zIndex={100} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}


const mapStateToProps = state => {
    return {
        age: state.profile.age,
        gender: state.profile.gender
    }
}

export default connect(mapStateToProps, { user_data })(ProfileScreen);

const styles = StyleSheet.create({
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
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 16,
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
    },
    report: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#e6e6ea'
    },
    medicalReport: {
        marginTop: 15,
        marginLeft: '7%',
        fontSize: 20,
        fontWeight: '700',
        color: 'grey',
        textDecorationLine: 'underline'
    },
    inputs: {
        marginTop: 40,
        flex: 0.5,
        flexDirection: 'row',
    },
    inputText: {
        marginLeft: '8%',
        flex: 0.9,
        borderRadius: 20,
        height: 40,
        marginTop: '-1%'
    },
    titleText: {
        marginLeft: '10%',
        flex: 0.2,
        marginTop: '-0.5%',
        fontSize: 16,
        fontWeight: '500',
        color: '#189ad3'
    }

});