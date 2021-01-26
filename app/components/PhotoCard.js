import React from 'react';

import {
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

import {
  ThinGrayLine,
  ThickWhiteLine,
} from './Lines';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6ea',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
  },
});

export default ({ onPress }) => (
  <View style={styles.container}>
    <Image source={require('../img/Chest_X-ray_2346.jpg')} style={{ resizeMode: 'cover', width: '100%', height: 178, }} />
  </View>
);
