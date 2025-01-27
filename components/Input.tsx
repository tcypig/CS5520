import { StyleSheet, Text, TextInput, View, Button, Modal, Alert, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';

interface InputProps {
  focused?: boolean;
  inputHandler: (data:string) => void;
  modalVisble: boolean;
  cancelHandler: () => void;
}

export default function Input({ focused = false, inputHandler, modalVisble, cancelHandler }: InputProps) {
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
    setText("");
  }

  function handleCancel() {
    Alert.alert("Cancel", "Are you sure you want to cancel?", [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'OK', 
        onPress: () => {
          cancelHandler();
          setText("");
        }
      },
    ]);
  }
  
  return (
    <Modal transparent={true} visible={modalVisble} animationType='slide'>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          {/* network image */}
          <Image 
            style={styles.image}
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png" }} 
            alt="Image of an arrow"
          />
          {/* local image */}
          <Image 
            style={styles.image}
            source={require('../assets/2617812.png')} 
            alt="Image of an arrow"
          />

          <TextInput 
            style={styles.input}
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
          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleCancel} />
            </View>
            <View style={styles.buttonContainer}>
              <Button 
                disabled={text.length < 3}
                title="Confirm" 
                onPress={handleConfirm} 
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: "60%",
    backgroundColor: "#eee",
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    width: "80%",
    borderColor: "#9900cc",
    borderWidth: 1,
    margin: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    width: "30%",
    margin: 6,
  }
});