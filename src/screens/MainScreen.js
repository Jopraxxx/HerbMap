import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Map } from "lucide-react-native";

const MainScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            const userName = await AsyncStorage.getItem("name");
            const storedImage = await AsyncStorage.getItem("profileImage");

            if (userName) setName(userName);
            if (storedImage) setProfileImage(storedImage);
        };
        getUserData();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.clear();
        navigation.navigate("Login");
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            await AsyncStorage.setItem("profileImage", result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    {profileImage ? (
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    ) : (
                        <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                            <Text style={styles.uploadText}>Upload Profile</Text>
                        </TouchableOpacity>
                    )}
                    <Text style={styles.welcomeText}>Hi, {name}!</Text>
                </View>

                <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate("Home")}>
                    <Map color="#fff" size={24} style={styles.mapIcon} />
                    <Text style={styles.buttonText}>View Map</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log Out</Text>
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
        alignItems: "center",
    },
    content: {
        width: "100%",
        alignItems: "center",
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    welcomeText: { 
        fontSize: 24, 
        fontWeight: "bold", 
        color: "white", 
        marginTop: 10, 
        textAlign: "center" 
    },
    mapButton: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    mapIcon: {
        marginRight: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    logoutButton: { 
        marginTop: 10, 
        backgroundColor: "red", 
        padding: 12, 
        borderRadius: 25, 
        alignItems: "center", 
        width: "80%",
    },
    logoutText: { 
        color: "white", 
        fontSize: 16, 
        fontWeight: "bold" 
    },
    uploadButton: { 
        backgroundColor: "gray", 
        padding: 12, 
        borderRadius: 8, 
        alignItems: "center" 
    },
    uploadText: { 
        color: "white", 
        fontSize: 16, 
        fontWeight: "bold" 
    },
    profileImage: { 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        marginBottom: 10, 
        borderWidth: 2, 
        borderColor: "white" 
    },
});

export default MainScreen;
