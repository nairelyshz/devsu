import React from 'react';
import {Text} from 'react-native';
import {textStyle} from '../../styles/globalStyle';

export default function Title({children, styleTitle}: any) {
  return (
    <Text
      style={[
        textStyle['1x'],
        {fontWeight: '700', color: 'black', ...styleTitle},
      ]}>
      {children}
    </Text>
  );
}
