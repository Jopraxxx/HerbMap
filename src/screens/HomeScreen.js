import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import MapView, { Marker, MAP_TYPES } from "react-native-maps";
import * as Location from "expo-location";
import PlantPopup from "../components/PlantPopup";
import AddEditPlantForm from "../components/AddEditPlantForm";
import { MaterialIcons } from "@expo/vector-icons"; // Ensure proper import

const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [mapType, setMapType] = useState(MAP_TYPES.STANDARD);
  const [herbs, setHerbs] = useState([
    { id: 1, name: "Oregano", latitude: 14.5995, longitude: 120.9842, uses: "Cough, cold", benefits: "Anti-inflammatory" },
    { id: 2, name: "Lagundi", latitude: 14.6008, longitude: 120.9867, uses: "Asthma, fever", benefits: "Respiratory health" },
    { id: 3, name: "Sambong", latitude: 14.598, longitude: 120.9855, uses: "Kidney stones, edema", benefits: "Diuretic" },
  ]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const [newPlantLocation, setNewPlantLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.02,
      });
    })();
  }, []);

  const handleMapPress = (event) => {
    if (isAddingPlant) {
      setNewPlantLocation(event.nativeEvent.coordinate);
      setIsAddingPlant(false);
    }
  };

  const handleMarkerPress = (plant) => {
    setSelectedPlant(plant);
  };

  const handleAddPlant = (newPlant) => {
    setHerbs([...herbs, { ...newPlant, id: herbs.length + 1, ...newPlantLocation }]);
    setNewPlantLocation(null);
  };

  const handleEditPlant = (editedPlant) => {
    setHerbs(herbs.map((herb) => (herb.id === editedPlant.id ? editedPlant : herb)));
    setSelectedPlant(null);
  };

  const handleDeletePlant = (plantId) => {
    setHerbs(herbs.filter((herb) => herb.id !== plantId));
    setSelectedPlant(null);
  };

  // Toggle between Standard, Satellite, and Terrain View
  const toggleMapType = () => {
    if (mapType === MAP_TYPES.STANDARD) setMapType(MAP_TYPES.SATELLITE);
    else if (mapType === MAP_TYPES.SATELLITE) setMapType(MAP_TYPES.TERRAIN);
    else setMapType(MAP_TYPES.STANDARD);
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          mapType={mapType}
          onPress={handleMapPress}
        >
          {herbs.map((herb) => (
            <Marker
              key={herb.id}
              coordinate={{ latitude: herb.latitude, longitude: herb.longitude }}
              title={herb.name}
              description={`Uses: ${herb.uses}`}
              onPress={() => handleMarkerPress(herb)}
            />
          ))}
          {newPlantLocation && <Marker coordinate={newPlantLocation} pinColor="blue" />}
        </MapView>
      )}

      {/* Add Plant Button (Map Pin Icon) */}
      <TouchableOpacity style={styles.addButton} onPress={() => setIsAddingPlant(true)}>
        <MaterialIcons name="add-location-alt" size={32} color="white" />
      </TouchableOpacity>

      {/* Map Type Toggle Button */}
      <TouchableOpacity style={styles.mapTypeButton} onPress={toggleMapType}>
        <MaterialIcons name="layers" size={28} color="white" />
      </TouchableOpacity>

      {/* Plant Details Popup */}
      <Modal
        visible={selectedPlant !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedPlant(null)}
      >
        <PlantPopup
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
          onEdit={handleEditPlant}
          onDelete={handleDeletePlant}
        />
      </Modal>

      {/* Add/Edit Plant Modal */}
      <Modal
        visible={newPlantLocation !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setNewPlantLocation(null)}
      >
        <AddEditPlantForm onSubmit={handleAddPlant} onCancel={() => setNewPlantLocation(null)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  mapTypeButton: {
    position: "absolute",
    bottom: 90,
    right: 20,
    backgroundColor: "#3b82f6",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default HomeScreen;
