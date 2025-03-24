import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location';

export default function LocationManager() {
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
  
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

      const location = await Location.getCurrentPositionAsync();
      console.log("Location:", location);
    }
    catch (err) {
      console.error("Error fetching location:", err);
      Alert.alert("Error", "Could not fetch location.");
    }
  }

  return (
    <View>
      <Button title="Fine my location" onPress={locateUserHandler} />
    </View>
  )
}

const styles = StyleSheet.create({})