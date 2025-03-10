import { Stack } from "expo-router";

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
      headerTitle: "Home" 
    }} />
    <Stack.Screen name="goals/[id]" options={{ 
      headerTitle: "Goal Details" 
    }} />
  </Stack>
  );
};