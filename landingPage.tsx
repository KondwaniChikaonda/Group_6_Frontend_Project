import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";
import Background from "./Background";

const LandingPage: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to Our App!");

  useEffect(() => {
    const fetchMessage = async () => {
      const savedMessage = await AsyncStorage.getItem("welcomeMessage");
      if (savedMessage) setWelcomeMessage(savedMessage);
    };
    fetchMessage();
  }, []);

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Background Component */}
      <Background>
        {/* Welcome Section */}
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-white text-4xl font-extrabold text-center mb-4`}>
            Automated Loan Bonding System
          </Text>
          <Text style={tw`text-gray-300 text-lg text-center`}>
            Global Solutions for Seamless Loan Management
          </Text>
        </View>

        {/* Icon Centerpiece */}
        <View style={tw`items-center pb-10`}>
          <FontAwesome name="globe" size={50} color="white" />
        </View>
      </Background>

      {/* Navigation Buttons */}
      <View
        style={[
          tw`absolute top-0 right-0 flex-row justify-end p-5`,
          { zIndex: 10 },
        ]}
      >
        <TouchableOpacity
          style={tw`bg-yellow-600 px-4 py-2 rounded-full mx-2 shadow-lg`}
          onPress={() => navigation?.navigate("Login")}
        >
          <Text style={tw`text-white font-bold`}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-gray-600 px-4 py-2 rounded-full shadow-lg`}
          onPress={() => navigation?.navigate("Register")}
        >
          <Text style={tw`text-white font-bold`}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={tw`absolute bottom-5 w-full items-center`}>
        <Text style={tw`text-gray-700 text-sm text-center`}>
          Empowering Financial Solutions Worldwide
        </Text>
        <Text style={tw`text-gray-500 text-xs`}>
          © 2024 Automated Loan Bonding System. All Rights Reserved.
        </Text>
      </View>
    </View>
  );
};

export default LandingPage;
