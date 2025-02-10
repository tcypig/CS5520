import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { readDocFromDB } from '@/Firebase/firestoreHelper';
import { goalData, updateDB } from '@/Firebase/firestoreHelper';

export default function GoalDetail() {
  const { id } = useLocalSearchParams<{id: string}>();
  const [goal, setGoal] = useState<goalData | null>(null);
  // const navigation = useNavigation();
  const [warning, setWarning] = useState(false);
  
  function warningHandeler() {
    setWarning(!warning);
    updateDB(id, "goals", {warning: !warning});
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
          setGoal(data as goalData);
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
            <Button title="warning" onPress={warningHandeler} />
          ),
        }} />
      <Text style={warning && styles.warningText}>GoalDetail: {goal?.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  warningText: {
    color: "red",
    fontSize: 20,
  }
})