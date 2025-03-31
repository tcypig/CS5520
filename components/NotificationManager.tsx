import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getPermissionsAsync, SchedulableTriggerInputTypes, scheduleNotificationAsync } from 'expo-notifications'
import * as Notifications from 'expo-notifications';

export default function NotificationManager() {  
  async function verifyPermissions() {
    try {
      const permissionResponse = await Notifications.getPermissionsAsync();
      if (permissionResponse.granted) {
        return true;
      }

      const response = await Notifications.requestPermissionsAsync();
      console.log("Permission request result:", response);

      return response.granted;
    } catch (error) {
      console.log("Error verifying permissions:", error);
    }
  }

  async function scheduleNotificationHandler() {
    try{
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Permission not granted",
            "Please enable notifications in settings",
          [{ text: 'Okay' }]
        );
        return;
      }
      scheduleNotificationAsync({
        content: {
          title: 'Daily Goals Reminder',
          body: "Don't forget to add your daily goals!",
          data: { data: 'goes here' },
        },
        trigger: {
          seconds: 5, 
          type: SchedulableTriggerInputTypes.TIME_INTERVAL
        },
      });
    } catch (error) {
      console.log("Error scheduling notification:", error); 
    }
  }

  return (
    <View>
      <Button 
        title="Remind me to add my daily goals" 
        onPress={scheduleNotificationHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({})