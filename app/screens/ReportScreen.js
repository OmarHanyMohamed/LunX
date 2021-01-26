import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import * as firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

class ReportScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            present: '',
            email: '',
            displayName: ''
        }
    }


    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        repTitle = navigation.getParam('reportTitle', '');
        repImage = navigation.getParam('reportImg', '');
    }

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;
        this.setState({ email, displayName });
        if (repTitle == 'Normal' || repTitle == 'normal') {
            this.setState({
                present: 'Negative'
            })
        } else {
            this.setState({
                present: 'Positive'
            })
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <View style={{ flex: 0.4, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name='ios-arrow-back' size={35} color='#525750' style={styles.backIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginBottom: 15, height: 40, backgroundColor: '#e6e6ea', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 17, fontWeight: '700' }}>Patient Information</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={{ flex: 0.21, flexDirection: 'row' }}>
                                <View style={{ flex: 0.70, height: 50, width: '100%', justifyContent: 'center', borderWidth: 0.2, borderColor: 'grey' }}>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                        Name:
                                    {' '}
                                        {<Text style={{ color: 'grey', fontWeight: '500' }}> {this.state.displayName} </Text>}
                                    </Text>
                                </View>

                                <View style={{ flex: 0.30, height: 50, width: '100%', justifyContent: 'center', borderWidth: 0.2, borderColor: 'grey' }}>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                        Age:
                                    {' '}
                                        {<Text style={{ color: 'grey', fontWeight: '500' }}> {this.props.age} </Text>}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 0.25, flexDirection: 'row' }}>
                                <View style={{ flex: 0.50, height: 50, width: '100%', justifyContent: 'center', borderWidth: 0.2, borderTopColor: '#ffffff', borderColor: 'grey' }}>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                        Smoker:
                                    {' '}
                                        {<Text style={{ color: 'grey', fontWeight: '500' }}> {this.props.smoker} </Text>}
                                    </Text>
                                </View>

                                <View style={{ flex: 0.50, height: 50, width: '100%', justifyContent: 'center', borderWidth: 0.2, borderTopColor: '#ffffff', borderColor: 'grey' }}>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                        Gender:
                                    {' '}
                                        {<Text style={{ color: 'grey', fontWeight: '500' }}> {this.props.gender} </Text>}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 17, flex: 1, height: 40, backgroundColor: '#e6e6ea', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700' }}>Personal Health History</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <View style={{ height: 50, justifyContent: 'center', borderWidth: 0.2, borderColor: 'grey', marginTop: 15, }}>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                        Chronic diseases:
                                    {' '}
                                        {<Text style={{ color: 'grey', fontWeight: '500' }}> {this.props.chronic} </Text>}
                                    </Text>
                                </View>
                                <View style={{ height: 50, justifyContent: 'center', borderWidth: 0.2, borderColor: 'grey', borderTopColor: 'white' }}>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                        Allergic to:
                                    {' '}
                                        {<Text style={{ color: 'grey', fontWeight: '500' }}> {this.props.allergy} </Text>}
                                    </Text>
                                </View>
                                <View style={{ height: 50, justifyContent: 'center', borderWidth: 0.2, borderColor: 'grey', borderTopColor: 'white' }}>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                        family history of lung cancer:
                                    {' '}
                                        {<Text style={{ color: 'grey', fontWeight: '500' }}> {this.props.history} </Text>}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 17, flex: 1, height: 40, backgroundColor: '#e6e6ea', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700' }}>Detection Report</Text>
                            </View>
                            <View style={{ height: 50, justifyContent: 'center', borderWidth: 0.2, borderColor: 'grey', marginTop: 15, }}>
                                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                    Presence of cancer:
                                    {' '}
                                    {<Text style={{ color: 'grey', fontWeight: '500' }}> {this.state.present} </Text>}
                                </Text>
                            </View>
                            <View style={{ height: 50, justifyContent: 'center', borderWidth: 0.2, borderColor: 'grey', borderTopColor: 'white' }}>
                                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>
                                    Overall Stage:
                                    {' '}
                                    {<Text style={{ color: 'grey', fontWeight: '500' }}> {repTitle} </Text>}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: repImage }} style={styles.imageStyle} />
                        </View>

                    </View>

                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        age: state.profile.age,
        gender: state.profile.gender,
        chronic: state.profile.chronic,
        allergy: state.profile.allergy,
        smoker: state.profile.smoker,
        history: state.profile.history
    }
}

export default connect(mapStateToProps)(ReportScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    backIcon: {
        height: 50,
        width: 50,
        zIndex: 1000
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 60
    },
    titleBar: {
        flex: 0.12,
        marginHorizontal: 16,
        flexDirection: 'row'
    },
    infoContainer: {
        flex: 1
    },
    imageContainer: {
        flex: 1,
        marginTop: 20
    },
    imageStyle: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        flex: 1
    },
})