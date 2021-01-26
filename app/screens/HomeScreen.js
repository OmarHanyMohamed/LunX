import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, TextInput, LayoutAnimation, FlatList, Image, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FavouriteButton from '../components/FavouriteButton';
import HeartButton from '../components/HeartButton';
import moment from 'moment';
import { Drawer } from 'native-base';
import HeaderHome from '../components/HeaderHome';
import Sidebar from '../components/Sidebar';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { add_profile_data } from '../actions/AuthActions';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addedToFavourites: false,
            dataSource: [],
            inMemoryPosts: [],
            isloading: true,
            likes: 0,
            email: '',
            displayName: '',
            imageSource: null,
            img: false
        };
        this.updateSearch = this.updateSearch.bind(this);
    }

    componentDidMount() {
        this.getData()
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });
        this.props.add_profile_data(displayName);
    }

    getData = () => {
        fetch("https://secure-anchorage-88351.herokuapp.com/getposts")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.reverse(),
                    inMemoryPlaces: responseJson,
                    isloading: false
                })
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({ isloading: true })
    }

    updateSearch = (text) => {
        const filteredPosts = this.state.inMemoryPlaces.filter(
            results => {
                let placesLowerCase = (results.text).toLowerCase()
                let searchTermLowerCase = text.toLowerCase()
                return placesLowerCase.indexOf(searchTermLowerCase) > -1
            }
        )
        this.setState({ dataSource: filteredPosts });
    }

    addToFav = () => {
        this.setState({
            addedToFavourites: !this.state.addedToFavourites
        })
    }

    renderPost = (post) => {
        return (
            <View style={styles.communityItem}>
                <TouchableOpacity style={styles.avatar} onPress={() => this.props.navigation.navigate('VisitorProfile', {
                    avatar: post.item.avatar,
                    name: post.item.name,
                })}>
                    {
                        this.state.img ?
                        <Image source={{ uri: this.props.photo}} style={styles.avatar} />
                        :
                        <Image source={require('../img/avatar.png')} style={styles.avatar} />
                    }
                    
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('VisitorProfile', {
                                avatar: this.props.photo,  //post.item.avatar
                                name: post.item.name,
                            })}>
                                <Text style={styles.name}>
                                    {post.item.name}
                                </Text>
                            </TouchableOpacity>
                            <Text style={styles.timestamp}>
                                {moment(post.timestamp).fromNow()}
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Icon name='ios-more' size={24} color='#73788B' />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', {
                        post: post.item
                    })}>
                        <Text style={styles.posts}>{post.item.text}</Text>
                        <Image source={{ uri: post.item.image }} style={styles.postImage} resizeMode='cover' />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.1 }}>
                            <HeartButton
                            />
                        </View>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', {
                            post: post.item
                        })}>
                            <Icon name='ios-chatboxes' size={24} color='#73788B' style={{ flex: 1, marginLeft: 15 }} />
                        </TouchableOpacity>

                        <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}>
                            <FavouriteButton
                                postData={post.item}
                            />
                        </View>

                    </View>
                </View>

            </View>

        )
    }

    closeDrawer = () => {
        this.drawer._root.close();
    };

    openDrawer = () => {
        this.drawer._root.open();
    };

    render() {

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={
                    <Sidebar
                        navigation={this.props.navigation}
                    />
                }
                onClose={() => this.closeDrawer()}
            >
                <View style={styles.container}>
                    <StatusBar barStyle='light-content' backgroundColor='#189ad3'></StatusBar>
                    <HeaderHome
                        openDrawer={this.openDrawer}
                        navigation={this.props.navigation}
                        updateSearch={this.updateSearch}
                    />

                    {this.state.isloading ? (
                        <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', marginTop: '50%' }}>
                            <ActivityIndicator size={'large'} color='#189ad3' />
                        </View>

                    ) :


                        <FlatList
                            style={styles.community}
                            data={this.state.dataSource}
                            renderItem={post => this.renderPost(post)}
                            keyExtractor={item => item._id}
                            refreshing={this.state.isloading}
                            onRefresh={this.getData}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}

                        />
                    }
                </View>
            </Drawer>
        )
    }

}

export default connect(null, { add_profile_data })(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#EFECF4'
    },

    community: {
        marginHorizontal: 16
    },

    communityItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },

    name: {
        fontSize: 15,
        fontWeight: '500',
        color: '#454D65'
    },

    timestamp: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899'
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    },

});