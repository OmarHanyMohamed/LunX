import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Share } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { remove_from_fav } from '../actions/FavActions';
import { connect } from 'react-redux';

class FavouriteScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isloading: true,
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.setState({
            dataSource: this.props.data,
            isloading: false
        })
    }

    onShare = async (msg) => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            },
                {
                    excludedActivityTypes: [
                        "com.apple.UIKit.activity.PostToFacebook",
                        "com.apple.UIKit.activity.PostToTwitter",
                        "com.apple.UIKit.activity.PostToWeibo",
                        'com.apple.UIKit.activity.Print',
                        'com.apple.UIKit.activity.AirDrop',
                        "com.apple.UIKit.activity.Print",
                        "com.apple.UIKit.activity.CopyToPasteboard",
                        "com.apple.UIKit.activity.AssignToContact",
                        "com.apple.UIKit.activity.SaveToCameraRoll",
                        "com.apple.UIKit.activity.AddToReadingList",
                        "com.apple.UIKit.activity.PostToFlickr",
                        "com.apple.UIKit.activity.PostToVimeo",
                        "com.apple.UIKit.activity.PostToTencentWeibo",
                        "com.apple.UIKit.activity.AirDrop",
                        "com.apple.UIKit.activity.OpenInIBooks",
                        "com.apple.UIKit.activity.MarkupAsPDF",
                        "com.apple.reminders.RemindersEditorExtension", //Reminders
                        "com.apple.mobilenotes.SharingExtension", // Notes
                        "com.apple.mobileslideshow.StreamShareService", // iCloud Photo Sharing - This also does nothing :{
                        // Not supported
                        "com.linkedin.LinkedIn.ShareExtension", //LinkedIn
                        "pinterest.ShareExtension", //Pinterest
                        "com.google.GooglePlus.ShareExtension", //Google +
                        "com.tumblr.tumblr.Share-With-Tumblr", //Tumblr
                        "wefwef.YammerShare", //Yammer
                        "com.hootsuite.hootsuite.HootsuiteShareExt", //HootSuite
                        "net.naan.TwitterFonPro.ShareExtension-Pro", //Echofon
                        "com.hootsuite.hootsuite.HootsuiteShareExt", //HootSuite
                    ]
                });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    console.log(result.activityType)
                } else {
                    // shared
                    console.log('Shared but dont know how')
                }
            }
            else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log('dismissed')
            }
        } catch (error) {
            alert(error.message);
        }
    };

    renderPost = post => {
        var message = post.text;
        return (
            <View style={styles.communityItem}>
                <TouchableOpacity>
                    <Image source={require('../img/avatar.png')} style={styles.avatar} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.name}>
                                {post.name}
                            </Text>
                            <Text style={styles.timestamp}>
                                {moment(post.timestamp).fromNow()}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={this.onShare}>
                            <Feather name='share-2' size={23} color='#73788B' style={{ marginBottom: 15, marginRight: 10 }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Post', {
                        post: post
                    })}>
                        <Text style={styles.posts}>{post.text}</Text>
                        <Image source={{ uri: post.image }} style={styles.postImage} resizeMode='cover' />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>

                    </View>
                </View>

            </View>

        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backIcon}>
                        <Ionicons name='ios-arrow-back' size={35} color='#525750' />
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <Text style={styles.favText}>Favourites</Text>
                </View>
                <View style={styles.body}>
                    <FlatList
                        style={styles.favBody}
                        data={this.state.dataSource}
                        renderItem={({ item }) => this.renderPost(item)}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        refreshing={this.state.isloading}
                        onRefresh={this.getData}
                        scrollEventThrottle={16}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 120 }}>
                                <Text style={styles.emptyText}>
                                    You have no favourites Yet
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.fav.data
    }
}

export default connect(mapStateToProps, { remove_from_fav })(FavouriteScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#EFECF4'
    },
    titleBar: {
        flex: 0.075,
        backgroundColor: '#ffffff',
        zIndex: 1000
    },
    backIcon: {
        marginTop: 24,
        marginHorizontal: 16,
        height: 50,
        width: 50,
        zIndex: 1000
    },
    header: {
        flex: 0.1,
        //justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: 'grey',
        backgroundColor: '#ffffff'
    },
    favText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#525750'
    },
    body: {
        flex: 1
    },
    favBody: {
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
    emptyText: {
        color: '#73788B'
    }
})