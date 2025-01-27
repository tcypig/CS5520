import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Goal } from '../App'

interface GoalItemProps {
    goalObj: Goal;
  }

export default function GoalItem({goalObj}: GoalItemProps) {
  return (
    <View>
        <Text style={styles.text}>{goalObj.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text:{
        color: "purple",
        fontSize: 80,
        marginTop: 50,
        backgroundColor: "#aaa",
        padding: 5,
        borderRadius: 5,
      },
    
})