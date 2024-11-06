import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import { resetCache } from './metro.config';
import Reset from './Reset';
import BondingForm from './bondingForm';
import Register from './Register';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="/" component={Login} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name="bonding" component={BondingForm} />
   
      </Stack.Navigator>
    </NavigationContainer>
  );
}
