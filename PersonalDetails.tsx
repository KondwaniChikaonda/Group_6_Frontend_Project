import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome }  from '@expo/vector-icons';
import { useState } from 'react'; 
import React from 'react';
import tw from 'twrnc';

export default function PersonalDetails({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false); // Added state for menu toggle

  return (
    <View style={tw`relative flex-1 bg-gray-100`}>
      {/* Menu Button */}
      <View style={tw`absolute top-5 left-5`}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}> 
          <FontAwesome name="bars" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Transparent Overlay */}
      {menuOpen && (
        <TouchableOpacity
          style={tw`absolute inset-0 bg-black bg-opacity-25`}
          activeOpacity={1}
          onPress={() => setMenuOpen(false)} // Close the menu on overlay press
        />
      )}

      {/* Dropdown Menu */}
      {menuOpen && (
        <View style={tw`absolute top-16 left-5 bg-white rounded-lg shadow-lg p-3 z-10`}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PersonalDetails')}
            style={tw`py-2`}
          >
            <Text style={tw`text-black text-base`}>Personal Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`py-2`}>
            <Text onPress={() => navigation.navigate('Bonding')} style={tw`text-black text-base`}>
              Bonding
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Signing Out')} style={tw`py-2`}>
            <Text style={tw`text-red-500 text-base`}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content */}
      <View style={tw`flex-1 justify-center items-center px-4`}>
        <Text style={tw`text-center text-2xl font-bold mb-8 text-yellow-600`}>
          Personal Details
        </Text>
        <View style={tw`w-full px-6`}>
          <Text style={tw`text-gray-600 text-base mb-2`}>Full Name:</Text>
          <Text style={tw`text-black text-lg font-medium mb-4`}>John Doe</Text>

          <Text style={tw`text-gray-600 text-base mb-2`}>Email:</Text>
          <Text style={tw`text-black text-lg font-medium mb-4`}>johndoe@example.com</Text>

          <Text style={tw`text-gray-600 text-base mb-2`}>Registration Number:</Text>
          <Text style={tw`text-black text-lg font-medium mb-4`}>123456</Text>

          <Text style={tw`text-gray-600 text-base mb-2`}>Bonding Status:</Text>
          <Text style={tw`text-black text-lg font-medium`}>Active</Text>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
