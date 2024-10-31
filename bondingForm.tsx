import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';

const BondingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    SurName: '',
    FirstName: '',
    OtherName: '',
    dob: '',
    Village: '',
    Traditional: '',
    District: '',
    PostalAddress: '',
    PhoneNumber: '',
    Email: '',
    BankName: '',
    Branch: '',
  });

  const steps = [
    {
      title: "Step 1: Student's Personal Details",
      content: (
        <>
          <TextInput
            placeholder="First Name"
            value={formData.SurName}
            onChangeText={(text) => setFormData({ ...formData, SurName: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
           <TextInput
            placeholder="First Name(s)"
            value={formData.FirstName}
            onChangeText={(text) => setFormData({ ...formData, FirstName: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
             <TextInput
            placeholder="Other Name(s)"
            value={formData.OtherName}
            onChangeText={(text) => setFormData({ ...formData, OtherName: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
             <TextInput
            placeholder="Date of Birth"
            value={formData.dob}
            onChangeText={(text) => setFormData({ ...formData, dob: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
          <TextInput
            placeholder="Home Village"
            secureTextEntry
            value={formData.Village}
            onChangeText={(text) => setFormData({ ...formData, Village: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
            <TextInput
            placeholder="Traditional Authority"
          
            value={formData.Traditional}
            onChangeText={(text) => setFormData({ ...formData, Traditional: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
            <TextInput
            placeholder="Select Distict"
         
            value={formData.Village}
            onChangeText={(text) => setFormData({ ...formData, District: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
            <TextInput
            placeholder="Postal Address"
     
            value={formData.PostalAddress}
            onChangeText={(text) => setFormData({ ...formData, PostalAddress: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
            <TextInput
            placeholder="Phone Number"
 
            value={formData.PhoneNumber}
            onChangeText={(text) => setFormData({ ...formData, PhoneNumber: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
            <TextInput
            placeholder="Email"
            value={formData.Email}
            onChangeText={(text) => setFormData({ ...formData, Email: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
        </>
      ),
    },
    {
      title: "Step 2: Student's Bank Details",
      content: (
        <>
          <TextInput
            placeholder="Bank Name"
            value={formData.BankName}
            onChangeText={(text) => setFormData({ ...formData, BankName: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
          <TextInput
            placeholder="Branch"
            value={formData.Branch}
            onChangeText={(text) => setFormData({ ...formData, Branch: text })}
            style={tw`h-10 border border-gray-300 rounded p-2`}
          />
        </>
      ),
    },






    {
        title: "Step 2: Student's Bank Details",
        content: (
          <>
            <TextInput
              placeholder="Bank Name"
              value={formData.BankName}
              onChangeText={(text) => setFormData({ ...formData, BankName: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            />
            <TextInput
              placeholder="Branch"
              value={formData.Branch}
              onChangeText={(text) => setFormData({ ...formData, Branch: text })}
              style={tw`h-10 border border-gray-300 rounded p-2`}
            />
          </>
        ),
      },
    // You can add more steps as needed
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-6 justify-center`}>
      <Text style={tw`text-xl font-bold mb-4`}>{steps[currentStep].title}</Text>
      {steps[currentStep].content}
      <View style={tw`flex-row justify-between mt-4`}>
        <TouchableOpacity 
          onPress={previousStep} 
          disabled={currentStep === 0}
          style={tw`bg-gray-300 p-3 rounded ${currentStep === 0 ? 'opacity-50' : ''}`}
        >
          <Text style={tw`text-center text-black`}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={nextStep} 
          disabled={currentStep === steps.length - 1}
          style={tw`bg-yellow-600 p-3 rounded ${currentStep === steps.length - 1 ? 'opacity-50' : ''}`}
        >
          <Text style={tw`text-center text-white`}>{currentStep === steps.length - 1 ? 'Submit' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BondingForm;
