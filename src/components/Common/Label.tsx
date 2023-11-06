import React from 'react';
import {textStyle} from '../../styles/globalStyle';
import {Text} from 'react-native';

export default function Label({label}: {label: string}) {
  return <Text style={[textStyle.sm, {fontWeight: '700'}]}>{label}</Text>;
}
