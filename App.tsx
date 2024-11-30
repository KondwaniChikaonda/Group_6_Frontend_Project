import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';

import Reset from './Reset';

import Register from './Register';
import BondingForm from './bondingForm';
import Home from './Home';
import ResetPassword from './ResetPassword';

import LandingPage from './landingPage';
import { StyleSheet, Text, View, TouchableOpacity, GestureResponderEvent } from "react-native";

import Success from './Success';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="/" component={LandingPage} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Bonding" component={BondingForm} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} /> 
      <Stack.Screen name="Success" component={Success} />    
        
      </Stack.Navigator>
    </NavigationContainer>




  );
}
