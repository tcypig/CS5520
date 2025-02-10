import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { readDocFromDB } from '@/Firebase/firestoreHelper';
import { goalData } from '@/Firebase/firestoreHelper';

export default function GoalDetail() {
  const { id } = useLocalSearchParams<{id: string}>();
  const [goal, setGoal] = useState<goalData | null>(null);
  // const navigation = useNavigation();
  
  useEffect(() => {
    async function getData() {
      try {
        const data = await readDocFromDB(id, "goals");
        console.log(data);
        if (data != null) {
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
      <Stack.Screen options={{headerTitle: goal?.text || ''}} />
      <Text>GoalDetail: {goal?.text}</Text>
    </View>
  )
}