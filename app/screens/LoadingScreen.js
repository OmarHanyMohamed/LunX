import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar, Image } from 'react-native';
import * as firebase from 'firebase';

export default class LoadingScreen extends Component {

    static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' backgroundColor='#189ad3'></StatusBar>
                <View style={{ flex: 1, backgroundColor: '#189ad3' }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            source={require('../img/lung.png')}
                            style={{ height: 160, width: 160 }}
                        />
    
        
                    </View>
                </View>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

/*
<Text style={{
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
}}>
    LunX
</Text>
*/