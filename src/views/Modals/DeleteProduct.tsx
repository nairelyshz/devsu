import React, {useState} from 'react';
import Button from '../../components/Common/Button';
import {Modal, Pressable, Text, ToastAndroid, View} from 'react-native';
import {colors, generalStyle} from '../../styles/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {services} from '../../api';
import {useNavigation} from '@react-navigation/native';

export default function DeleteProduct({id, name}: {name: string; id: string}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigator = useNavigation();

  const onSubmit = () => {
    setLoading(true);
    services.financialService
      .deleteProduct(id)
      .then(_ => {
        setLoading(false);

        ToastAndroid.show('Eliminado exitosamente', ToastAndroid.BOTTOM);
        navigator.navigate('ProductsList');
      })
      .catch(_ => {
        setLoading(false);

        ToastAndroid.show(
          'Ha ocurrido un error, intente nuevamente más tarde.',
          ToastAndroid.BOTTOM,
        );
      });
  };
  return (
    <>
      <Button
        label="Eliminar"
        typeButton="danger"
        onClick={() => setOpen(true)}></Button>
      <Modal
        animationType="slide"
        visible={open}
        transparent={true}
        style={{}}
        onRequestClose={data => {
          setOpen(false);
        }}>
        <View
          style={[
            {
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.4)',
            },
          ]}>
          <View
            style={[
              {
                position: 'absolute',
                height: 'auto',
                bottom: 0,
                backgroundColor: 'white',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              },
            ]}>
            <View
              style={[
                generalStyle.row,
                {
                  justifyContent: 'flex-end',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                },
              ]}>
              <Pressable onPress={() => setOpen(false)}>
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              </Pressable>
            </View>
            <Text
              style={{
                textAlign: 'center',
                marginVertical: 20,
                borderWidth: 1,
                borderColor: colors.gray,
                padding: 20,
              }}>
              ¿Estás seguro de eliminar el producto {name}?
            </Text>
            <View style={{paddingHorizontal: 20, paddingBottom: 5}}>
              <Button
                label="Confirmar"
                loading={loading}
                onClick={() => {
                  onSubmit();
                }}></Button>
              <Button
                label="Cancelar"
                typeButton="secondary"
                onClick={() => setOpen(false)}></Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
