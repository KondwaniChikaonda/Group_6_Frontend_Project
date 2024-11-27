import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import axios from 'axios';
import tw from 'twrnc';

// Function to show messages (you can replace this with any custom notification)
const showMessage = (message) => {
  Alert.alert("Notification", message);  // For now, just show an alert
  // You can replace it with a Toast or any other custom notification component
};

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');



  const showNotice = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
      
    }, 8000);
  };



  const showNoticeUp = (message) => {

   setMessage(message);

   setTimeout(() => {
     setMessage('');
     navigation.navigate('Login'); 
   }, 5000);

  };




  const handleRegister = async () => {
   
    if (!email || !registrationNumber || !password || !fullname || !selectedInstitution) {
      showNotice("Please fill all fields to proceed.");
      return; 
    }

   
    const emailPrefix = email.split('@')[0];


    if (registrationNumber !== emailPrefix) {
      showNotice("Invalid registration number or school email.");
      return; 
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.ac\.mw$/;
    if (!emailRegex.test(email)) {
      showNotice("Please enter a valid school email address.");
      return; 
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    console.log(email);
    console.log(registrationNumber);
    console.log(password);
    console.log(selectedInstitution);
    console.log(fullname);

    try {
      const response = await axios.post('https://groub-6-backend-2.onrender.com/send-otp', {
        email,
        registrationNumber,
        password,
      });

      if (response.status === 200) {
        showNotice("Please check your email for the OTP.");
        setIsOtpSent(true);  
      }
    } catch (error) {
      showNotice("Please check your details and try again.");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post('https://groub-6-backend-2.onrender.com/verify-otp', {
        email,
        otp,
        password,
        registrationNumber,
        fullname,
        selectedInstitution,
      });

      if (response.status === 200) {
        showNoticeUp("Verification Successful! Your account has been verified. Redirecting to login page");
        
      } else {
        showNotice("Invalid OTP. Please try again.");
      }
    } catch (error) {
      showNotice("An error occurred during verification. Please try again.");
      console.error("OTP Verification error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <View style={tw`w-4/5 max-w-sm p-6 bg-white border border-yellow-500 rounded-lg shadow-lg items-center`}>
        <Text style={tw`text-black text-sm mb-6`}>Register to start your session</Text>

        
        {!isOtpSent && (
          <>
            <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
              <FontAwesome name="id-badge" size={20} color="gray" style={tw`mr-2`} />
              <TextInput
                placeholder="Full Name"
                style={tw`flex-1`}
                value={fullname}
                onChangeText={setFullname}
              />
            </View>

            <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
              <FontAwesome name="envelope" size={20} color="gray" style={tw`mr-2`} />
              <TextInput
                placeholder="Enter School Email"
                style={tw`flex-1`}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
              <FontAwesome name="id-badge" size={20} color="gray" style={tw`mr-2`} />
              <TextInput
                placeholder="Registration Number"
                style={tw`flex-1`}
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
              />
            </View>

            <View style={tw`flex-row items-center w-full p-3 mb-6 border border-gray-300 rounded`}>
              <FontAwesome name="lock" size={20} color="gray" style={tw`mr-2`} />
              <TextInput
                placeholder="Password"
                secureTextEntry
                style={tw`flex-1`}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={tw`flex-row items-center w-full p-3 mb-6 border border-gray-300 rounded`}>
              <FontAwesome name="university" size={20} color="gray" style={tw`mr-2`} />
              <Picker
                selectedValue={selectedInstitution}
                style={tw`w-full h-5`}
                onValueChange={(itemValue) => setSelectedInstitution(itemValue)}
              >
              <Picker.Item label="Select University" value="" />
              <Picker.Item label="University Of Malawi" value="University Of Malawi" />
              <Picker.Item label="Malawi University Of Business and Applied Science" value="Malawi University Of Business and Applied Science" />
              <Picker.Item label="Malawi University Of Science and Technology" value="Malawi University Of Science and Technology" />
              <Picker.Item label="Mzuzu University" value="Mzuzu University"/>
              <Picker.Item label="Lilongwe University Of Agriculture And Natural Resources " value ="Lilongwe University Of Agriculture And Natural Resources"/>
              <Picker.Item label="Catholic University " value ="Catholic University"/>
              <Picker.Item label="Domasi Colledge Of Education" value ="Domasi Colledge Of Education"/>
              <Picker.Item label="Nalikule Colldge of Education" value ="Nalikule Colldge of Education"/>
              <Picker.Item label="Malawi College Of Accountancy " value ="Malawi College Of Accountancy"/>
              <Picker.Item label="Malawi Assemblies Of God University " value ="Malawi Assemblies Of God University"/>
              </Picker>
            </View>

            <TouchableOpacity onPress={handleRegister} disabled={isSubmitting} style={tw`w-full bg-yellow-600 p-3 rounded`}>
              <Text style={tw`text-white text-center`}>{isSubmitting ? 'Processing...' : 'Register'}</Text>
            </TouchableOpacity>
          </>
        )}

      
        {isOtpSent && (
          <>
            <Text style={tw`text-black text-sm mb-6`}>Enter the OTP sent to your email</Text>
            <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
              <FontAwesome name="key" size={20} color="gray" style={tw`mr-2`} />
              <TextInput
                placeholder="Enter OTP"
                style={tw`flex-1`}
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity onPress={handleVerifyOtp} disabled={isSubmitting} style={tw`w-full bg-yellow-600 p-3 rounded`}>
              <Text style={tw`text-white text-center`}>{isSubmitting ? 'Processing...' : 'Verify'}</Text>
            </TouchableOpacity>
          </>
        )}
        {message ? <Text style={tw`text-red-500 mt-4`}>{message}</Text> : null}
      </View>
      

      <StatusBar style="auto" />
    </View>
  );
}
