import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState } from 'react';

export default function Input() {
  const [text, setText] = useState("");
  
  function updateText(changedText: string) {
    // update the text state
    setText(changedText);
  }

  
  return (
    <View>
      <TextInput 
        value={text} 
        onChangeText={updateText}
        placeholder='type something'
      />
    </View>
  )
}

const styles = StyleSheet.create({})