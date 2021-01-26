import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class NotificationScreen extends Component {
    render() {
        return (
            <View>
                <Text>Notification Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})