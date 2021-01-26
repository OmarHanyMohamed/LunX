import React from 'react';

import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';

const Line = ({ style, onPress }) => {
  if (onPress) {
    return (
      <TouchableHighlight
        style={[
          {
            marginBottom: 10,
            borderRadius: 2,
            backgroundColor: '#189ad3'
          },
          style,
        ]}
        onPress={onPress}
      >
        <View />
      </TouchableHighlight>
    );
  }

  return (
    <View
      style={[
        {
          marginBottom: 10,
        },
        style,
      ]}
    />
  );
};

const ThinLine = ({ color, width = 60, ...props }) => (
  <Line
    style={{
      width,
      backgroundColor: color,
      height: 10,
    }}
    {...props}
  />
);

const ThickLine = ({ color, width = 70, ...props }) => (
  <View style={{
    width,
    backgroundColor: color,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center'
  }}
  >
    <Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold', color: '#189ad3' }}   {...props}>
      More
    </Text>
  </View>

);

export const ThinGrayLine = (props) => (
  <ThinLine color={'#BDC2C9'} {...props} />
);

export const ThickGrayLine = (props) => (
  <ThickLine color={'#ffffff'} {...props} />
);

export const ThickWhiteLine = (props) => (
  <ThickLine color={'#FFFFFF'} {...props} />
);

export const ThickDarkGrayLine = (props) => (
  <ThickLine color={'#33373B'} {...props} />
);

export const ThinRedLine = (props) => (
  <ThinLine color={'#DB0000'} {...props} />
);
