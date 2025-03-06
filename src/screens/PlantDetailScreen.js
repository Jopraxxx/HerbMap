import React from "react"
import { View, Text, StyleSheet, ScrollView, Image } from "react-native"

const PlantDetailScreen = ({ route }) => {
  const { plant } = route.params

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{plant.name}</Text>
      <Text style={styles.sectionTitle}>Uses:</Text>
      <Text style={styles.info}>{plant.uses}</Text>
      <Text style={styles.sectionTitle}>Benefits:</Text>
      <Text style={styles.info}>{plant.benefits}</Text>
      <Text style={styles.sectionTitle}>Preparation:</Text>
      <Text style={styles.info}>
        Detailed preparation instructions will be provided here. This may include methods of extraction, dosage, and any
        precautions to be taken while using this herbal plant.
      </Text>
      <Text style={styles.sectionTitle}>Cultural Significance:</Text>
      <Text style={styles.info}>
        Information about the cultural importance and traditional uses of this plant in the local community will be
        displayed here, helping to preserve and promote cultural knowledge.
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
})

export default PlantDetailScreen

