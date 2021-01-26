import React, { Component } from 'react';
import { Animated, Image, View, TextInput, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HeaderHome extends Component {
    render() {
        return (
            <View style={{ height: 300, width: 300, marginLeft: 20, borderWidth: 0.5 }}>
                
                <View style={{ flex: 2 }}>
                    <Image
                        source={this.props.imageUri}
                        style={styles.viewImage}
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover' 
    }
})