import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import axios from 'axios';
import tw from 'twrnc';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleRegister = async () => {


      console.log(email);
      console.log(registrationNumber);
      console.log(password);
      console.log(selectedInstitution);

    try {
      const response = await axios.post('http://localhost:3000/send-otp', {
        email,
        registrationNumber,
        password,
      });

      if (response.status === 200) {
        Alert.alert("OTP Sent", "Please check your email for the OTP.");
        setIsOtpSent(true);  // Show OTP input field
      }
    } catch (error) {
      Alert.alert("Registration Failed", "Please check your details and try again.");
      console.error("Registration error:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/verify-otp', {
        email,
        otp,
        password,
        registrationNumber,
      });

      if (response.status === 200) {
        Alert.alert("Verification Successful", "Your account has been verified!");
        navigation.navigate('Home');
      } else {
        Alert.alert("Verification Failed", "Invalid OTP. Please try again.");
      }
    } catch (error) {
      Alert.alert("Verification Error", "An error occurred. Please try again.");
      console.error("OTP Verification error:", error);
    }
  };

  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <View style={tw`w-4/5 max-w-sm p-6 bg-white border border-yellow-500 rounded-lg shadow-lg items-center`}>
        <Text style={tw`text-black text-sm mb-6`}>Register to start your session</Text>

        {/* Registration Fields */}
        {!isOtpSent && (
          <>
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
                style={tw`flex-1`}
                onValueChange={(itemValue) => setSelectedInstitution(itemValue)}
              >
                <Picker.Item label="Select Institution" value="" />
                <Picker.Item label="University of Malawi" value="institutionA" />
                <Picker.Item label="Malawi University of Business and Applied Science" value="institutionB" />
                <Picker.Item label="Malawi University of Science and Technology" value="institutionC" />
              </Picker>
            </View>

            <TouchableOpacity onPress={handleRegister} style={tw`w-full bg-yellow-600 p-3 rounded`}>
              <Text style={tw`text-white text-center`}>Register</Text>
            </TouchableOpacity>
          </>
        )}

        {/* OTP Verification Field */}
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

            <TouchableOpacity onPress={handleVerifyOtp} style={tw`w-full bg-yellow-600 p-3 rounded`}>
              <Text style={tw`text-white text-center`}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
