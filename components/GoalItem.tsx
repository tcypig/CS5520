import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { Goal } from '../App'

interface GoalItemProps {
    goalObj: Goal;
    deleteHandler: (deleteId: number) => void;
  }

export default function GoalItem({goalObj, deleteHandler}: GoalItemProps) {
  return (
    <View style={styles.textContainer}>
        <Text style={styles.text}>{goalObj.text}</Text>
        <Button title="X" onPress={() => deleteHandler(goalObj.id)} />
    </View>
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