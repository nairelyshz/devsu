import React from 'react';
import {Text} from 'react-native';
import {textStyle} from '../../styles/globalStyle';

export default function ErrorMessage({children}: {children: any}) {
  return <Text style={[textStyle.xs, {color: 'red'}]}>{children}</Text>;
}
