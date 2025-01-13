import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './components/Header';
import { useState } from 'react';


export default function App() {
  const [text, setText] = useState("");

  const appName = "My Awesome App";
  function updateText(changedText: string) {
    // update the text state
    setText(changedText);
  }

  return (
    <View style={styles.container}>
      {/* <Text>Welcome to {appName}</Text> */}
      <StatusBar style="auto" />
      <Header name={appName}/>
      {}
      <TextInput 
        value={text} 
        onChangeText={updateText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
