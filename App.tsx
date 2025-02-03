import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View, Button, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';
import GoalItem from './components/GoalItem';
import { database } from './Firebase/firebaseSetup';
import { writeToDB } from './Firebase/firestoreHelper';
import { goalData } from './Firebase/firestoreHelper';

export interface GoalDB {
  id: number;
  text: string;
}

export default function App() {
  console.log(database);
  const appName = "My Awesome App";
  const [goals, setGoals] = useState<GoalDB[]>([]); 

  const [receivedData, setReceivedData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleDeleteGoal(id: number) {
    console.log("Delete goal with id: ", id);
    // update the goals state by filtering out the goal with the id
    setGoals((currGoals) => {
      return currGoals.filter((goal) => goal.id !== id);
    });
  }

  function handleDeleteAllGoals() {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "Yes",
          onPress: () => setGoals([])
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    )
  }

  function handleInputData(data: string) {
    console.log("Data received from Input", data);
    // setReceivedData(data);
    setIsModalVisible(false);
    // define a variableo of type Goal object
    // update the goals state with the new goal object
    // use updating question
    let newGoal: goalData = {text: data};
    writeToDB(newGoal, "goals");
    // setGoals((currGoals)=> {return [...currGoals, newGoal]});
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
              <GoalItem goalObj={item} deleteHandler={handleDeleteGoal} />
            )}}
          ListEmptyComponent={()=> (
            <Text style={styles.text}>No goals to show</Text>
          )}
          ListHeaderComponent={()=> (
            goals.length > 0 && (
              <Text style={styles.text}>My Goal List</Text>
            )
          )}
          ListFooterComponent={()=> (
            goals.length > 0 && (
              <View style={styles.bottomButton}>
                <Button
                  title= "Delete All"
                  onPress={handleDeleteAllGoals}
                />
              </View>
            )
          )}
          ItemSeparatorComponent={()=> (
            <View style={styles.separator}/>
          )}
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
    fontSize: 20,
    marginTop: 5,
    // backgroundColor: "#aaa",
    padding: 5,
    borderRadius: 5,
  },
  contentContainer: {
    alignItems: 'center',
  },
  separator: {
    height: 2,
    backgroundColor: "purple",
    marginVertical: 10,
  },
  bottomButton: {
    margin: 20,
  }
});
