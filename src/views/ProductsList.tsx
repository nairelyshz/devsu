import React, {useCallback, useEffect, useState} from 'react';
import {Text, ToastAndroid, View} from 'react-native';
import {FinancialProducts} from '../api/financialProducts.service';
import {services} from '../api';
import Button from '../components/Common/Button';
import {generalStyle} from '../styles/globalStyle';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ProductCard from '../components/ProductCard/ProductCard';
import InputText from '../components/Common/InputText';
import {Product} from '../api/product';

export default function ProductsList() {
  const [allProducts, setProducts] = useState<any[]>([]);
  const [filterProducts, setFilterProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const navigator = useNavigation();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = useCallback(() => {
    setLoading(true);
    services.financialService
      .productsList()
      .then(({data}: {data: Product[]}) => {
        setProducts(data);
        setFilterProducts(data);
        setLoading(false);
      })
      .catch(_ => {
        setLoading(false);
        ToastAndroid.show(
          'Ha ocurrido un error, intente nuevamente más tarde.',
          ToastAndroid.BOTTOM,
        );
      });
  }, []);

  useEffect(() => {
    search();
  }, [textSearch]);
  const search = () => {
    if (textSearch !== '') {
      setFilterProducts(
        allProducts.filter(
          (e: Product) =>
            e.id.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()) ||
            e.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase()),
        ),
      );
    } else {
      setFilterProducts(allProducts);
    }
  };

  useFocusEffect(getProducts);

  return (
    <View style={[{position: 'relative', height: '100%'}]}>
      <View style={[generalStyle.pageStyle, {marginBottom: 85}]}>
        <View style={[{marginBottom: 40}]}>
          <InputText
            value={textSearch}
            placeholder="Buscar..."
            onChange={value => setTextSearch(value)}></InputText>
        </View>
        {filterProducts.map((product: any, index: number) => (
          <ProductCard
            first={index === 0}
            last={index === filterProducts.length - 1}
            key={product.id}
            info={product}></ProductCard>
        ))}

        {!loading && filterProducts.length === 0 && (
          <Text>Sin mensajes para mostrar</Text>
        )}
      </View>
      <View
        style={[
          generalStyle.pageStyle,
          {
            height: 80,
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            bottom: 0,
            paddingVertical: 10,
          },
        ]}>
        <Button
          label="Agregar"
          onClick={() => {
            navigator.navigate('AddProduct');
          }}></Button>
      </View>
    </View>
  );
}
