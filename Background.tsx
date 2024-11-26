import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import tw from "twrnc";

interface BackgroundProps {
  children: React.ReactNode; // To render child components
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require("./assets/pic2.jpg")} // Background image
      style={styles.background}
      resizeMode="cover" // Ensures the image covers the screen
    >
      {/* Dark Overlay */}
      <View style={styles.darkOverlay} />
      {/* Content */}
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
  darkOverlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire background
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
  },
  contentOverlay: {
    flex: 1, // Ensures children are displayed on top of the overlay
  },
});

export default Background;
