import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native"

const AddEditPlantForm = ({ plant, onSubmit, onCancel }) => {
  const [name, setName] = useState("")
  const [uses, setUses] = useState("")
  const [benefits, setBenefits] = useState("")

  useEffect(() => {
    if (plant) {
      setName(plant.name)
      setUses(plant.uses)
      setBenefits(plant.benefits)
    }
  }, [plant])

  const handleSubmit = () => {
    const newPlant = {
      id: plant ? plant.id : Date.now(),
      name,
      uses,
      benefits,
      latitude: plant ? plant.latitude : 0,
      longitude: plant ? plant.longitude : 0,
    }
    onSubmit(newPlant)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form}>
        <Text style={styles.title}>{plant ? "Edit Plant" : "Add New Plant"}</Text>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{plant ? "Update" : "Add"} Plant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default AddEditPlantForm

