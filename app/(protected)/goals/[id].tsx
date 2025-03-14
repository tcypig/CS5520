import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { readDocFromDB } from '@/Firebase/firestoreHelper';
import { GoalData, updateDB } from '@/Firebase/firestoreHelper';
import PressableButton from '@/components/PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import GoalUsers from '@/components/GoalUsers';

export default function GoalDetail() {
  const { id } = useLocalSearchParams<{id: string}>();
  const [goal, setGoal] = useState<GoalData | null>(null);
  const [warning, setWarning] = useState(false);
  
  function warningHandeler() {
    setWarning(true);
    updateDB(id, "goals", {warning: true});
  }

  useEffect(() => {
    async function getData() {
      try {
        const data = await readDocFromDB(id, "goals");
        console.log(data);
        if (data != null) {
          if (data?.warning) {
            setWarning(true);
          }
          setGoal(data as GoalData);
          // navigation.setOptions({headerTitle: data.text});
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    getData();  
  }, [])

  return (
    <View>
      <Stack.Screen 
        options={{
          headerTitle: goal ? (warning ? "warning" : goal.text) : "",
          headerRight: () => (
            <PressableButton
              pressedHandler={warningHandeler}
              // pressedStyle={styles.pressed}
              componentStyle={styles.warningIcon}
            >
              <Ionicons name="warning" size={24} color="yellow" />
            </PressableButton>
            // <Button title="warning" onPress={warningHandeler} />
          ),
        }} />
      <Text style={warning && styles.warningText}>GoalDetail: {goal?.text}</Text>
      <GoalUsers goalId={id} />
    </View>
  )
}

const styles = StyleSheet.create({
  warningText: {
    color: "red",
    fontSize: 20,
  },
  warningIcon: {
    backgroundColor: "#9900cc",
  },
})