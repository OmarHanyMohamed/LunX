import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import FavouriteButton from '../components/FavouriteButton';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HeartButton from '../components/HeartButton';
import { add_to_fav } from '../actions/FavActions';
import { remove_from_fav } from '../actions/FavActions';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = { addedToFavourites: false, comment: '', text: '', clicked: false, comment_text: '', count: 1 };
    }

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        post = navigation.getParam('post', '')
    }

    componentDidMount() {
        this.setState({
            addedToFavourites: this.props.addedToFav
        })
    }

    post_comment = () => {

        if (this.state.text != '') {
            this.setState({ clicked: true, comment_text: this.state.text, count: this.state.count + 1 })
        }
    }

    //source={{ uri: post.avatar}}
    render() {
        const { addedToFavourites } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.communityItem}>
                        <TouchableOpacity style={styles.avatar}>
                            <Image source={require('../img/avatar.png')} style={styles.avatar} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View>
                                    <TouchableOpacity>
                                        <Text style={styles.name}>
                                            {post.name}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.timestamp}>
                                        {moment(post.timestamp).fromNow()}
                                    </Text>
                                </View>

                                <TouchableOpacity>
                                    <Icon name='ios-more' size={28} color='#73788B' />
                                </TouchableOpacity>
                            </View>


                            <Text style={styles.posts}>{post.text}</Text>
                            <Image source={{ uri: post.image }} style={styles.postImage} resizeMode='cover' />


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 0.12, flexDirection: 'row' }}>
                                    <HeartButton />
                                </View>

                                <View style={{ flex: 0.12, flexDirection: 'row' }}>
                                    <Octicons name='comment' size={25} color='#73788B' />
                                    <Text style={styles.commentCount}> {this.state.count} </Text>
                                </View>

                                <View style={{ flex: 0.3, alignItems: 'flex-end', marginRight: 10 }}>
                                    <FavouriteButton
                                        postData={post}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#ffffff', flexDirection: 'row' }}>
                        <View style={styles.commentBar}>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesome name='comments' size={22} color='#bababa' style={{ alignSelf: 'center', marginLeft: '3%', marginBottom: 2 }} />
                                <TextInput
                                    placeholder='  Write a Comment...'
                                    placeholderTextColor='grey'
                                    onChangeText={(text) => this.setState({ text: text }, () => console.log(this.state.text))}
                                    style={styles.comment}
                                />
                            </View>

                        </View>
                        <TouchableOpacity
                            onPress={this.post_comment}
                            style={{ alignSelf: 'center', marginLeft: '3%', marginTop: '3%' }}
                        >
                            <MaterialCommunityIcons name='send-circle-outline' color='#bababa' size={50} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.allComments}>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                            <Image source={require('../img/avatar.png')} style={[styles.avatar, { width: 40, height: 40, marginLeft: 5 }]} />
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <Text style={[styles.name, { fontSize: 13, fontWeight: '700' }]}>
                                        Mohamed Hany
                                    </Text>

                                    <Text style={[styles.timestamp, { marginRight: 10, fontSize: 11 }]}>
                                        {moment(post.timestamp).fromNow()}
                                    </Text>

                                </View>
                            </View>
                        </View>
                        <View style={{ marginLeft: '10%', justifyContent: 'center', height: 40, width: 250, backgroundColor: '#f0f0f5', borderRadius: 50 }}>
                            <Text style={styles.commentText}>Great Work my friend..</Text>
                        </View>
                        {
                            this.state.clicked ?
                                <View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>

                                        <Image source={require('../img/avatar.png')} style={[styles.avatar, { width: 40, height: 40, marginLeft: 5 }]} />
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                                <Text style={[styles.name, { fontSize: 13, fontWeight: '700' }]}>
                                                    {post.name}
                                                </Text>

                                                <Text style={[styles.timestamp, { marginRight: 10, fontSize: 11 }]}>
                                                    {moment(post.timestamp).fromNow()}
                                                </Text>

                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: '10%', justifyContent: 'center', height: 40, width: 250, backgroundColor: '#f0f0f5', borderRadius: 50 }}>
                                        <Text style={styles.commentText}>{this.state.comment_text}</Text>
                                    </View>
                                </View>
                                :
                                null

                        }

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        addedToFav: state.fav.addedToFav
    }
}

export default connect(mapStateToProps, { add_to_fav, remove_from_fav })(Post);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    communityItem: {
        marginTop: '3%',
        backgroundColor: '#FFF',
        flex: 1,
        padding: 10,
        borderRadius: 3,
        flexDirection: 'row',
        borderBottomWidth: 0.4,
        borderBottomColor: '#e6e6ea',
    },

    avatar: {
        width: 70,
        height: 70,
        borderRadius: 18,
        marginRight: 16
    },

    name: {
        fontSize: 17,
        fontWeight: '500',
        color: '#454D65'
    },

    timestamp: {
        fontSize: 13,
        color: '#C4C6CE',
        marginTop: 4
    },
    post: {
        marginTop: 30,
        fontSize: 14,
        color: '#838899'
    },
    postImage: {
        width: undefined,
        height: 350,
        borderRadius: 5,
        marginVertical: 20
    },
    commentCount: {
        marginLeft: 5,
        color: '#73788B'
    },
    commentBar: {
        width: 155 * 2,
        height: 35,
        marginTop: '5%',
        backgroundColor: '#e6e6ea',
        borderRadius: 30,
        marginLeft: '7%'
    },
    comment: {
        width: 100 * 2,
        height: 40,
    },
    allComments: {
        marginTop: '5%',
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopWidth: 0.4,
        borderTopColor: '#e6e6ea',
        justifyContent: 'center'
    },
    commentText: {
        fontSize: 12,
        marginLeft: '10%',
        textAlign: 'left',
        fontWeight: 'bold',
        
    }
})