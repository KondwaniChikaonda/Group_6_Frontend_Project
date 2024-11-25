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
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const [detailsVisible, setDetailsVisible] = useState(false); // State to toggle personal details popup
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formFilled, setFormFilled] = useState(null);
  const [notifications, setNotifications] = useState([]);


  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/notifications/${userId}`);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };



  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }

    const checkFormStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/check-form-status/${userId}`);
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
    }


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
  }, [detailsVisible]);

  const handleSignOut = async () => {
    await AsyncStorage.clear(); // Clear stored user data
    navigation.navigate('Login'); // Navigate back to the login screen
  };

  return (
    <ImageBackground
      style={tw`flex-1 bg-white bg-cover`}
    >
      {/* Menu Bar */}

      <View style={tw`absolute top-5 right-5 z-50`}>
  <TouchableOpacity onPress={fetchNotifications} style={tw`relative`}>
    <MaterialIcons name="notifications" size={28} color="black" />
    {notifications.length > 0 && (
      <View
        style={tw`absolute -top-2 -right-2 bg-red-500 rounded-full h-5 w-5 items-center justify-center`}
      >
        <Text style={tw`text-white text-xs font-bold`}>{notifications.length}</Text>
      </View>
    )}
  </TouchableOpacity>
</View>



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

      {/* Left Side Pop-Up Frame */}

      
     
      
      {detailsVisible && (
        <View style={tw`absolute top-0 left-0 h-full bg-white shadow-lg w-80 p-5 z-50`}>
          <TouchableOpacity onPress={() => setDetailsVisible(false)}>
            <FontAwesome name="close" size={24} color="black" style={tw`self-end mb-4`} />
          </TouchableOpacity>
          <Text style={tw`text-center text-xl font-bold mb-6 text-yellow-600`}>
            Personal Details
          </Text>
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <>
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 text-base`}>Full Name:</Text>
                <Text style={tw`text-black text-lg font-medium`}>
                  {userData?.fullname || 'Not Available'}
                </Text>
              </View>
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 text-base`}>Email:</Text>
                <Text style={tw`text-black text-lg font-medium`}>
                  {userData?.email || 'Not Available'}
                </Text>
              </View>
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 text-base`}>Registration Number:</Text>
                <Text style={tw`text-black text-lg font-medium`}>
                  {userData?.registration_number || 'Not Available'}
                </Text>
              </View>
              <View>
                <Text style={tw`text-gray-600 text-base`}>Bonding Status:</Text>
                <Text style={tw`text-black text-lg font-medium`}>
                {formFilled ? 'Bonded' : 'Not bonded'}

                </Text>
              </View>
            </>
          )}
        </View>
      )}

   
    


    </ImageBackground>
  );
};

export default Home;
