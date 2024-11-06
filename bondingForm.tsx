import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

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
    BankAccountNumber: '',
    BankAccountName: '',
    FullName: '',
    postalAddress: '',
    PhysicalAddress: '',
    HomeVillage: '',
    Occupation: '',
    PhoneNumberG: '',
    UniversityName: '',
    ProgramOfStudy:'',
    RegistrationNumber:'',
    AcademicYear:'',
    YearOfStudy:'',
    Sex: '',
    

  });

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);




  const steps = [
    {
      title: "Step 1: Student's Personal Details",
      content: (
        <>

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
            <Text style={tw`text-sm`}>Postal Address </Text>
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
            <Text style={tw`text-sm`}>Sex </Text>
      
  <Picker
              selectedValue={formData.Sex}
              onValueChange={(itemValue) => setFormData({ ...formData, Sex: itemValue })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
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
      title: "Step 2: Student's Bank Details",
      content: (
        <>


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
        title: "Step 3: Parents/Guardian Details",
        content: (
          <>


                                 
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
              value={formData.postalAddress}
              onChangeText={(text) => setFormData({ ...formData, postalAddress: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
            />
     
   <Text style={tw`text-sm`}>Physical Address</Text>  
            <TextInput
              value={formData.PhysicalAddress}
              onChangeText={(text) => setFormData({ ...formData, PhysicalAddress: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
              />  

                       
<View style={tw`flex flex-row justify-between`}>

<View style={tw`mr-2 w-1/2`}>
     <Text style={tw`text-sm`}>Home Village</Text>           
              <TextInput
              value={formData.HomeVillage}
              onChangeText={(text) => setFormData({ ...formData, HomeVillage: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
              />
              
           </View>  


    <View style={tw`mr-2 w-1/2`}>
    <Text style={tw`text-sm`}>District</Text> 
              <Picker
              selectedValue={formData.District}
              onValueChange={(itemValue) => setFormData({ ...formData, District: itemValue })}
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
            </Picker>  

         </View>     
            

              
<View style={tw`flex flex-row justify-between`}>

<View style={tw`mr-2 w-1/2`}>
     <Text style={tw`text-sm`}>Email</Text>
  
              <TextInput
      
              value={formData.Email}
              onChangeText={(text) => setFormData({ ...formData, Email: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
              />
           </View>

  <View style={tw`mr-2 w-1/2`}>
     <Text style={tw`text-sm`}>Phone Number</Text>       
              <TextInput

              value={formData.PhoneNumberG}
              onChangeText={(text) => setFormData({ ...formData, PhoneNumberG: text })}
              style={tw`h-10 border border-gray-300 rounded p-2 mb-4`}
              />

          </View>    
           </View>
       </View>       
          </>      
        ),
      },




      {

        title: "Step 4: Student's University and program of study",
        content: (
          <>
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
              <Picker.Item label="Mzuzu University" value="Mzuzu University" />
              <Picker.Item label="Catholic University " value ="Catholic University"/>
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
        title: "Step 5: Loan amount Details",
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
      <View style={tw`flex-row justify-between mt-2`}>
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
          <Text style={tw`text-center text-white`}>{currentStep === steps.length - 1 ? 'Bond' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BondingForm;