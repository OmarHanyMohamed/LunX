import React, { Component } from 'react';
import { Text, Image, ImageBackground } from 'react-native'
import { Container, List, ListItem, Left, Body } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Sidebar extends Component {
    render() {
        return (
            <Container style={{
                backgroundColor: 'white',
                zIndex: 1000
            }}>
                <List>
                    <ListItem itemDivider style={{ height: 150, backgroundColor: '#189ad3', justifyContent: 'flex-start', borderBottomWidth: 0.2 }}>
                        <ImageBackground source={require('../img/a.jpg')} style={{
                            width: '104.5%',
                            height: 150,
                            resizeMode: 'cover',
                            marginHorizontal: -15,
                            zIndex: -1000,
                            justifyContent: 'center',
                        }}>
                            <Image source={require('../img/lung2.png')} style={{ height: 60, width: 60, alignSelf: 'center' }} />
                            <Text style={{ fontSize: 20, fontWeight: '500',  alignSelf: 'center' }}> LunX </Text>
                        </ImageBackground>
                    </ListItem>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MedicalHistory')}>
                        <ListItem>
                            <Left style={{ flex: 0.25 }}>
                                <Image source={require('../img/hist.png')} style={{ marginLeft: 8, height: 40, width: 40 }} />
                            </Left>

                            <Body>
                                <Text>Medical History</Text>
                            </Body>
                        </ListItem>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FavouriteScreen')}>
                        <ListItem>
                            <Left style={{ flex: 0.25 }}>
                                <Image source={require('../img/fav.png')} style={{ marginLeft: 13, height: 30, width: 30 }} />
                            </Left>

                            <Body style={{}}>
                                <Text>Favourites</Text>
                            </Body>
                        </ListItem>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log('Website')}>
                        <ListItem>
                            <Left style={{ flex: 0.25 }}>
                                <Image source={require('../img/help.png')} style={{ marginLeft: 8, height: 40, width: 40 }} />
                            </Left>

                            <Body style={{}}>
                                <Text> help center</Text>
                            </Body>
                        </ListItem>
                    </TouchableOpacity>
                </List>

            </Container>
        )
    }
}