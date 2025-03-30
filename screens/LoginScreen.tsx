import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Üst kısımdaki illüstrasyon 
      <Image source={require("./assets/pen.png")} style={styles.image} />*/}
      
      {/* Açıklama metni */}
      <Text style={styles.title}>Reflect, grow, and find calm every day</Text>
      
      {/* Butonlar */}
      <TouchableOpacity style={[styles.button, styles.emailButton]}>
        <Ionicons name="mail" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with email</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <Ionicons name="logo-apple" size={20} color="black" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <Ionicons name="logo-google" size={20} color="black" style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
      
      {/* Kullanım şartları */}
      <Text style={styles.footerText}>
        By continuing, you agree to Lume’s Terms of Use and Privacy Policy
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
  emailButton: {
    backgroundColor: "black",
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

export default LoginScreen;
