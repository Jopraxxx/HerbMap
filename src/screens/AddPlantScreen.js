import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native"

const AddPlantScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [uses, setUses] = useState("")
  const [benefits, setBenefits] = useState("")
  const [preparation, setPreparation] = useState("")

  const handleSubmit = () => {
    // Here you would typically send this data to your backend
    console.log({ name, uses, benefits, preparation })
    navigation.goBack()
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Plant Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter plant name" />
      <Text style={styles.label}>Uses:</Text>
      <TextInput style={styles.input} value={uses} onChangeText={setUses} placeholder="Enter plant uses" multiline />
      <Text style={styles.label}>Benefits:</Text>
      <TextInput
        style={styles.input}
        value={benefits}
        onChangeText={setBenefits}
        placeholder="Enter plant benefits"
        multiline
      />
      <Text style={styles.label}>Preparation:</Text>
      <TextInput
        style={styles.input}
        value={preparation}
        onChangeText={setPreparation}
        placeholder="Enter preparation instructions"
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Plant</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default AddPlantScreen

