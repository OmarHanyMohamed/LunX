import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import ProfileScreen from './screens/ProfileScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import Post from './screens/Post';
import VisitorProfile from './screens/VisitorProfile';
import HeaderHome from './components/HeaderHome';
import DetectionScreen from './screens/DetectionScreen';
import MedicalHistory from './screens/MedicalHistory';
import ReportScreen from './screens/ReportScreen';
import Row from './screens/Row';
import ExampleList from './screens/ExampleList';
import InfoScreen from './screens/InfoScreen';
import InfoCard from './components/InfoCard';

const AppContainer = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Home: {
                    screen: createStackNavigator({
                        HomeScreen: { screen: HomeScreen },
                        PostScreen: { screen: PostScreen },
                        MedicalHistory: { screen: MedicalHistory },
                        ReportScreen: { screen: ReportScreen },
                        FavouriteScreen: { screen: FavouriteScreen },
                        Post: { screen: Post },
                        VisitorProfile: { screen: VisitorProfile },
                        InfoScreen: { screen: InfoScreen },
                        ExampleList: { screen: ExampleList },
                        Row: { screen: Row },
                        InfoCard: { screen: InfoCard}
                    },
                        {
                            headerMode: 'none',
                            navigationOptions:
                                ({ navigation, screenProps }) => {
                                    return {
                                        header: <HeaderHome {...navigation} {...screenProps} />
                                    }
                                }
                        }),
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Octicons name='home' color={tintColor} size={30} />
                        ),
                        headerShown: false,
                    },

                },

                Detection: {
                    screen: DetectionScreen,
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Icon name='ios-add-circle' type='Ionicons' color={tintColor} size={55} />
                        ),
                        headerShown: false
                    }
                },

                Profile: {
                    screen: ProfileScreen,
                    headerMode: 'none',
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <FontAwesome name='user-o' color={tintColor} size={27} />
                        ),
                        headerShown: false
                    }
                }

            },
            {
                headerMode: 'none',
                initialRouteName: 'Home',
                navigationOptions: {
                    headerShown: false
                },

                defaultNavigationOptions: {
                    tabBarOnPress: ({ navigation, defaultHandler }) => {
                        if (navigation.state.key === 'Post') {
                            navigation.navigate('postModal')
                        } else {
                            defaultHandler()
                        }
                    }
                },

                tabBarOptions: {
                    activeTintColor: "#3FE0D0",
                    inactiveTintColor: "#189ad3",
                    showLabel: false,

                    style: {
                        height: 60,
                        backgroundColor: "white",
                        shadowOffset: { width: 5, height: 5 },
                        shadowColor: "grey",
                        shadowOpacity: 0.5,
                        elevation: 5,

                    }
                },
                

            },

        ),

        postModal: {
            screen: PostScreen
        }
    },
    {
        mode: 'modal',
        headerMode: 'none',
        navigationOptions: {
            headerShown: false
        }
    }
)


const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
}, {
    headerMode: 'none',
    navigationOptions: {

        headerShown: false,

    }
});

export default createAppContainer(
    createStackNavigator(
        {
            Loading: LoadingScreen,
            App: AppContainer,
            Auth: AuthStack
        },
        {
            initialRouteName: 'Loading'
        }
    )
)
