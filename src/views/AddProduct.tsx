import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, ToastAndroid} from 'react-native';
import {generalStyle} from '../styles/globalStyle';
import Button from '../components/Common/Button';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {messages} from '../common/messages';
import moment from 'moment';
import InputText from '../components/Common/InputText';
import Label from '../components/Common/Label';
import ErrorMessage from '../components/Common/ErrorMessage';
import Title from '../components/Common/Title';
import DateModal from './Modals/DateModal';
import {services} from '../api';
import {useNavigation} from '@react-navigation/native';
import {Product} from '../api/product';

export default function AddProduct({route}: any) {
  const today = useRef(moment().format('DD/MM/YYYY'));
  const [loading, setLoading] = useState(false);
  const navigator = useNavigation();

  const onSubmit = async () => {
    setLoading(true);
    const dateParts = newProductForm.values.date_revision.split('/');
    const dateParts2 = newProductForm.values.date_release.split('/');

    const dataToSend: Product = {
      ...newProductForm.values,
      date_release: new Date(
        `${dateParts2[2]}-${dateParts2[1]}-${dateParts2[0]} 00:00`,
      ),
      date_revision: new Date(
        `${dateParts[2]}-${dateParts[1]}-${dateParts[0]} 00:00`,
      ),
    };

    if (route.params?.id) {
      updateProduct(dataToSend);
      return;
    } else {
      const {data} = await validateID();
      setLoading(false);
      if (data) {
        ToastAndroid.show(
          'Este ID ya está registrado, intente con otro',
          ToastAndroid.BOTTOM,
        );
        return;
      }

      createProduct(dataToSend);
    }
  };
  const updateProduct = (dataToSend: Product) => {
    setLoading(true);
    services.financialService
      .updateProduct(dataToSend)
      .then(_ => {
        setLoading(false);

        ToastAndroid.show('Producto actualizado', ToastAndroid.BOTTOM);
        navigator.goBack();
      })
      .catch(_ => {
        ToastAndroid.show(
          'Ha ocurrido un error, intente nuevamente más tarde.',
          ToastAndroid.BOTTOM,
        );
        setLoading(false);
      });
  };

  const createProduct = (dataToSend: Product) => {
    setLoading(true);
    services.financialService
      .createProduct(dataToSend)
      .then(_ => {
        setLoading(false);

        ToastAndroid.show('Registro exitoso', ToastAndroid.BOTTOM);
        navigator.goBack();
      })
      .catch(_ => {
        ToastAndroid.show(
          'Ha ocurrido un error, intente nuevamente más tarde.',
          ToastAndroid.BOTTOM,
        );
        setLoading(false);
      });
  };

  const validateID = () => {
    return services.financialService.validateId(newProductForm.values.id);
  };

  const validation = Yup.object({
    id: Yup.string()
      .min(3, messages.MIN_CHAR(3))
      .max(10, messages.MIN_CHAR(10))
      .required(messages.FIELD_REQUIRED),
    name: Yup.string()
      .min(5, messages.MIN_CHAR(5))
      .max(100, messages.MIN_CHAR(100))
      .required(messages.FIELD_REQUIRED),
    description: Yup.string()
      .min(10, messages.MIN_CHAR(10))
      .max(200, messages.MIN_CHAR(200))
      .required(messages.FIELD_REQUIRED),
    logo: Yup.string().required(messages.FIELD_REQUIRED),
    date_release: Yup.string().required(messages.FIELD_REQUIRED),
    date_revision: Yup.string().required(messages.FIELD_REQUIRED),
  });

  const newProductForm = useFormik({
    initialValues: {
      id: '',
      name: '',
      description: '',
      logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
      date_release: today.current,
      date_revision: '',
    },
    validationSchema: validation,
    onSubmit,
  });

  const calculateRevisionDate = () => {
    const dateParts = newProductForm.values.date_release.split('/');

    const dateRevision = moment(
      `${+dateParts[2] + 1}-${dateParts[1]}-${dateParts[0]}`,
    ).format('DD/MM/YYYY');
    newProductForm.setFieldValue('date_revision', dateRevision);
  };

  useEffect(() => {
    if (route.params?.id) {
      const {id, name, description, logo, date_release, date_revision} =
        route.params as any;
      newProductForm.setValues({
        id,
        name,
        description,
        logo,
        date_release: moment(date_release).format('DD/MM/YYYY'),
        date_revision: moment(date_revision).format('DD/MM/YYYY'),
      });
    }
  }, []);

  useEffect(() => {
    calculateRevisionDate();
  }, [newProductForm.values.date_release]);

  return (
    <ScrollView style={[generalStyle.pageStyle]}>
      <View>
        <Title styleTitle={{marginBottom: 30}}>Formulario de Registro</Title>
        <View style={[generalStyle.row]}>
          <View style={{flex: 12}}>
            <Label label="ID"></Label>
            <InputText
              value={newProductForm.values.id}
              editable={route.params?.id ? false : true}
              onChange={value => {
                newProductForm.setFieldValue('id', value);
              }}
              placeholder=""></InputText>
            <ErrorMessage>{newProductForm.errors.id}</ErrorMessage>
          </View>
        </View>
        <View style={[generalStyle.row]}>
          <View style={{flex: 12}}>
            <Label label="Nombre"></Label>
            <InputText
              value={newProductForm.values.name}
              onChange={value => {
                newProductForm.setFieldValue('name', value);
              }}
              placeholder=""></InputText>
            <ErrorMessage>{newProductForm.errors.name}</ErrorMessage>
          </View>
        </View>
        <View style={[generalStyle.row]}>
          <View style={{flex: 12}}>
            <Label label="Descripción"></Label>
            <InputText
              value={newProductForm.values.description}
              onChange={value => {
                newProductForm.setFieldValue('description', value);
              }}
              placeholder=""></InputText>
            <ErrorMessage>{newProductForm.errors.description}</ErrorMessage>
          </View>
        </View>
        <View style={[generalStyle.row]}>
          <View style={{flex: 12}}>
            <Label label="Logo"></Label>
            <InputText
              value={newProductForm.values.logo}
              onChange={value => {
                newProductForm.setFieldValue('logo', value);
              }}
              placeholder=""></InputText>
            <ErrorMessage>{newProductForm.errors.logo}</ErrorMessage>
          </View>
        </View>

        <View style={[generalStyle.row]}>
          <View style={{flex: 11}}>
            <Label label="Fecha liberación"></Label>
            <InputText
              value={newProductForm.values.date_release}
              editable={false}
              onChange={value => {
                newProductForm.setFieldValue('date_release', value);
              }}
              placeholder=""></InputText>
            <ErrorMessage>{newProductForm.errors.date_release}</ErrorMessage>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <DateModal
              selectDate={value => {
                if (value !== '' && value !== undefined) {
                  newProductForm.setFieldValue(
                    'date_release',
                    moment(value).format('DD/MM/YYYY'),
                  );
                }
              }}
            />
          </View>
          <ErrorMessage>{newProductForm.errors.date_release}</ErrorMessage>
        </View>
        <View style={[generalStyle.row]}>
          <View style={{flex: 12}}>
            <Label label="Fecha revisión"></Label>
            <InputText
              value={newProductForm.values.date_revision}
              editable={false}
              onChange={value => {
                newProductForm.setFieldValue('logo', value);
              }}
              placeholder=""></InputText>
            <ErrorMessage>{newProductForm.errors.logo}</ErrorMessage>
          </View>
        </View>
      </View>
      <Button
        label="Enviar"
        loading={loading}
        onClick={() => {
          newProductForm.handleSubmit();
        }}></Button>
      <Button
        label="Reiniciar"
        typeButton="secondary"
        onClick={() => {
          newProductForm.resetForm();
        }}></Button>
    </ScrollView>
  );
}
