import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { LocationData } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';

export default function map() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [initLocation, setInitLocation] = useState<LocationData | null>(null);
  const params = useLocalSearchParams();
  useEffect(() => {
    if (params && params.initLatitude && params.initLongitude) {
      setInitLocation({
        latitude: parseFloat(
          Array.isArray(params.initLatitude)
            ? params.initLatitude[0]
            : params.initLatitude
        ),
        longitude: parseFloat(
          Array.isArray(params.initLongitude)
            ? params.initLongitude[0]
            : params.initLongitude
        ),
      });
    }
  }, []);

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
          latitude: initLocation? initLocation.latitude : 37.78825,
          longitude: initLocation ? initLocation.longitude : -122.4324,
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