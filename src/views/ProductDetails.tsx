import React from 'react';
import {Product} from '../api/product';
import {Image, Text, View} from 'react-native';
import {generalStyle} from '../styles/globalStyle';
import Title from '../components/Common/Title';
import Label from '../components/Common/Label';
import moment from 'moment';
import DeleteProduct from './Modals/DeleteProduct';
import Button from '../components/Common/Button';
import {useNavigation} from '@react-navigation/native';

export default function ProductDetails({route}: any) {
  const navigation = useNavigation();
  const {id, name, description, logo, date_release, date_revision} =
    route.params;

  return (
    <View style={[generalStyle.pageStyle]}>
      <Title>ID: {id}</Title>
      <Text>Información extra</Text>
      <View style={[generalStyle.row, {marginTop: 50}]}>
        <View style={{flex: 6}}>
          <Label label="Nombre"></Label>
        </View>
        <View style={{flex: 6}}>
          <Text style={{textAlign: 'right'}}> {name}</Text>
        </View>
      </View>
      <View style={[generalStyle.row]}>
        <View style={{flex: 6}}>
          <Label label="Descripción"></Label>
        </View>
        <View style={{flex: 6}}>
          <Text style={{textAlign: 'right'}}> {description}</Text>
        </View>
      </View>
      <View style={[generalStyle.row]}>
        <Label label="Logo"></Label>
      </View>
      <View style={[generalStyle.row, {justifyContent: 'center', height: 150}]}>
        <Image
          style={{height: '100%', objectFit: 'contain', width: '60%'}}
          source={{uri: logo}}></Image>
      </View>
      <View style={[generalStyle.row]}>
        <View style={{flex: 6}}>
          <Label label="Fecha liberación"></Label>
        </View>
        <View style={{flex: 6}}>
          <Text style={{textAlign: 'right'}}>
            {moment(date_release).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>
      <View style={[generalStyle.row]}>
        <View style={{flex: 6}}>
          <Label label="Fecha revisión"></Label>
        </View>
        <View style={{flex: 6}}>
          <Text style={{textAlign: 'right'}}>
            {moment(date_revision).format('DD/MM/YYYY')}
          </Text>
        </View>
      </View>
      <Button
        label="Editar"
        typeButton="secondary"
        onClick={() => {
          navigation.navigate('AddProduct', {
            id,
            name,
            description,
            logo,
            date_release,
            date_revision,
          });
        }}
      />
      <DeleteProduct id={id} name={name}></DeleteProduct>
    </View>
  );
}
