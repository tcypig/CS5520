import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React from 'react'
import { useState } from 'react';

interface InputProps {
  focused?: boolean;
}

export default function Input({ focused = false }: InputProps) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState("");
  
  function updateText(changedText: string) {
    // update the text state
    setText(changedText);
  }

  function handleBlur() {
    setIsFocused(false);
    if (text.length < 3) {
      setMessage("Please type more than 3 characters");
    } else {
      setMessage("Thank you");
    }
  }

  function handleFocus() {
    setIsFocused(true);
    setMessage("");
  }

  function handleConfirm() {
    console.log("user has typed ", text)
  }
  
  return (
    <View>
      <TextInput 
        value={text} 
        onChangeText={updateText}
        autoFocus={focused}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder='type something'
      />
      {isFocused && text.length > 0 && (
        <Text>Character Count: {text.length}</Text>
      )}
      {!isFocused && (
        <Text>{message}</Text>
      )}
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  )
}

const styles = StyleSheet.create({})