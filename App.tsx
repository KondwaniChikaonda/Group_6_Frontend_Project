import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import { resetCache } from './metro.config';
import Reset from './Reset';

import Register from './Register';
import BondingForm from './bondingForm';
import Home from './Home';
import ResetPassword from './ResetPassword';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="/" component={Login} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="bond" component={BondingForm} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
