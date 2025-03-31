import { Alert, Button, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { LocationData } from '@/types';
import { router, useLocalSearchParams } from 'expo-router';
import { readDocFromDB, writeToDB } from '@/Firebase/firestoreHelper';
import { User, Address, Geo } from "@/components/GoalUsers";
import { auth } from '@/Firebase/firebaseSetup';
import { setNotificationHandler } from 'expo-notifications';

export default function LocationManager() {
  const params = useLocalSearchParams();
  console.log("params", params);
  
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    async function fetchLocation() {
        if (auth.currentUser?.uid) {
          try{
            const data = await readDocFromDB(auth.currentUser.uid, "users");
            if (data?.address?.geo) {
              setLocation({
                latitude: parseFloat(data.address.geo.lat),
                longitude: parseFloat(data.address.geo.lng),
              });
            }
          } catch (err) {
            console.error("Error fetching location from Firestore:", err);
          }
          
        }
    }
    fetchLocation();
  }, []);
  
   // if (params) update the location state variable
   console.log("params :", params);
   useEffect(() => {
     if (params.latitude && params.longitude) {
       setLocation({
         latitude: parseFloat(
           Array.isArray(params.latitude) ? params.latitude[0] : params.latitude
         ),
         longitude: parseFloat(
           Array.isArray(params.longitude)
             ? params.longitude[0]
             : params.longitude
         ),
       });
     }
   }, []);

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
    // pass the location if it exists
    if (location) {
      router.navigate({
        pathname: "map",
        params: {
          initLatitude: location?.latitude,
          initLongitude: location?.longitude,
        },
      });
    } else {
      router.push("/map");
    }
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
      <Button title="Save Location to Firestore" 
        onPress={() => {
          if (!location || !auth?.currentUser?.uid) {
            console.warn("Missing location or user ID.");
            return;
          }

          writeToDB(
            {
              address: {
                geo: {
                  lat: location.latitude.toString(),
                  lng: location.longitude.toString(),
                },
              },
            },
            "users",
            auth.currentUser.uid
          );
          router.back()
        }}
      />
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