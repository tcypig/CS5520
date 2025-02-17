import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React from 'react'
import { GoalFromDB } from '../App'
import { Link, router } from 'expo-router';

interface GoalItemProps {
    goalObj: GoalFromDB;
    deleteHandler: (deleteId: string) => void;
  }

export default function GoalItem({goalObj, deleteHandler}: GoalItemProps) {
  return (
    <Pressable
      style={styles.textContainer}
      onPress={() => 
        router.navigate(`/goals/${goalObj.id}`)
        }
    >
        <Text style={styles.text}>{goalObj.text}</Text>
        <Button title="X" onPress={() => deleteHandler(goalObj.id)} />
        {/* <Link asChild href={`/goals/${goalObj.id}`}> 
          <Button title="info" />
        </Link> */}
        {/* <Button title="info" onPress={() => 
          router.navigate(`/goals/${goalObj.id}`)
          } 
        /> */}
        {/* <Button title="info" onPress={}/> */}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    textContainer:{
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: "#aaa",
        justifyContent: "space-between",
        marginTop: 15,
      },
    text:{
        color: "purple",
        fontSize: 20,
        // marginTop: 5,
        backgroundColor: "#aaa",
        padding: 5,
        borderRadius: 5,
      },
    
})