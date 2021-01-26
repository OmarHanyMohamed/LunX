import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class MedicalReport extends Component {
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.reportCard}>
                    <View style={styles.reportHeader}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ReportScreen', {
                            reportTitle: this.props.title,
                            reportImg: this.props.image
                        })}>
                            <ImageBackground
                                source={this.props.image}
                                style={styles.reportImage}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.reportBody}>
                        <TouchableOpacity style={{ flex: 0.8 }} onPress={() => this.props.navigation.navigate('ReportScreen', {
                            reportTitle: this.props.title,
                            reportImg: this.props.image
                        })}>
                            <View>
                                <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 20 }}>
                                    Medical Record Number:
                                {<Text style={{ fontWeight: '500' }}> 3 </Text>}
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 20 }}>
                                    Report Title:
                                {<Text style={{ fontWeight: '500' }}> {this.props.title} </Text>}
                                </Text>
                                <Text style={{ fontSize: 15, fontWeight: '700', marginLeft: 20 }}>
                                    Date:
                                {<Text style={{ fontWeight: '500' }}> {this.props.date} </Text>}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 0.2, borderLeftWidth: 0.2, alignItems: 'center', justifyContent: 'center', borderLeftColor: 'grey' }}>
                            <TouchableOpacity>
                                <Ionicons
                                    name='ios-trash'
                                    color='#189ad3'
                                    size={40}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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