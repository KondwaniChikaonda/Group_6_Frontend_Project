import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import axios from 'axios';  // Import Axios

export default function ResetPassword() {
  const [token, setToken] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Capture token from URL parameters
    const getTokenFromUrl = async () => {
      const { queryParams } = Linking.parse(Linking.getInitialURL());
      if (queryParams && queryParams.token) {
        setToken(queryParams.token);
      } else {
        // Handle error or invalid token case
        Alert.alert('Error', 'Invalid or expired token');
      }
    };

    getTokenFromUrl();
  }, []);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      return Alert.alert('Error', 'Passwords do not match');
    }

    try {
      // Make the API call using Axios
      const response = await axios.post('http://localhost:3000/reset-password', {
        token,
        newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Your password has been reset');
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error) {
      // Handle error
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        Alert.alert('Error', error.response.data.message || 'Something went wrong');
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert('Error', 'Network error or no response from server');
      } else {
        // Something else went wrong
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={{ marginBottom: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Confirm new password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{ marginBottom: 20, borderBottomWidth: 1 }}
      />
      <Button title="Reset Password" onPress={handlePasswordReset} />
    </View>
  );
}
