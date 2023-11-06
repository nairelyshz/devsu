import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import {colors, normalize, textStyle} from '../../styles/globalStyle';

export default function Button({
  onClick,
  loading = false,
  label,
  typeButton = 'primary',
}: {
  label: string;
  loading?: boolean;
  typeButton?: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
}) {
  return (
    <Pressable
      style={[
        styleButton.container,

        {
          backgroundColor:
            typeButton === 'primary'
              ? colors.primary
              : typeButton === 'danger'
              ? colors.danger
              : colors.gray,
        },
      ]}
      onPress={onClick}>
      <Text
        style={[
          textStyle.base,
          {
            textAlign: 'center',
            fontWeight: '600',
            color: typeButton === 'danger' ? 'white' : 'black',
          },
        ]}>
        {label}
        {loading && <ActivityIndicator color={colors.blue}></ActivityIndicator>}
      </Text>
    </Pressable>
  );
}

const styleButton = StyleSheet.create({
  container: {
    padding: normalize(14),
    marginVertical: 5,
    borderRadius: 5,
  },
});
