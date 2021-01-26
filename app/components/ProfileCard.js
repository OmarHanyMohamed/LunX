import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import FoldView from 'react-native-foldview';

import ProfileDetailCard from './ProfileDetailCard';
import AdditionalInfoCard from './AdditionalInfoCard';

import {
  ThinGrayLine,
  ThickDarkGrayLine,
} from './Lines';

export default class Row extends Component {

  UNSAFE_componentWillMount() {
    this.renderBackface = this.renderBackface.bind(this);
    this.renderInnerBackFace = this.renderInnerBackFace.bind(this);
  }

  renderBlankFace() {
    return (
      <View
        style={{
          backgroundColor: '#189ad3',
          flex: 1,
        }}
      />
    );
  }

  renderBackface() {
    const onPress = this.props.onPress;
    return (
      <View style={{ flex: 1 }}>

        <FoldView
          renderFrontface={this.renderBlankFace}
          renderBackface={this.renderInnerBackFace}
        >
          <AdditionalInfoCard onPress={onPress} />
        </FoldView>

      </View>
    );
  }

  renderInnerBackFace() {
    const onPress = this.props.onPress;
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: '#189ad3',
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        }}
      >
        <View
          style={{
            backgroundColor: '#189ad3',
            flex: 1,
            margin: 14,
            borderRadius: 2,
          }}
        >
          <TouchableHighlight
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onPress}
          >
            <Text>
              PRESS ME
            </Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }

  render() {
    const onPress = this.props.onPress;

    return (
      <View
        style={{
          height: 350,
          backgroundColor: '#fff',
          flexDirection: 'column',
          borderWidth: 1,
          borderColor: '#e6e6ea'
        }}
      >

        <View style={{ flex: 1 }} >

          <View
            style={{
              flex: 1,
              paddingBottom: 10,
              padding: 16,
            }}
          >



            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
              }}
            >

              <TouchableHighlight
                onPress={onPress}
              >
                <View
                  style={{
                    borderRadius: 50,
                    width: 100,
                    height: 40,
                    marginRight: 10,
                    backgroundColor: '#189ad3',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ fontWeight: 'bold', color: '#ffffff' }}>Show Less</Text>
                </View>
              </TouchableHighlight>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}
              >
                <Text style={{ fontSize: 15, fontWeight: '700', color: 'grey' }}>
                  FullName:
                  {<Text style={{ fontWeight: '500' }}> Omar Hany </Text>}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: 'grey' }}>
                  Date:
                  {<Text style={{ fontWeight: '500' }}> 12/6/2020 </Text>}
                </Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: 'grey' }}>
                  Medical Record Number:
                  {<Text style={{ fontWeight: '500' }}> 3 </Text>}
                </Text>
              </View>

            </View>

          </View>

          <View style={{ flex: 3 }}>

            <FoldView
              renderFrontface={this.renderBlankFace}
              renderBackface={this.renderBackface}
            >
              <ProfileDetailCard onPress={onPress} />
            </FoldView>       

          </View>             
        </View>
      </View>
      
    );
  }
}
