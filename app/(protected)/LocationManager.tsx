import { Alert, Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location';
import MapView from "react-native-maps";
import { LocationData } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';

export default function LocationManager() {
  const params = useLocalSearchParams();
  console.log("params", params);
  
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<LocationData | null>(null);
  
  async function verifyPermissions() {
    if (permissionResponse?.granted) return true;

    const responseAfterRequest = await requestPermission();
    console.log("Permission response:", responseAfterRequest);

    return responseAfterRequest?.granted === true;
  }

  async function locateUserHandler() {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert("Permission Required", "Location access is required.");
        return;
      }

      const locationResult = await Location.getCurrentPositionAsync();
      console.log("Location:", location);
      setLocation({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      });
    }
    catch (err) {
      console.error("Error fetching location:", err);
      Alert.alert("Error", "Could not fetch location.");
    }
  }

  function chooseLocationHandler() {
    // navigate to the map screen
    router.push("/map");
  }

  return (
    <View>
      <Button title="Fine my location" onPress={locateUserHandler} />
      <Button title="Let me choose on the map" onPress={chooseLocationHandler} />
      {location && (
        <Image 
          source= {{uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsAPIkEY}`}}
          style={styles.map}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: 200,
    marginTop: 10,
  },
})