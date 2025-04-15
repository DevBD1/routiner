import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform, ActivityIndicator, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function LoginScreen() {
  const { signInWithGoogle, signInWithApple, signInAnonymously, loading, isAppleSignInAvailable } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await signInWithApple();
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Apple sign in error:", error);
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      await signInAnonymously();
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Anonymous sign in error:", error);
    }
  };

  if (loading) {
    return (
      <ImageBackground
        source={colorScheme === 'light' 
          ? require('@/assets/images/login-bg-light.png')
          : require('@/assets/images/login-bg-dark.png')}
        style={styles.backgroundImage}
      >
        <ThemedView style={styles.container}>
          <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
        </ThemedView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={colorScheme === 'light' 
        ? require('@/assets/images/login-bg-light.png')
        : require('@/assets/images/login-bg-dark.png')}
      style={styles.backgroundImage}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>Reflect, grow, and find calm every day!</ThemedText>
        
        {isAppleSignInAvailable && (
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: Colors[colorScheme].background }]} 
            onPress={handleAppleSignIn}
          >
            <Ionicons name="logo-apple" size={20} color={Colors[colorScheme].text} style={styles.icon} />
            <ThemedText style={styles.buttonText}>Continue with Apple</ThemedText>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: Colors[colorScheme].background }]} 
          onPress={handleGoogleSignIn}
        >
          <Ionicons name="logo-google" size={20} color={Colors[colorScheme].text} style={styles.icon} />
          <ThemedText style={styles.buttonText}>Continue with Google</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.anonymousButton, { backgroundColor: Colors[colorScheme].background }]} 
          onPress={handleAnonymousSignIn}
        >
          <Ionicons name="person-outline" size={20} color={Colors[colorScheme].text} style={styles.icon} />
          <ThemedText style={styles.buttonText}>Continue as Guest</ThemedText>
        </TouchableOpacity>
        
        <ThemedText style={styles.footerText}>
          By continuing, you agree to Routiner's Terms of Use and Privacy Policy
        </ThemedText>
      </ThemedView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slight overlay to ensure text readability
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  anonymousButton: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
});