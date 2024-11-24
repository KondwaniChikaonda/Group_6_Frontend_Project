import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const registrationNumber = await AsyncStorage.getItem('registrationNumber');
        const fullName = await AsyncStorage.getItem('fullName');

        // Logging fullName for debugging purposes
        console.log('Full Name:', fullName);

        // Setting state variables
        setUserId(id);
        setRegistrationNumber(registrationNumber);
        setFullName(fullName);
      } catch (error) {
        console.error('Error fetching user info from AsyncStorage:', error);
      }
    };

    getUserInfo();
  }, []);

  const handleSignOut = async () => {
    await AsyncStorage.clear(); // Clear stored user data
    navigation.navigate('Login'); // Navigate back to the login screen
  };

  return (
    <ImageBackground
       // Change this to a working URL
      style={tw`flex-1 bg-white  bg-cover`}
    >
      {/* Menu Bar */}

      <View style={tw`absolute top-5 right-5 flex-row`} > 
          

      <FontAwesome name="user" size={28} color="black" />
        
         <Text  style={tw ` mt-1`} >  {registrationNumber ? `${registrationNumber}` : 'Loading registration number...'} </Text>
         
         </View>

      <View style={tw`absolute z-50 top-5 left-5`}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <FontAwesome name="bars" size={28} color="black" />
        </TouchableOpacity>

        {menuOpen && (
          <View style={tw`bg-white rounded-lg shadow-lg p-3 mt-2`}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PersonalDetails')}
              style={tw`py-2`}
            >
              <Text style={tw`text-black text-base`}>Personal Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Bonding')}
              style={tw`py-2`}
            >
              <Text  style={tw`text-black text-ba`}>Bonding</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignOut}
              style={tw`py-2`}
            >
              <Text style={tw`text-red-500 text-base`}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Centered Image */}
      <View style={tw`items-center justify-center  mt-12`}>
        <Image
          source={require('./assets/logo.png')} // Background image
          style={tw`w-30 h-30 mb-2`} // Width and height for the image
          resizeMode="contain" // Ensure the image maintains aspect ratio
        />
      </View>

    
      <View style={tw`items-center justify-center mb-20`}>


      <Image
          source={require('./assets/pic.jpg')} // Background image
          style={tw`w-100 h-100 mb-2`} // Width and height for the image
          resizeMode="contain" // Ensure the image maintains aspect ratio
        />
     
      </View>

    

       {/* Centered Image */}
       <View style={tw`items-center justify-center fixed-bottom`}>
       <Text style={tw`font-bold text-black mb-1 text-sm text-center`}>
          All rights reserved
        </Text>
        <Text style={tw`font-bold text-black mb-1 text-sm `}>
          Loans Board Malawi
        </Text>
        <Text style={tw`font-bold text-black mb-1 text-sm `}>
          Reserved by all rights
        </Text>
        
      </View>
    </ImageBackground>
  );
};

export default Home;
