import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const BondingForm = ({ navigation }) => {
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
    BankAccountNumber: '',
    BankAccountName: '',
    FullName: '',
    postalAddress: '',
    PhysicalAddress: '',
    HomeVillage: '',
    Occupation: '',
    PhoneNumberParents: '',
    UniversityName: '',
    ProgramOfStudy: '',
    RegistrationNumber: '',
    AcademicYear: '',
    YearOfStudy: '',
    Sex: '',
    PostalAddressParents: '',
    PhysicalAddressParents: '',
    HomeVillageParents: '',
    DistrictParents: '',
    EmailParents: '',
    Tuition: '',
    Upkeep: '',
  });

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);




  const [userId, setUserId] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState(null);
  const [formFilled, setFormFilled] = useState(null);

  useEffect(() => {



    const checkFormStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/check-form-status/${userId}`);
        setFormFilled(response.data.formFilled);
      } catch (error) {
        console.error('Error fetching form status:', error);
      }
    };

    checkFormStatus();


    const getUserInfo = async () => {
      const id = await AsyncStorage.getItem('userId');
      const registrationNumber = await AsyncStorage.getItem('registrationNumber');
      setUserId(id);
      setRegistrationNumber(registrationNumber);
    };

    getUserInfo();
  }, [userId]);


   if(userId){
    console.log(userId);

   }




   if (formFilled) {
    // Show message if the form is already submitted
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-lg text-green-600`}>
          You have already bonded!.
        </Text>
      </View>
    );
  }





  const steps = [
    {
   
      title: (
        <>
          <View style={tw `flex`} >

         <View    style={tw`flex-row items-center justify-start p-2 `} > 
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')} // Ensure navigation is set up
           
              >
            <Text style={tw`text-sm text-white bg-yellow-600 p-2 rounded-md`}>Home</Text>
          </TouchableOpacity>
          </View>    
    
          {/* Title */}
          <Text style={tw`text-lg font-bold`}>Step 1: Student's Personal Details</Text>
        </View>
        </>
      ),
      content: (
        <>

<View style={tw`flex-row items-center justify-center mb-2`}>
      <Icon name="spinner" size={16} color="green" style={tw`mr-2`} />
      <Text style={tw`text-sm text-green-600 text-center`}>Bonding in Progress</Text>
    </View>
          <View style={tw`flex flex-row justify-between`}>
            <View style={tw`mr-2 w-1/2`}>
              <Text style={tw`text-sm`}>Surname</Text>
              <TextInput
                value={formData.SurName}
                onChangeText={(text) => setFormData({ ...formData, SurName: text })}
                style={tw`h-10 w-full border border-gray-300 rounded p-2 mb-1`}
              />
            </View>
            <View style={tw`w-1/2`}>
              <Text style={tw`text-sm`}>First Name</Text>
              <TextInput
                value={formData.FirstName}
                onChangeText={(text) => setFormData({ ...formData, FirstName: text })}
                style={tw`h-10 w-full border border-gray-300 rounded p-2 mb-1`}
              />
            </View>
          </View>
          <View style={tw`flex flex-row justify-between`}>
            <View style={tw`mr-2 w-1/2`}>
              <Text style={tw`text-sm`}>Other Name</Text>
              <TextInput
                value={formData.OtherName}
                onChangeText={(text) => setFormData({ ...formData, OtherName: text })}
                style={tw`h-10 border w-full border-gray-300 rounded p-2 mb-1`}
              />
            </View>
            <View style={tw`w-1/2`}>
              <Text style={tw`text-sm`}>Date of Birth</Text>
              <TextInput
                value={formData.dob}
                onChangeText={(text) => setFormData({ ...formData, dob: text })}
                style={tw`h-10 w-full border border-gray-300 rounded p-2 mb-1`}
              />
            </View>
          </View>

          <View style={tw`w-full`}>
            <Text style={tw`text-sm`}>Postal Address</Text>
            <TextInput
              value={formData.PostalAddress}
              onChangeText={(text) => setFormData({ ...formData, PostalAddress: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-1`}
            />
          </View>

          <View style={tw`flex flex-row justify-between`}>
            <View style={tw`mr-2 w-1/2`}>
              <Text style={tw`text-sm`}>Home Village</Text>
              <TextInput
                value={formData.Village}
                onChangeText={(text) => setFormData({ ...formData, Village: text })}
                style={tw`h-10 border border-gray-300 rounded p-2 mb-1`}
              />
            </View>

            <View style={tw`w-1/2`}>
              <Text style={tw`text-sm`}>Sex</Text>
              <Picker
                selectedValue={formData.Sex}
                onValueChange={(itemValue) => setFormData({ ...formData, Sex: itemValue })}
                style={tw`h-10 border border-gray-300 rounded p-2 mb-1`}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
          </View>

          <View style={tw`flex flex-row justify-between`}>
            <View style={tw`mr-2 w-1/2`}>
              <Text style={tw`text-sm`}>Traditional Authority</Text>
              <TextInput
                value={formData.Traditional}
                onChangeText={(text) => setFormData({ ...formData, Traditional: text })}
                style={tw`h-10 border w-full border-gray-300 rounded p-2 mb-1`}
              />
            </View>

            <View style={tw`w-1/2`}>
              <Text style={tw`text-sm`}>District</Text>
              <Picker
                selectedValue={formData.District}
                onValueChange={(itemValue) => setFormData({ ...formData, District: itemValue })}
                style={tw`h-10 border border-gray-300 rounded p-2 mb-1`}
              >
                <Picker.Item label="Select District" value="" />
                <Picker.Item label="Blantyre" value="Blantyre" />
                <Picker.Item label="Thyolo" value="Thyolo" />
                <Picker.Item label="Mzimba" value="Mzimba" />
                <Picker.Item label="Lilongwe" value="Lilongwe" />
                <Picker.Item label="Zomba" value="Zomba" />
                <Picker.Item label="Ntcheu" value="Ntcheu" />
                <Picker.Item label="Dedza" value="Dedza" />
              </Picker>
            </View>
          </View>

          <View style={tw`flex flex-row justify-between`}>
            <View style={tw`mr-2 w-1/2`}>
              <Text style={tw`text-sm`}>Phone Number</Text>
              <TextInput
                value={formData.PhoneNumber}
                onChangeText={(text) => setFormData({ ...formData, PhoneNumber: text })}
                style={tw`h-10 w-full border border-gray-300 rounded p-2 mb-1 mr-2`}
              />
            </View>

            <View style={tw`w-1/2`}>
              <Text style={tw`text-sm`}>Email</Text>
              <TextInput
                value={formData.Email}
                onChangeText={(text) => setFormData({ ...formData, Email: text })}
                style={tw`h-10 w-full border border-gray-300 rounded p-2 mb-1`}
              />
            </View>
          </View>
        </>
      ),
    },



      
    {
      title: (
        <>
          <View style={tw `flex`} >

         <View    style={tw`flex-row items-center justify-start mb-1 p-2 `} > 
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')} // Ensure navigation is set up
           
              >
            <Text style={tw`text-sm text-white bg-yellow-600 p-2 rounded-md`}>Home</Text>
          </TouchableOpacity>
          </View>    
    
          {/* Title */}
          <Text style={tw`text-lg font-bold`}>Step 2: Student's Bank Details</Text>
        </View>
        </>
      ),
      content: (
        <>

<View style={tw`flex-row items-center justify-center mb-2`}>
      <Icon name="spinner" size={16} color="green" style={tw`mr-2`} />
      <Text style={tw`text-sm text-green-600 text-center`}>Bonding in Progress</Text>
    </View>
      <Text style={tw`text-sm`}>Bank Name</Text>
          <TextInput
            value={formData.BankName}
            onChangeText={(text) => setFormData({ ...formData, BankName: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />


<Text style={tw`text-sm`}>Bank Branch</Text>
          <TextInput
            value={formData.Branch}
            onChangeText={(text) => setFormData({ ...formData, Branch: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />


<Text style={tw`text-sm`}>Account Number</Text>
           <TextInput
            value={formData.BankAccountNumber}
            onChangeText={(text) => setFormData({ ...formData, BankAccountNumber: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />


<Text style={tw`text-sm`}>Bank Account Name</Text>
          <TextInput
            value={formData.BankAccountName}
            onChangeText={(text) => setFormData({ ...formData, BankAccountName: text })}
            style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
          />
        </>
        
        
      ),
    },
    

  



  
    {
      

        title: (
          <>
            <View style={tw `flex`} >
  
           <View    style={tw`flex-row items-center justify-start mb-1 p-2 `} > 
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')} // Ensure navigation is set up
             
                >
              <Text style={tw`text-sm text-white bg-yellow-600 p-2 rounded-md`}>Home</Text>
            </TouchableOpacity>
            </View>    
      
            {/* Title */}
            <Text style={tw`text-lg font-bold`}>Step 3: Parents/Guardian Details</Text>
          </View>
          </>
        ),
        content: (
          <>


<View style={tw`flex-row items-center justify-center mb-2`}>
      <Icon name="spinner" size={16} color="green" style={tw`mr-2`} />
      <Text style={tw`text-sm text-green-600 text-center`}>Bonding in Progress</Text>
    </View>
       <View style={tw`flex flex-row justify-between`}>

      <View style={tw`mr-2 w-1/2`}>

     <Text style={tw`text-sm`}>Full Name</Text>           
            <TextInput
          
              value={formData.FullName}
              onChangeText={(text) => setFormData({ ...formData, FullName: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            />
         </View>  

    

         
    <View style={tw`mr-2 w-1/2`}>

     <Text style={tw`text-sm`}>Occupation</Text>  
              <TextInput
              value={formData.Occupation}
              onChangeText={(text) => setFormData({ ...formData, Occupation: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
              />
         </View>     
    </View>          
       
    <Text style={tw`text-sm`}>Postal Address</Text>  
            <TextInput
              value={formData.PostalAddressParents}
              onChangeText={(text) => setFormData({ ...formData, PostalAddressParents: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            />
     
   <Text style={tw`text-sm`}>Physical Address</Text>  
            <TextInput
              value={formData.PhysicalAddressParents}
              onChangeText={(text) => setFormData({ ...formData, PhysicalAddressParents: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
              />  

                       
<View style={tw`flex flex-row justify-between`}>

<View style={tw`mr-2 w-1/2`}>
     <Text style={tw`text-sm`}>Home Village</Text>           
              <TextInput
              value={formData.HomeVillageParents}
              onChangeText={(text) => setFormData({ ...formData, HomeVillageParents: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
              />
              
           </View>  


    <View style={tw`mr-2 w-1/2`}>

    <Text style={tw`text-sm`}>District</Text> 
              <Picker
              selectedValue={formData.DistrictParents}
              onValueChange={(itemValue) => setFormData({ ...formData, DistrictParents: itemValue })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            >
              <Picker.Item label="Select District" value="" />
              <Picker.Item label="Blantyre" value="Blantyre" />
              <Picker.Item label="Thyolo" value="Thyolo" />
              <Picker.Item label="Mzimba" value="Mzimba" />
              <Picker.Item label="Lilongwe" value="Lilongwe" />
              <Picker.Item label="Zomba" value="Zomba"/>
              <Picker.Item label="Ntcheu" value="Ntcheu" />
              <Picker.Item label="Dedza" value="Dedza"/>
              <Picker.Item label="Zomba" value="Zomba"/>
              <Picker.Item label="Ntcheu" value="Ntcheu" />
              <Picker.Item label="Dedza" value="Dedza"/>
              <Picker.Item label="Mulanje" value="Mulanje"/>
              <Picker.Item label="Salima" value="Salima"/>
              <Picker.Item label="Mphalombe" value="Mphalombe"/>
              <Picker.Item label="Balaka" value="Balaka"/>
              <Picker.Item label="Chiradzulo" value="Chiradzulo"/>
            </Picker>  

         </View>  
       </View>     
            

              
<View style={tw`flex flex-row justify-between`}>

<View style={tw`mr-2 w-1/2`}>
     <Text style={tw`text-sm`}>Email</Text>
  
              <TextInput
      
              value={formData.EmailParents}
              onChangeText={(text) => setFormData({ ...formData, EmailParents: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
              />
           </View>

  <View style={tw`mr-2 w-1/2`}>
     <Text style={tw`text-sm`}>Phone Number</Text>       
              <TextInput

              value={formData.PhoneNumberParents}
              onChangeText={(text) => setFormData({ ...formData, PhoneNumberParents: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
              />

          </View>    
          
       </View>       
          </>      
        ),
      },




      {

        title: (
          <>
            <View style={tw `flex`} >
  
           <View    style={tw`flex-row items-center justify-start mb-1 p-2 `} > 
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')} // Ensure navigation is set up
             
                >
              <Text style={tw`text-sm text-white bg-yellow-600 p-2 rounded-md`}>Home</Text>
            </TouchableOpacity>
            </View>    
      
            {/* Title */}
            <Text style={tw`text-lg font-bold`}>Step 4: Student's University and program of study</Text>
          </View>
          </>
        ),
        content: (
          <>
      <View style={tw`flex-row items-center justify-center mb-2`}>
      <Icon name="spinner" size={16} color="green" style={tw`mr-2`} />
      <Text style={tw`text-sm text-green-600 text-center`}>Bonding in Progress</Text>
    </View>
            <Text style={tw`text-sm`}>University Name</Text>
            <Picker
              selectedValue={formData.UniversityName}
              onValueChange={(itemValue) => setFormData({ ...formData, UniversityName: itemValue })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            >
             

              <Picker.Item label="Select University" value="" />
              <Picker.Item label="University Of Malawi" value="University Of Malawi" />
              <Picker.Item label="Malawi University Of Business and Applied Science" value="Malawi University Of Business and Applied Science" />
              <Picker.Item label="Malawi University Of Science and Technology" value="Malawi University Of Science and Technology" />
              <Picker.Item label="Mzuzu University" value="Mzuzu University"/>
              <Picker.Item label="Catholic University " value ="Catholic University"/>
              <Picker.Item label="Domasi Colledge Of Education" value ="Domasi Colledge Of Education"/>
              <Picker.Item label="Nalikule Colldge of Education" value ="Nalikule Colldge of Education"/>
            </Picker>
        
            <Text style={tw`text-sm`}>Program Of Study</Text>
            <TextInput
              value={formData.ProgramOfStudy}
              onChangeText={(text) => setFormData({ ...formData, ProgramOfStudy: text })}
              style={tw`h-10 border border-gray-300 rounded p-2`}
            />
        
            <Text style={tw`text-sm`}>Registration Number</Text>
            <TextInput
              value={formData.RegistrationNumber}
              onChangeText={(text) => setFormData({ ...formData, RegistrationNumber: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            />
        
            <Text style={tw`text-sm`}>Academic Year</Text>
            <TextInput
              value={formData.AcademicYear}
              onChangeText={(text) => setFormData({ ...formData, AcademicYear: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            />
        
            <Text style={tw`text-sm`}>Year Of Study</Text>
            <Picker
              selectedValue={formData.YearOfStudy}
              onValueChange={(itemValue) => setFormData({ ...formData, YearOfStudy: itemValue })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            >
              <Picker.Item label="Select Year" value="" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5"/>
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7"/>
            </Picker>
          </>
        ),
        },





           
    { 

      title: (
        <>
          <View style={tw `flex`} >

         <View    style={tw`flex-row items-center justify-start mb-1 p-2 `} > 
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')} // Ensure navigation is set up
           
              >
            <Text style={tw`text-sm text-white bg-yellow-600 p-2 rounded-md`}>Home</Text>
          </TouchableOpacity>
          </View>    
    
          {/* Title */}
          <Text style={tw`text-lg font-bold`}>Step 5: Student's Loan Amount Details</Text>
        </View>
        </>
      ),
      content: (
        <>
          <View style={tw`flex-row items-center justify-center mb-2`}>
      <Icon name="spinner" size={16} color="green" style={tw`mr-2`} />
      <Text style={tw`text-sm text-green-600 text-center`}>Bonding in Progress</Text>
    </View>

                             <Text style={tw`text-sm`}>Tuition</Text>
                             
    
        <Picker
              selectedValue={formData.Tuition}
              onValueChange={(itemValue) => setFormData({ ...formData, Tuition: itemValue })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            >
              <Picker.Item label="Select Tuition Amount" value="" />
              <Picker.Item label="MK650,000" value="650000" />
          
        </Picker>

          
       <Text style={tw`text-sm`}>Upkeep</Text>
        <Picker
              selectedValue={formData.Upkeep}
              onValueChange={(itemValue) => setFormData({ ...formData, Upkeep: itemValue })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            >
              <Picker.Item label="Select Upkeep Amount" value="" />
              <Picker.Item label="MK560,000" value="560000" />
          
        </Picker>



        </>
        
        
      ),
    },
    

  

    // Step 2 and other steps...
  ];

  const submitForm = async () => {


    if (isSubmitting) return;
    setIsSubmitting(true);


    if (userId) {
      console.log('User ID:', userId);
      
      // Include userId in formData
      const formDataWithUserId = {
        ...formData,
        userId: userId,
      };
  
      // Log the form data for debugging
      console.log('Form Data:', formDataWithUserId);
      console.log('Email:', formDataWithUserId.Email); 
  
      try {
        const response = await axios.post('http://localhost:3000/submit-form', formDataWithUserId);
        navigation.navigate('Success');
      
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form');
      }
      finally {
        setIsSubmitting(false);
      }
    }
  };
  

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1); // Move to next step
    } else {
      submitForm(); // Submit the form if it's the last step
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
  
    
    <View style={tw`flex-1 bg-white p-6 justify-center`}>
      {/* Step Title */}
      <Text style={tw`text-xl font-bold mb-4`}>{steps[currentStep].title}</Text>
      {/* Step Content */}
      {steps[currentStep].content}
      {/* Step Navigation */}
      <View style={tw`flex flex-row justify-between mt-1`}>
        <TouchableOpacity onPress={previousStep} style={tw`bg-gray-300 px-4 py-2 rounded`}>
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={isSubmitting} onPress={nextStep} style={tw`bg-yellow-600 px-4 py-2 rounded`}>
        <Text style={tw`text-white`}>
  {isSubmitting
    ? 'Submitting'
    : currentStep === steps.length - 1
    ? 'Submit'
    : 'Next'}
</Text>

        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BondingForm;