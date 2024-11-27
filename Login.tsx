import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "./global.css";
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import tw from 'twrnc';
import Home from './Home';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const showNotice = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };





  const showNotice2 = (message2) => {
    setMessage2(message2);
    setTimeout(() => {
      setMessage2('');
    }, 5000);
  };






  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      showNotice2('Please enter both your registration number and password.');
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post('https://groub-6-backend-2.onrender.com/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { token, userId, registrationNumber, userName } = response.data;
        
        setLoggedIn(true);
        navigation.navigate('Home'); 
     
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', userId.toString());
        await AsyncStorage.setItem('registrationNumber', registrationNumber);
      } else {
        showNotice('Login failed. You entered wrong credentials.');
      }
    } catch (error) {
      showNotice('Login failed. You entered wrong credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      
           <Text style={tw`text-black text-sm mb-6 `}>Automated Bonding System</Text>
      <View style={tw`w-4/5 max-w-sm p-6 bg-white border border-yellow-500 rounded-lg shadow-lg items-center`}>
        <Text style={tw`text-black text-sm mb-6 `}>Sign in to start your session</Text>

        
        {message2 ? <Text style={tw`text-red-500 mt-4 mb-2 text-center`}>{message2}</Text> : null}
   
        <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
          <FontAwesome name="user" size={20} color="gray" style={tw`mr-2`} />
          <TextInput
            placeholder="Registration Number"
            value={username}
            onChangeText={setUsername}
            style={tw`flex-1`}
          />
        </View>

    
        <View style={tw`flex-row items-center w-full p-3 mb-6 border border-gray-300 rounded`}>
          <FontAwesome name="lock" size={20} color="gray" style={tw`mr-2`} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={tw`flex-1`}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={20} color="gray" style={tw`ml-2`} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={tw`w-full bg-yellow-600 p-3 rounded`}
          onPress={handleLogin}
          disabled={isSubmitting}
        >
          <Text style={tw`text-white text-center`}>{isSubmitting ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        <Text style={tw`mt-3 text-center`}>
          Forgot password? <Text onPress={() => navigation.navigate('Reset')} style={tw`text-yellow-500`}>Reset</Text>
        </Text>
        <Text style={tw`mt-2 text-center font-semibold`}>OR</Text>
        <Text style={tw`mt-3 text-center`}>
          Don't have an account? <Text onPress={() => navigation.navigate('Register')} style={tw`text-yellow-500`}>Register</Text>
        </Text>

     
        {message ? <Text style={tw`text-red-500 mt-4`}>{message}</Text> : null}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
