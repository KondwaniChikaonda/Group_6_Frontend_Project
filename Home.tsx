import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';

const Home = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const id = await AsyncStorage.getItem('userId');
      const registrationNumber = await AsyncStorage.getItem('registrationNumber');
      setUserId(id);
      setRegistrationNumber(registrationNumber);
    };

    getUserInfo();
  }, []);


   if(userId){
    console.log(userId);

   }

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
          {userId ? `User ID: ${userId}` : 'Loading user info...'}
        </Text>
        <Text style={tw`text-lg text-white mb-8 text-center`}>
          {registrationNumber ? `Registration Number: ${registrationNumber}` : 'Loading registration number...'}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={tw`bg-yellow-600 px-6 py-3 rounded-full`}
        >
          <Text onPress={() => navigation.navigate('bond')} style={tw`text-white text-center text-lg font-semibold`}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Home;
