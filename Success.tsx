import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import React from 'react';
import tw from 'twrnc';

export default function Success({navigation}) {
  return (
    <View style={tw`flex-1 bg-blue-50 items-center justify-center p-6`}>
   
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3159/3159066.png', 
        }}
        style={tw`w-40 h-40 mb-6`}
      />

    
      <Text style={tw`text-2xl font-bold text-green-600 mb-4 text-center`}>
        Congratulations!
      </Text>
      <Text style={tw`text-lg text-gray-700 text-center mb-6`}>
        You have successfully bonded. 🎉
      </Text>

     
      <TouchableOpacity
        style={tw`bg-yellow-600 rounded-full px-6 py-3 shadow-lg`}
        onPress={() => navigation.navigate('Home')} 
      >
        <Text style={tw`text-white text-lg font-semibold`}>
          Go to Home
        </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
