import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native"
import { COLORS, FONTS } from "../constants/theme"

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../assets/icon.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Discover. Explore. Heal</Text>
        <Text style={styles.subtitle}>
          Track the Roots, Dive into the Greens{"\n"}
          Unveil the Power of Nature's Remedies
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  title: {
    ...FONTS.title,
    marginBottom: 10,
  },
  subtitle: {
    ...FONTS.subtitle,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "80%",
  },
  buttonText: {
    ...FONTS.button,
    textAlign: "center",
  },
})

export default WelcomeScreen

