import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import axios from 'axios';  // Import axios
import tw from 'twrnc';

export default function Reset() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual backend URL

      const response = await axios.post('https://groub-6-backend-2.onrender.com/api/users/reset-password-request', {

        email,
      });

      // Handle success response
      if (response.status === 200) {
        Alert.alert('Success', response.data.message || 'A reset link has been sent to your email.');
      } else {
        Alert.alert('Error', response.data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      // Handle error response
      Alert.alert('Error', error.response?.data?.message || 'Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>

      <View style={tw`w-4/5 max-w-sm p-6 bg-white border border-yellow-500 rounded-lg shadow-lg items-center`}>

        <Text style={tw`text-black text-sm mb-6`}>Sign in to start your session</Text>

        <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
          <FontAwesome name="user" size={20} color="gray" style={tw`mr-2`} />
          <TextInput
            placeholder="Enter Your Email"
            style={tw`flex-1`}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={tw`w-full bg-yellow-600 p-3 rounded`}
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          <Text style={tw`text-white text-center`}>{isLoading ? 'Sending...' : 'Send Email'}</Text>
        </TouchableOpacity>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}
