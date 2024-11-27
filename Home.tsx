import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Image,  ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { FontAwesome,  MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const Home = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [bondingStatus, setbondingStatus] = useState('')
  const [fullName, setFullName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [detailsVisible, setDetailsVisible] = useState(false); 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formFilled, setFormFilled] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);


  const fetchNotifications = async () => {
    try {

      const response = await axios.get(`https://groub-6-backend-2.onrender.com/api/notifications/${userId}`);

      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };



  const fetchUserData = async () => {
    setLoading(true);
    try {


      const response = await axios.get(`https://groub-6-backend-2.onrender.com/api/user/${userId}`);

      setUserData(response.data);
      fetchNotifications();
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }

    const checkFormStatus = async () => {
      try {

        const response = await axios.get(`https://groub-6-backend-2.onrender.com/check-form-status/${userId}`);

        setFormFilled(response.data.formFilled);
      } catch (error) {
        console.error('Error fetching form status:', error);
      }
    };

    checkFormStatus();
  };




  useEffect(() => {



    if (userId) {
      fetchNotifications();
    }


    if (detailsVisible) {
      fetchUserData();
      fetchNotifications();
    }


    const getUserInfo = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const registrationNumber = await AsyncStorage.getItem('registrationNumber');
        const fullName = await AsyncStorage.getItem('fullName');
        fetchNotifications();
        setUserId(id);
        setRegistrationNumber(registrationNumber);
        setFullName(fullName);
      } catch (error) {
        console.error('Error fetching user info from AsyncStorage:', error);
      }
    };

    getUserInfo();
  }, [detailsVisible]);

  const handleSignOut = async () => {
    await AsyncStorage.clear(); 
    navigation.navigate('Login'); 
  };


  const handleNotificationPress = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      await fetchNotifications();
    }
  };

  return (
    <ImageBackground
      style={tw`flex-1 bg-white bg-cover`}
    >
      {/* Menu Bar */}

      <View style={tw`absolute top-5 right-5 z-50`}>
      <TouchableOpacity onPress={handleNotificationPress} style={tw`relative`}>
          <MaterialIcons name="notifications" size={28} color="black" />
          {notifications.length > 0 && (
            <View
              style={tw`absolute -top-2 -right-2 bg-red-500 rounded-full h-5 w-5 items-center justify-center`}
            >
              <Text style={tw`text-white text-xs font-bold`}>{notifications.length}</Text>
            </View>
          )}
        </TouchableOpacity>


  {showNotifications && (
          <View style={tw`absolute top-10 right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-64 max-h-96`}>
            {notifications.length > 0 ? (
              
              <View>
              {notifications.map((notif, index) => (
                <Text key={index} style={tw`text-black p-2`}>
                  {notif.message}
                </Text>
              ))}
            </View>      
      
            ) : (
              <View style={tw`p-3`}>
                <Text style={tw`text-gray-500 text-sm`}>No notifications</Text>
              </View>
            )}
          </View>
        )}
</View>



      <View style={tw`absolute z-50 top-5 left-5`}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <FontAwesome name="bars" size={28} color="black" />
        </TouchableOpacity>

        
      


        {menuOpen && (
  <View style={tw`bg-white rounded-lg shadow-lg p-3 mt-2`}>
    <TouchableOpacity
      onPress={() => {
        setDetailsVisible(true); 
        setMenuOpen(false);
      }}
      style={tw`flex-row items-center py-2`}
    >
      <FontAwesome name="user" size={16} color="black" style={tw`mr-2`} />
      <Text style={tw`text-black text-base`}>Personal Details</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => navigation.navigate('Bonding')}
      style={tw`flex-row items-center py-2`}
    >
      <FontAwesome name="file-text-o" size={16} color="black" style={tw`mr-2`} />
      <Text style={tw`text-black text-base`}>Bonding Application</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={handleSignOut}
      style={tw`flex-row items-center py-2`}
    >
      <FontAwesome name="sign-out" size={16} color="red" style={tw`mr-2`} />
      <Text style={tw`text-red-500 text-base`}>Sign Out</Text>
    </TouchableOpacity>
  </View>
)}

      </View>

   

      
     
      {detailsVisible && (
  <View style={tw`absolute top-0 left-0 h-full bg-white shadow-lg w-80 p-5 z-50`}>
    {/* Close Button */}
    <TouchableOpacity onPress={() => setDetailsVisible(false)}>
      <FontAwesome name="close" size={24} color="black" style={tw`self-end mb-4`} />
    </TouchableOpacity>

    {/* Header */}
    <Text style={tw`text-center text-2xl font-bold mb-6 text-yellow-600`}>
      <FontAwesome name="id-card" size={24} color="gold" style={tw`mr-2`} />
      Personal Details
    </Text>

    {/* Loading Indicator */}
    {loading ? (
      <ActivityIndicator size="large" color="blue" />
    ) : (
      <>
        {/* Full Name */}
        <View style={tw`mb-4 flex-row items-center`}>
          <FontAwesome name="user" size={20} color="gray" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-gray-600 text-base`}>Full Name:</Text>
            <Text style={tw`text-black text-lg font-medium`}>
              {userData?.fullname || 'Not Available'}
            </Text>
          </View>
        </View>

        {/* Email */}
        <View style={tw`mb-4 flex-row items-center`}>
          <MaterialIcons name="email" size={20} color="gray" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-gray-600 text-base`}>Email:</Text>
            <Text style={tw`text-black text-lg font-medium`}>
              {userData?.email || 'Not Available'}
            </Text>
          </View>
        </View>

        {/* Registration Number */}
        <View style={tw`mb-4 flex-row items-center`}>
          <FontAwesome name="hashtag" size={20} color="gray" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-gray-600 text-base`}>Registration Number:</Text>
            <Text style={tw`text-black text-lg font-medium`}>
              {userData?.registration_number || 'Not Available'}
            </Text>
          </View>
        </View>

        {/* Institution */}
        <View style={tw`mb-4 flex-row items-center`}>
          <FontAwesome name="university" size={20} color="gray" style={tw`mr-3`} />
          <View>
            <Text style={tw`text-gray-600 text-base`}>Institution:</Text>
            <Text style={tw`text-black text-lg font-medium`}>
              {userData?.institution || 'Not Available'}
            </Text>
          </View>
        </View>

        {/* Bonding Status */}
        <View style={tw`flex-row items-center`}>
          <FontAwesome name="check-circle" size={20} color={formFilled ? 'green' : 'red'} style={tw`mr-3 mt-2`} />
          <View>
            <Text style={tw`text-gray-600 text-base`}>Bonding Status:</Text>
            <Text style={tw`text-black text-lg font-medium`}>
              {formFilled ? 'Bonded' : 'Not Bonded'}
            </Text>
          </View>
        </View>
      </>
    )}
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

      
{/* Welcome Section */}
<View style={tw`items-center justify-center mb-16`}>
  {/* Card-Like Welcome Section */}
  <View style={tw`w-11/12 bg-white rounded-lg shadow-2xl p-6`}>
    {/* Title */}
    <Text style={tw`font-extrabold text-xl text-gray-800 text-center mb-4`}>
      Welcome to the Loans Bonding System Portal
    </Text>

    {/* Divider */}
    <View style={tw`h-1 w-16 bg-yellow-400 mx-auto mb-4 rounded-full`} />

    {/* Image */}
    <View style={tw`items-center`}>
      <Image
        source={require('./assets/pic.jpg')}
        style={tw`w-48 h-48 rounded-full border-4 border-yellow-400 shadow-md`}
        resizeMode="cover"
      />
    </View>
  </View>
</View>


{/* Footer */}
<View style={tw`absolute bottom-0 w-full bg-gray-100 py-4`}>
  <View style={tw`border-t border-gray-300 py-2`}>
    <Text style={tw`text-gray-600 text-sm text-center`}>
      © 2024 Automated Loans Bonding System. All rights reserved.
    </Text>
    <Text style={tw`text-gray-600 text-sm text-center`}>
      Crafted for seamless bonding experiences.
    </Text>
  </View>
</View>

    </ImageBackground>
  );
};

export default Home;
