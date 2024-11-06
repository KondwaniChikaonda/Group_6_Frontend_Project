import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const Home = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://th.bing.com/th/id/O' }}
      style={tw`flex-1 justify-center items-center bg-cover`}
    >
      <View style={tw`bg-black bg-opacity-50 p-5 rounded-lg`}>
        <Text style={tw`text-3xl font-bold text-white mb-4 text-center`}>
          Welcome to Our App
        </Text>
        <Text style={tw`text-lg text-white mb-8 text-center`}>
          Discover amazing features and connect with us!
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={tw`bg-blue-500 px-6 py-3 rounded-full`}
        >
          <Text style={tw`text-white text-center text-lg font-semibold`}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Home;
