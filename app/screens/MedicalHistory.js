import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground,
    FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

export default class MedicalHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isloading: true,
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        fetch("https://secure-anchorage-88351.herokuapp.com/getResult")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson.reverse(),
                    isloading: false
                }, () => console.log(this.state.data))
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({ isloading: true })
    }

    render() {
        var date = moment()
            .utcOffset('+05:30')
            .format('DD-MM-YYYY');
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backIcon}>
                        <Ionicons name='ios-arrow-back' size={35} color='#525750' />
                    </TouchableOpacity>
                </View>
                <View style={styles.header}>
                    <Text style={styles.favText}>Medical History</Text>
                </View>
                <View style={styles.reportContainer}>
                    {this.state.isloading ? (
                        <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', marginTop: '50%' }}>
                            <ActivityIndicator size={'large'} color='#189ad3' />
                        </View>

                    ) :
                        <FlatList
                            style={{ flex: 1 }}
                            data={this.state.data}
                            ListEmptyComponent={() => (
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 120 }}>
                                    <Text style={styles.emptyText}>
                                        You have no reports Yet
                                    </Text>
                                </View>
                            )}
                            renderItem={({ item }) => (
                                <View style={styles.medcontainer}>
                                    <View style={styles.reportCard}>
                                        <View style={styles.reportHeader}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ReportScreen', {
                                                reportTitle: item.data,
                                                reportImg: item.image
                                            })}>
                                                <ImageBackground
                                                    source={{ uri: item.image }}
                                                    style={styles.reportImage}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.reportBody}>
                                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('ReportScreen', {
                                                reportTitle: item.data,
                                                reportImg: item.image
                                            })}>
                                                <View>
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 20 }}>
                                                        Medical Record Number:
                                                        {<Text style={{ fontWeight: '500' }}>
                                                            {item.index}
                                                        </Text>}
                                                    </Text>
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 20 }}>
                                                        Report Title:
                                {<Text style={{ fontWeight: '500' }}> {item.data} </Text>}
                                                    </Text>
                                                    <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 20 }}>
                                                        Date:
                                {<Text style={{ fontWeight: '500' }}> {date} </Text>}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            
                                        </View>
                                    </View>
                                </View>
                            )}
                            keyExtractor={item => item._id}
                            refreshing={this.state.isloading}
                            onRefresh={this.getData}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                        />
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleBar: {
        flex: 0.08,
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
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: 'grey',
        backgroundColor: '#ffffff'
    },
    favText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#525750'
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 60,
        color: '#73788B',
    },
    reportContainer: {
        flex: 1,
    },
    medcontainer: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 25,
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderTopColor: '#e6e6ea',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        borderTopColor: '#e6e6ea',
        elevation: 5,
    },
    reportCard: {
        height: 300,
    },
    reportStyle: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: '2.3%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            width: 3,
            height: 3
        }
    },
    reportHeader: {
        flex: 1
    },
    reportBody: {
        flex: 0.4,
        flexDirection: 'row'
    },
    reportImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    reportText: {
        padding: 10,
        fontSize: 14,
        fontWeight: '700',
        borderRadius: 10
    }
})