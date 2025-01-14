import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState } from 'react';

interface InputProps {
  focused?: boolean;
}

export default function Input({ focused = false }: InputProps) {
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
        autoFocus={focused}
        placeholder='type something'
      />
      {text.length > 0 && (
        <Text>Character Count: {text.length}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({})