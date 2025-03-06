import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import { ChevronLeft } from "lucide-react-native";

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch("http://192.168.43.114:5000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Account created! Please log in.");
                navigation.navigate("Login");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("An error occurred. Try again.");
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
                        placeholder="Name"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={name}
                        onChangeText={setName}
                    />
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

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.linkText}>Already have an account? Log In</Text>
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

export default SignUpScreen;
