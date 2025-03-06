  "use client";

  import { useState } from "react";
  import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Image,
    Alert,
  } from "react-native";
  import { COLORS, FONTS } from "../constants/theme";
  import { ChevronLeft } from "lucide-react-native";

  const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
      if (!email || !password) {
          alert("Please enter both email and password.");
          return;
      }

      try {
          const response = await fetch("http://192.168.0.17:5000/auth/login", { // Ensure it's POST!
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (response.ok) {
              alert("Login successful!");
              navigation.navigate("Main");
          } else {
              alert(data.message);
          }
      } catch (error) {
          alert("Network error. Check server connection.");
      }
  };


    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft color="#fff" size={24} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Image source={require("../../assets/icon.png")} style={styles.logo} resizeMode="contain" />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Logging in..." : "Log In"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.primary,
      justifyContent: "center",
    },
    backButton: {
      position: "absolute",
      top: 40,
      left: 16,
      zIndex: 1,
    },
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    logo: {
      width: 180,
      height: 180,
      marginBottom: 40,
    },
    inputContainer: {
      width: "100%",
      marginBottom: 20,
    },
    input: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 25,
      padding: 15,
      marginBottom: 15,
      color: COLORS.white,
      width: "100%",
    },
    button: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 25,
      width: "100%",
      marginBottom: 20,
      alignItems: "center",
    },
    buttonText: {
      ...FONTS.button,
      textAlign: "center",
    },
    linkText: {
      color: COLORS.white,
      fontSize: 16,
      marginVertical: 5,
    },
  });

  export default LoginScreen;
