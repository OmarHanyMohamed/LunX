import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  ThinGrayLine,
  ThickGrayLine,
  ThickDarkGrayLine,
  ThinRedLine,
} from './Lines';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e6e6ea',
    flexDirection: 'row',
  },
  leftPane: {
    flex: 0.8,
    backgroundColor: '#189ad3',
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rightPane: {
    flex: 2,
    padding: 16,
    backgroundColor: '#fff',
  },
  date: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    alignSelf: 'center'
  },
  dateText: {
    alignSelf: 'center',
    color: '#ffffff',
  },
  infoHeader: {
    width: 100,
    height: 30,
    backgroundColor: '#e6e6ea',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  infoBody: {
    borderRadius: 50,
    marginBottom: 15,
    width: 245,
    height: 40,
    backgroundColor: '#e6e6ea',
    justifyContent: 'center',
  }
});

export default ({ onPress }) => (
  <View style={styles.container}>

    <View style={styles.leftPane}>
      <Text style={styles.date}>Date: </Text>
      <Text style={styles.dateText}>12/7/2020</Text>

      <View style={{ alignItems: 'center' }}>
        <ThinRedLine />
        <ThickGrayLine width={80} onPress={onPress} />
      </View>
    </View>

    <View style={styles.rightPane}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.infoHeader}>
          <Text style={{ fontWeight: '700' }}>Omar Hany</Text>
        </View>
      </View>

      <View style={styles.infoBody}>
        <Text style={{ fontWeight: '500', marginLeft: '5%' }}>Normal, No presence of nodules</Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <View style={{ width: 140, height: 1, backgroundColor: '#BDC2C9', borderRadius: 50, }} >
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, fontWeight: '700', color: 'green' }}>
              No Cancer
              {' '}
              {<Image source={require('../img/yes.png')} style={{ width: 30, height: 30 }} />}
            </Text>
          </View>

        </View>

        <View style={{ flex: 0.6 }}>
          <TouchableOpacity>
            <View style={{ width: 100, height: 45, backgroundColor: '#189ad3', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: '700', color: '#ffffff' }}>Full Report</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  </View>
);
