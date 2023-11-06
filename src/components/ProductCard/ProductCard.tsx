import React from 'react';
import {Product} from '../../api/product';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Label from '../Common/Label';
import {colors} from '../../styles/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleRight, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

export default function ProductCard({
  first,
  last,
  info,
}: {
  first: boolean;
  last: boolean;
  info: Product;
}) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ProductDetails', {
          ...info,
        });
      }}>
      <View
        key={info.id}
        style={[
          cardStyle.common,
          first ? cardStyle.first : cardStyle.common,
          last ? cardStyle.last : cardStyle.common,
        ]}>
        <View
          style={[
            {
              flex: 11,
            },
          ]}>
          <Label label={info.name}></Label>
          <Text>ID: {info.id}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesomeIcon color={'gray'} icon={faAngleRight}></FontAwesomeIcon>
        </View>
      </View>
    </Pressable>
  );
}

const cardStyle = StyleSheet.create({
  common: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 2,
    borderColor: colors.gray,
  },
  first: {borderTopLeftRadius: 8, borderTopRightRadius: 8},
  last: {borderBottomLeftRadius: 8, borderBottomRightRadius: 8},
});
