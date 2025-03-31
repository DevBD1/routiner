import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { signInWithGoogle, signInWithApple, signInAnonymously, loading, isAppleSignInAvailable } = useAuth();
  const router = useRouter();

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
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Üst kısımdaki illüstrasyon 
      <Image source={require("./assets/pen.png")} style={styles.image} />*/}
      
      {/* Açıklama metni */}
      <Text style={styles.title}>Reflect, grow, and find calm every day!</Text>
      
      {/* Butonlar */}
      {isAppleSignInAvailable && (
        <TouchableOpacity style={styles.button} onPress={handleAppleSignIn}>
          <Ionicons name="logo-apple" size={20} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
        <Ionicons name="logo-google" size={20} color="black" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.anonymousButton]} onPress={handleAnonymousSignIn}>
        <Ionicons name="person-outline" size={20} color="black" style={styles.icon} />
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>
      
      {/* Kullanım şartları */}
      <Text style={styles.footerText}>
        By continuing, you agree to Routiner's Terms of Use and Privacy Policy
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAF3E0", // Açık pastel renk arka plan
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  anonymousButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  icon: {
    marginRight: 10,
  },
  footerText: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});