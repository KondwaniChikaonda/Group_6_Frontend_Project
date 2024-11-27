import React from "react";
import { ImageBackground, View, StyleSheet, Image } from "react-native";
import tw from "twrnc";

interface BackgroundProps {
  children: React.ReactNode; 
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require("./assets/pic2.jpg")} 
      style={styles.background}
      resizeMode="cover" 
    >

      
    
      <View style={tw`items-center justify-center mt-20`}>
        <Image
          source={require("./assets/logo.png")} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

  
      <View style={styles.darkOverlay} />
      

      <View style={styles.contentOverlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 120, 
    height: 120, 
    marginBottom: 20,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "rgba(0, 0, 0, 0.7)", 
  },
  contentOverlay: {
    flex: 1, 
  },
});

export default Background;
