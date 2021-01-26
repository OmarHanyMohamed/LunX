import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class InfoScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: '',
            treatment: '',
            norm: false
        }
    }

    UNSAFE_componentWillMount() {
        const { navigation } = this.props;
        photo = navigation.getParam('photo', '');
        data = navigation.getParam('data', '')
    }

    componentDidMount() {
        console.log(data)
        if (data == 'Squamous cell carcinoma') {
            this.setState({
                info: "This type of lung cancer is found centrally in the lung, where the larger bronchi join the trachea to the lung, or in one of the main airway branches. Squamous cell lung cancer is responsible for about 30% of all non-small cell lung cancers, and is generally linked to smoking.",
                treatment: "There are a number of treatment options for squamous cell lung cancer. Which ones are used to treat a specific patient’s lung cancer will depend on the stage of the cancer, the patient’s overall health,including how well the organs of the patient's body are functioning,and the patient's preferences. A patient's age alone does not predict whether a patient will benefit from a treatment but the most appropriate way for treatment is Surgery as it is the best chance for a cure. Among the types of surgery lobectomy, wedge resection, segmentectony, pneumonectomy, and sleeve resection—lobectomy, the removal of an entire lobe, is currently considered to be the most effective",
            })
        }
        else if (data == 'Adenocarcinoma') {
            this.setState({
                info: "Lung adenocarcinoma is the most common form of lung cancer accounting for 30 percent of all cases overall and about 40 percent  of all non-small cell lung cancer occurrences. Adenocarcinomas are  found in several common cancers, including breast, prostate and colorectal. Adenocarcinomas of the lung are found in the outer region of the lung in glands that secrete mucus and help us breathe. Symptoms include coughing, hoarseness, weight loss and weakness.",
                treatment: "It depends on the stage of the cancer, the patient’s overall health, including how well the organs of the patient's body are functioning,and the patient's preferences. A patient's age alone does not predict whether a patient will benefit from a treatment but the most appropriate way for treatment is Surgery as it is the best chance for a cure. Among the types of surgery lobectomy, wedge resection, segmentectony, pneumonectomy, and sleeve resection—lobectomy, the removal of an entire lobe, is currently considered to be the most effective",
            })
        }
        else if (data == 'Normal') {
            this.setState({
                info: "You have No Cancer",
                treatment: "",
                norm: true
            })
        }

    }

    treatment = () => {
        return (
            <Text style={{ marginLeft: '3%', fontSize: 18, fontWeight: '700', color: '#189ad3' }}>
                Treatment:
                {'\n\n'}
                {
                    <Text style={{ marginLeft: '3%', fontSize: 16, fontWeight: '500', color: 'black' }}>
                        {this.state.treatment}
                        {'\n\n'}
                        {
                            <Text style={{ color: '#189ad3', textDecorationLine: 'underline' }}>
                                Other treatments rather than surgury are:
                                            </Text>
                        }

                        {'\n\n'}
                                        - Chemotherapy
                                        {'\n'}
                                        - Cryotherapy
                                        {'\n'}
                                        - Immunotherapy
                                        {'\n'}
                                        - Laser therapy
                                        {'\n'}
                                        - Photodynamic therapy
                                        {'\n'}
                                        - Radiation therapy
                                        {'\n'}
                                        - Surgery
                                        {'\n'}
                                        - Targeted therapyon therapy
                                        {'\n'}
                                        - Surgery
                                        {'\n'}
                                        - Targeted therapy
                                        {'\n\n'}

                        {
                            <Text style={{ fontWeight: 'bold', color: '#189ad3' }}>
                                Tip:
                                            {'  '}
                                {

                                    <Text style={{ fontWeight: '500', color: 'grey', fontSize: 14 }}>
                                        you should see a doctor to suggest the best method of treatment, because it depends on other several causes.
                                                </Text>
                                }
                            </Text>
                        }
                    </Text>
                }
                {'\n'}
            </Text>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name='ios-arrow-back' size={35} color='#73788B' />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.65, borderBottomWidth: 1, borderColor: '#e6e6ea' }}>
                    <Image
                        source={{ uri: photo }}
                        style={{
                            width: '100%',
                            height: 250,
                            resizeMode: 'contain',
                            borderRadius: 10
                        }}
                    />
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                    <View>
                        <View style={{ borderBottomWidth: 1, justifyContent: 'center', flex: 1, borderColor: '#e6e6ea' }}>
                            <Text style={{ marginLeft: '3%', fontSize: 18, fontWeight: '700', color: '#189ad3', marginTop: '5%' }}>
                                Cancer type:
                            {'  '}
                                {
                                    <Text style={{ marginLeft: '3%', fontSize: 16, fontWeight: '500', color: 'black' }}>
                                        {data}
                                    </Text>
                                }
                                {'\n'}
                            </Text>
                        </View>

                        <View style={{ borderBottomWidth: 1, justifyContent: 'center', flex: 1, borderColor: '#e6e6ea', marginTop: '5%' }}>
                            <Text style={{ marginLeft: '3%', fontSize: 18, fontWeight: '700', color: '#189ad3' }}>
                                {data}:
                            {'\n\n'}
                                {''}
                                {
                                    <Text style={{ marginLeft: '5%', fontSize: 15, fontWeight: '500', color: 'black' }}>
                                        {this.state.info}
                                    </Text>
                                }
                                {'\n'}
                            </Text>
                        </View>

                        <View style={{ borderBottomWidth: 1, justifyContent: 'center', flex: 0.2, borderColor: '#e6e6ea', marginTop: '5%' }}>
                            {
                                this.state.norm ?
                                    <Text>

                                    </Text>
                                    :
                                    this.treatment()
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    titleBar: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginHorizontal: 16
    },
})