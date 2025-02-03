import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View, Button, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';
import GoalItem from './components/GoalItem';
import { database } from './Firebase/firebaseSetup';
import { deleteAllFromDB, deleteFromDB, writeToDB } from './Firebase/firestoreHelper';
import { goalData } from './Firebase/firestoreHelper';
import { collection, onSnapshot } from 'firebase/firestore';

export interface GoalFromDB {
  id: string;
  text: string;
}

export default function App() {
  // console.log(database);
  const appName = "My Awesome App";
  const [goals, setGoals] = useState<GoalFromDB[]>([]); 

  const [receivedData, setReceivedData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    // start the listener on real time changes on goals collection
    const unsubscribe = onSnapshot(collection(database, "goals"), (querySnapshot) => {
      // check if the querySnapshot is empty
      // setGoals([])
      if (querySnapshot.empty) {
        setGoals([]);
      } else {
        let newArrayOfGoals: GoalFromDB[] = [];
        querySnapshot.forEach((docSnapshot) => {
          newArrayOfGoals.push({
            ...(docSnapshot.data() as goalData),
            id: docSnapshot.id
          });
        });
        console.log("newArray",newArrayOfGoals);
        setGoals(newArrayOfGoals);
      }
      // else forEach on the querySnapshot and get the data by calling docSnapshot.data()
      // store it in an array and setGoals with the array
    });
    // return a cleanup function to stop the listener
    return () => {
      unsubscribe();
    };
  }, []);

  function handleDeleteGoal(id: string) {
    console.log("Delete goal with id: ", id);
    // update the goals state by filtering out the goal with the id
    // setGoals((currGoals) => {
    //   return currGoals.filter((goal) => goal.id !== id);
    // });

    // delete the goal from the database
    deleteFromDB(id, "goals");
  }

  function handleDeleteAllGoals() {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "Yes",
          onPress: () => deleteAllFromDB("goals"),
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
