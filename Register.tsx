import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';
import tw from 'twrnc';

// Google OAuth Constants
const CLIENT_ID = '565825441814-874q2gs0ai134ob16o67puqfpshlvq05.apps.googleusercontent.com'; // Replace with your Google API client ID
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessToken, setAccessToken] = useState(null);  // Added state to store the access token

  // Google OAuth authentication request
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      scopes: ['https://www.googleapis.com/auth/classroom.rosters.readonly'],
      responseType: 'token',
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      setAccessToken(access_token);  // Store the access token in the state
      console.log('Authentication succeeded:', access_token);
    }
  }, [response]);

  // Trigger Google OAuth
  const authenticateWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error("Authentication error:", error);
      Alert.alert("Authentication Error", "Please try again later.");
    }
  };

  // Fetch students from Google Classroom
  const fetchStudents = async (classroomId, token) => {
    try {
      const response = await axios.get(
        `https://classroom.googleapis.com/v1/courses/${classroomId}/students`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const students = response.data.students.map((student) => ({
        name: student.profile.name.fullName,
        registrationNumber: student.profile.emailAddress.split('@')[0], // Assuming registration number is part of the email
      }));

      return students;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  };

  // Validate Registration Number with Google Classroom
  const validateRegistrationNumber = async () => {
    try {
      if (!accessToken) {
        Alert.alert("Authentication Error", "You must authenticate with Google first.");
        return false;
      }
      
      const classroomId = 'uxvktpd'; // Replace with your Classroom ID
      const students = await fetchStudents(classroomId, accessToken);

      const isValid = students.some(
        (student) => student.registrationNumber === registrationNumber
      );

      return isValid;
    } catch (error) {
      console.error("Validation error:", error);
      throw error;
    }
  };

  // Handle Registration
  const handleRegister = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!email || !registrationNumber || !password || !selectedInstitution) {
      Alert.alert("Invalid Input", "Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Validate the registration number with Google Classroom
      const isValid = await validateRegistrationNumber();

      if (!isValid) {
        Alert.alert(
          "Invalid Registration Number",
          "Your registration number does not match our records."
        );
        setIsSubmitting(false);
        return;
      }

      // If validation succeeds, send OTP
      const response = await axios.post('http://localhost:3000/send-otp', {
        email,
        registrationNumber,
        password,
      });

      if (response.status === 200) {
        Alert.alert("OTP Sent", "Please check your email for the OTP.");
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Registration Failed", "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('https://groub-6-backend.onrender.com/verify-otp', {
        email,
        otp,
        password,
        registrationNumber,
      });

      if (response.status === 200) {
        Alert.alert("Verification Successful", "Your account has been verified!");
        navigation.navigate('Login');
      } else {
        Alert.alert("Verification Failed", "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification error:", error);
      Alert.alert("Verification Error", "An error occurred. Please try again.");
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
                style={tw`w-full h-5`}
                onValueChange={(itemValue) => setSelectedInstitution(itemValue)}
              >
                <Picker.Item label="Select Institution" value="" />
                <Picker.Item label="University of Malawi" value="institutionA" />
                <Picker.Item label="Malawi University of Business and Applied Science" value="institutionB" />
                <Picker.Item label="Malawi University of Science and Technology" value="institutionC" />
              </Picker>
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              disabled={isSubmitting}
              style={tw`w-full bg-yellow-600 p-3 rounded`}
            >
              <Text style={tw`text-white text-center`}>{isSubmitting ? 'Processing...' : 'Register'}</Text>
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

            <TouchableOpacity
              onPress={handleVerifyOtp}
              style={tw`w-full bg-yellow-600 p-3 rounded`}
            >
              <Text style={tw`text-white text-center`}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Google Authentication */}
        <TouchableOpacity
          onPress={authenticateWithGoogle}
          style={tw`mt-6 bg-blue-600 p-3 rounded`}
        >
          <Text style={tw`text-white text-center`}>Sign Up with Google</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}
