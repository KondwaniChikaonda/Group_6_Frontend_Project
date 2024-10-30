import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "./global.css";
import React from 'react';
import tw from 'twrnc';

export default function Register({ navigation }) {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>

      <View style={tw`w-4/5 max-w-sm p-6 bg-white border border-yellow-500 rounded-lg shadow-lg items-center`}>

        <Text style={tw`text-black text-sm mb-6`}>Register in to to start your session</Text>

        
        <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
          <FontAwesome name="user" size={20} color="gray" style={tw`mr-2`} />
          <TextInput
            placeholder="Enter Full Name"
            style={tw`flex-1`}
          />
        </View>

        <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
          <FontAwesome name="user" size={20} color="gray" style={tw`mr-2`} />
          <TextInput
            placeholder="Registration Number"
            style={tw`flex-1`}
          />
        </View>

        <View style={tw`flex-row items-center w-full p-3 mb-6 border border-gray-300 rounded`}>
          <FontAwesome name="lock" size={20} color="gray" style={tw`mr-2`} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={tw`flex-1`}
          />
        </View>
        <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
        
          <TextInput
            placeholder="Select institution"
            style={tw`flex-1`}
          />
        </View>

        <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
         
          <TextInput
            placeholder="Enter school Email"
            style={tw`flex-1`}
          />
        </View>

 
        <TouchableOpacity style={tw`w-full bg-yellow-600 p-3 rounded`}>
          <Text style={tw`text-white text-center`}>Register</Text>
        </TouchableOpacity>

       
        


      </View>
      
     
      <StatusBar style="auto" />
    </View>
  );
}
