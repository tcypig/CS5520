import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View, Button, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header name={appName} />
        <Input 
          focused={true} 
          inputHandler={handleInputData} 
          modalVisble={isModalVisible}
        />
        <Button title='Add a goal' onPress={() => setIsModalVisible(true)} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomText}>
          <Text style={{ color: "#00008B" }}>{receivedData}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'space-around', 
    alignItems: 'center',  
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: '#dcd',
    alignItems: 'center',
  },

  bottomText: {
    backgroundColor: "grey",
    borderRadius: 4,
    margin: 10,
    padding: 4,
  }
});
