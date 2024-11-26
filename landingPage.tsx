import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";
import Background from "./Background"; // Import the reusable Background component

const LandingPage: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to Our App!");

  // Fetch welcome message from AsyncStorage
  useEffect(() => {
    const fetchMessage = async () => {
      const savedMessage = await AsyncStorage.getItem("welcomeMessage");
      if (savedMessage) setWelcomeMessage(savedMessage);
    };
    fetchMessage();
  }, []);

  return (
    <Background>
      {/* Top Right Buttons */}
      <View style={tw`flex-row justify-end p-5`}>
        <TouchableOpacity
          style={tw`bg-yellow-600 px-4 py-2 rounded-full mx-2`}
          onPress={() => navigation?.navigate("Login")}
        >
          <Text style={tw`text-white font-bold`}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-yellow-600 px-4 py-2 rounded-full`}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={tw`text-white font-bold`}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-white text-3xl font-bold text-center`}>
          Welcome to Automated Loan Bonding System
        </Text>
        <Text style={tw`text-gray-300 text-base mt-2 text-center`}>
          Experience the best services with us!
        </Text>
      </View>

      {/* Footer Icon */}
      <View style={tw`items-center pb-10`}>
        <FontAwesome name="rocket" size={40} color="white" />
      </View>
    </Background>
  );
};

export default LandingPage;
