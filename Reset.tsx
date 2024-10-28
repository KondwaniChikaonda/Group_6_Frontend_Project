import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import "./global.css";
import tw from 'twrnc';

export default function Reset() {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>

      <View style={tw`w-4/5 max-w-sm p-6 bg-white border border-yellow-500 rounded-lg shadow-lg items-center`}>

        <Text style={tw`text-black text-sm mb-6`}>Sign in to to start your session</Text>

        <View style={tw`flex-row items-center w-full p-3 mb-4 border border-gray-300 rounded`}>
          <FontAwesome name="user" size={20} color="gray" style={tw`mr-2`} />
          <TextInput
            placeholder="Enter Your Email"
            style={tw`flex-1`}
          />
        </View>


 
        <TouchableOpacity style={tw`w-full bg-yellow-600 p-3 rounded`}>
          <Text style={tw`text-white text-center`}>Send Email</Text>
        </TouchableOpacity>



      </View>
      
     
      <StatusBar style="auto" />
    </View>
  );
}
