import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React from 'react'
import { GoalFromDB } from '../App'
import { Link, router } from 'expo-router';
import PressableButton from './PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';

interface GoalItemProps {
    goalObj: GoalFromDB;
    deleteHandler: (deleteId: string) => void;
    deleteConfirmHandler?: (deleteId: string) => void;
    separators: {
      highlight: () => void;
      unhighlight: () => void;
    }
  }

export default function GoalItem({goalObj, deleteHandler, deleteConfirmHandler, separators}: GoalItemProps) {
  return (
    <Pressable
      // style={styles.textContainer}
      style={({pressed})=>{
        return [styles.textContainer, pressed && styles.pressed];
      }}
      android_ripple={styles.androidRipple}
      onPress={() => 
        router.navigate(`/goals/${goalObj.id}`)
      }
      onPressIn={() => separators.highlight()}
      onPressOut={() => separators.unhighlight()}
    >
      <Text style={styles.text}>{goalObj.text}</Text>
      <PressableButton
        pressedHandler={()=> {
          deleteHandler(goalObj.id)
        }}
        longPressdHandler={() => deleteConfirmHandler?.(goalObj.id)}
        pressedStyle={styles.pressed}
        componentStyle={styles.deleteIcon}
      >
        {/* <Text>x</Text> */}
        <Ionicons name="trash" size={24} color="black" />
      </PressableButton>
        {/* <Button title="X" onPress={() => deleteHandler(goalObj.id)} /> */}
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
    alignItems: "center",
    // justifyContent: "space-between",
    padding: 10,
    marginVertical: 10,
    },
  text:{
    color: "purple",
    fontSize: 20,
    // marginTop: 5,
    // backgroundColor: "#aaa",
    // padding: 5,
    // borderRadius: 5,
    },
  pressed: {
    backgroundColor: "grey",
    opacity: 0.5,
  },
  androidRipple: {
    color: "red",
  },
  deleteIcon: {
    backgroundColor: "#aaa",
  }
    
})