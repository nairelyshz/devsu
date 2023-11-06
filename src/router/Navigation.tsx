import React from 'react';
import {StackNavigation} from '../../../../vetmergencia/vetsiapp/src/navigator/StackNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import ProductsList from '../views/ProductsList';
import {Text, View} from 'react-native';
import {colors, textStyle} from '../styles/globalStyle';
import AddProduct from '../views/AddProduct';
import ProductDetails from '../views/ProductDetails';

export default function Navigation() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductsList"
        screenOptions={{headerStyle: {backgroundColor: 'white'}}}>
        <Stack.Screen
          name="ProductsList"
          component={ProductsList}
          options={{
            headerLeft: props => null,
            headerTitle: 'BANCO PICHINCHA',
            headerStyle: {
              height: 60,
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 50,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: colors.blue,
            },
          }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProduct}
          options={{
            headerTitle: 'BANCO PICHINCHA',
            headerStyle: {
              height: 60,
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 50,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: colors.blue,
            },
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerTitle: 'BANCO PICHINCHA',
            headerStyle: {
              height: 60,
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 50,
            },
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: colors.blue,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
