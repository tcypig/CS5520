import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View, Button } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';


export default function App() {

  const appName = "My Awesome App";
  const [receivedData, setReceivedData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleInputData(data: string) {
    console.log("Data received from Input", data);
    setReceivedData(data);
    setIsModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Input 
        focused={true} 
        inputHandler={handleInputData} 
        modalVisble={isModalVisible}
      />
      <Button title='Add a goal' onPress={() => setIsModalVisible(true)} />
      <Text>{receivedData}</Text>
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
