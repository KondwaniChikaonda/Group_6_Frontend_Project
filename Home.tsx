import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [bondingStatus, setbondingStatus] = useState('')
  const [fullName, setFullName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const [detailsVisible, setDetailsVisible] = useState(false); // State to toggle personal details popup

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const registrationNumber = await AsyncStorage.getItem('registrationNumber');
        const fullName = await AsyncStorage.getItem('fullName');

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
      style={tw`flex-1 bg-white bg-cover`}
    >
      {/* Menu Bar */}
      <View style={tw`absolute z-50 top-5 left-5`}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <FontAwesome name="bars" size={28} color="black" />
        </TouchableOpacity>

        {menuOpen && (
          <View style={tw`bg-white rounded-lg shadow-lg p-3 mt-2`}>
            <TouchableOpacity
              onPress={() => {
                setDetailsVisible(true); // Show personal details pop-up
                setMenuOpen(false); // Close menu
              }}
              style={tw`py-2`}
            >
              <Text style={tw`text-black text-base`}>Personal Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Bonding')}
              style={tw`py-2`}
            >
              <Text style={tw`text-black text-base`}>Bonding</Text>
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

      {/* Left Side Pop-Up Frame */}
      {detailsVisible && (
        <View style={tw`absolute top-0 left-0 h-full bg-white shadow-lg w-80 p-5 z-50`}>
          <TouchableOpacity onPress={() => setDetailsVisible(false)}>
            <FontAwesome name="close" size={24} color="black" style={tw`self-end mb-4`} />
          </TouchableOpacity>
          <Text style={tw`text-center text-xl font-bold mb-6 text-yellow-600`}>Personal Details</Text>
          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-600 text-base`}>Full Name:</Text>
            <Text style={tw`text-black text-lg font-medium`}>{fullName || 'Loading...'}</Text>
          </View>
          <View style={tw`mb-4`}>
            <Text style={tw`text-gray-600 text-base`}>Email:</Text>
            <Text style={tw`text-black text-lg font-medium`}>{userId || 'Loading...'}</Text>
          </View>
          <View>
            <Text style={tw`text-gray-600 text-base`}>Registration Number:</Text>
            <Text style={tw`text-black text-lg font-medium`}>
              {registrationNumber || 'Loading...'}
            </Text>
          </View>
          <View>
            <Text style={tw`text-gray-600 text-base`}>Bonding status:</Text>
            <Text style={tw`text-black text-lg font-medium`}>
              {bondingStatus || 'Active'}
            </Text>
          </View>
        </View>
      )}

      {/* Centered Image */}
      <View style={tw`items-center justify-center mt-12`}>
        <Image
          source={require('./assets/logo.png')}
          style={tw`w-30 h-30 mb-2`}
          resizeMode="contain"
        />
      </View>
      <View style={tw`items-center justify-center mb-20`}>


<Image
    source={require('./assets/pic.jpg')} // Background image
    style={tw`w-100 h-100 mb-2`} // Width and height for the image
    resizeMode="contain" // Ensure the image maintains aspect ratio
  />

</View>

      {/* Footer */}
      <View style={tw`absolute bottom-5 w-full items-center`}>
        <Text style={tw`font-bold text-black text-sm text-center`}>All rights reserved</Text>
        <Text style={tw`font-bold text-black text-sm`}>Loans Board Malawi</Text>
        <Text style={tw`font-bold text-black text-sm`}>Reserved by all rights</Text>
      </View>
    </ImageBackground>
  );
};

export default Home;
