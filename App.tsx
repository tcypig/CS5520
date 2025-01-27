import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';

export interface Goal {
  id: number;
  text: string;
}

export default function App() {

  const appName = "My Awesome App";
  const [goals, setGoals] = useState<Goal[]>([]); 

  const [receivedData, setReceivedData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleInputData(data: string) {
    console.log("Data received from Input", data);
    // setReceivedData(data);
    setIsModalVisible(false);
    // define a variableo of type Goal object
    // update the goals state with the new goal object
    // use updating question
    let newGoal: Goal = {id: Math.random(), text: data}
    setGoals((currGoals)=> {return [...currGoals, newGoal]});
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
          cancelHandler={() => setIsModalVisible(false)}
        />
        <Button title='Add a goal' onPress={() => setIsModalVisible(true)} />
      </View>
      <View style={styles.bottomContainer}>
        <FlatList 
          contentContainerStyle={styles.contentContainer}
          data={goals} 
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            )}}
          />
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
    // alignItems: 'center',
  },

  // bottomText: {
  //   backgroundColor: "grey",
  //   borderRadius: 4,
  //   margin: 10,
  //   padding: 4,
  // },
  text:{
    color: "purple",
    fontSize: 80,
    marginTop: 50,
    backgroundColor: "#aaa",
    padding: 5,
    borderRadius: 5,
  },
  contentContainer: {
    alignItems: 'center',
  }
});
