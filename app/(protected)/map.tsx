import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { LocationData } from '@/types';
import { router } from 'expo-router';

export default function map() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  function confirmLocationHandler() {
    router.push({
      pathname: "/profile",
      params: {
        latitude: selectedLocation?.latitude,
        longitude: selectedLocation?.longitude,
      },
    });
  }

  return (
    <View>
      <MapView
        style={{width: 400, height: 400}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => 
          setSelectedLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          })
        }
      > 
       {selectedLocation && <Marker coordinate={selectedLocation} />} 
      </MapView>
      <Button  
        disabled={!selectedLocation}
        title="Confirm Location" onPress={confirmLocationHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  }
})