import { StyleSheet, Text, TextInput, View, Button, Modal } from 'react-native'
import React from 'react'
import { useState } from 'react';

interface InputProps {
  focused?: boolean;
  inputHandler: (data:string) => void;
  modalVisble: boolean;
}

export default function Input({ focused = false, inputHandler, modalVisble }: InputProps) {
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
    console.log("user has typed ", text);
    inputHandler(text);
  }
  
  return (
    <Modal transparent={true} visible={modalVisble} animationType='slide'>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
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
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: "#eee",
    borderRadius: 10,
  }
});