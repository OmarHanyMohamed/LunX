import React from 'react';

import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import {
  ThinGrayLine,
  ThickGrayLine,
} from './Lines';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#BDC2C9'
  },
});

export default ({ onPress }) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row', flex: 0.5 }}>
      <View style={{ flex: 0.75 }}>
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#189ad3' }}>
            Clinical History:
        </Text>
        </View>
        <View style={{ width: 145, height: 1, backgroundColor: '#e6e6ea', borderRadius: 50, }} >
        </View>
      </View>

      <View style={{ flex: 1, marginTop: 8 }}>
        <Text style={{ fontWeight: '500', fontSize: 15, color: 'green' }}>
          No presence of Cancer
      </Text>
      </View>
    </View>

    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.75 }}>
        <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#189ad3' }}>
            Clinical History:
        </Text>
        </View>
        <View style={{ width: 145, height: 1, backgroundColor: '#e6e6ea', borderRadius: 50, }} >
        </View>
      </View>

      <View style={{ flex: 1, marginTop: 8 }}>
        <Text style={{ fontWeight: '500', fontSize: 15, color: 'green' }}>
          No presence of Cancer
      </Text>
      </View>
    </View>
  </View>
);
