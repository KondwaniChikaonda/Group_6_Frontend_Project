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
    <View style={{ flex: 1 }}>
      <Background>

        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-white text-3xl font-bold text-center`}>
            Welcome to Automated Loan Bonding System
          </Text>
          <Text style={tw`text-gray-300 text-base mt-2 text-center`}>
            Experience the best services with us!
          </Text>
        </View>

       
        <View style={tw`items-center pb-10`}>
          <FontAwesome name="rocket" size={40} color="white" />
        </View>
      </Background>

    
      <View
        style={[
          tw`absolute top-0 right-0 flex-row justify-end p-5`,
          { zIndex: 10 },
        ]}
      >
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
    </View>
  );
};

export default LandingPage;
