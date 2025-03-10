import PressableButton from "@/components/PressableButton";
import { router, Stack } from "expo-router";
import React from "react";
import { Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseSetup";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#9900cc" },  // Background color
        headerTintColor: "#fff",  // Title & back button color
        headerTitleStyle: { fontSize: 20 },  // Title font size
      }}
    >
    <Stack.Screen name="index" options={{ 
      headerTitle: "Homepage" ,
      headerRight: () => (
        <PressableButton
          pressedHandler={() => router.push("/profile")}
        >
          <Ionicons name="person" size={24} color="white" />
        </PressableButton>
      ),
    }} />
    <Stack.Screen name="goals/[id]" options={{ 
      headerTitle: "Goal Details" 
    }} />
   
    <Stack.Screen 
      name="profile" 
      options={{
        headerTitle: "Profile",
        headerRight: () => (
          <PressableButton
            pressedHandler={() => {signOut(auth)}}
          >
            <Ionicons name="log-out" size={24} color="white" />
          </PressableButton>
        ),
      }}
    />  
  </Stack>
  );
};