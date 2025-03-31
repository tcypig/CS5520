import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View, Button, SafeAreaView, ScrollView, FlatList, Alert, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Input from '@/components/Input';
import GoalItem from '@/components/GoalItem';
import { auth, database, storage } from '@/Firebase/firebaseSetup';
import { deleteAllFromDB, deleteFromDB, writeToDB } from '@/Firebase/firestoreHelper';
import { GoalData } from '@/Firebase/firestoreHelper';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import PressableButton from '@/components/PressableButton';
import { UserInput } from '@/components/Input';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { setNotificationHandler } from 'expo-notifications';

export interface GoalFromDB {
  id: string;
  text: string;
}

setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }
  }
});

export default function App() {
  // console.log(database);
  const appName = "My Awesome App";
  const [goals, setGoals] = useState<GoalFromDB[]>([]); 

  const [receivedData, setReceivedData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    // start the listener on real time changes on goals collection
    if (!auth.currentUser) return;
    const unsubscribe = onSnapshot(
      query(collection(database, "goals"),
      where("owner", "==", auth.currentUser?.uid)
    ), (querySnapshot) => {      
      // check if the querySnapshot is empty
      // setGoals([])
      if (querySnapshot.empty) {
        setGoals([]);
      } else {
        let newArrayOfGoals: GoalFromDB[] = [];
        querySnapshot.forEach((docSnapshot) => {
          newArrayOfGoals.push({
            ...(docSnapshot.data() as GoalData),
            id: docSnapshot.id
          });
        });
        // console.log("newArray",newArrayOfGoals);
        setGoals(newArrayOfGoals);
      }
    }, (error: any) => {
      console.error("Error reading goals", error);
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

  function handleConfirmDeleteGoal(id: string) {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this item?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => deleteFromDB(id, "goals"),
        },
      ]
    )

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

  async function fetchImage(uri: string) {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error("Error fetching image");
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      console.log("Image name", `images/${imageName}`);
      console.log("storage", storage);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      console.log("Upload result", uploadResult);
      return uploadResult.metadata.fullPath;


    } catch (error) {
      console.error("Error fetching image", error);
    }
  }

  async function handleInputData(data: UserInput) {
    console.log("Data received from Input", data.imageUri);

    let storedImageUri = "";
    if (data.imageUri) {
      storedImageUri = await fetchImage(data.imageUri) ?? "";
      console.log("Stored image uri", storedImageUri);
    }

    // setReceivedData(data);
    setIsModalVisible(false);
    // define a variableo of type Goal object
    // update the goals state with the new goal object
    // use updating question
    if (auth.currentUser?.uid) {
      let newGoal: GoalData = {
        text: data.text, 
        owner: auth.currentUser.uid,
        imageUri: storedImageUri ?? ""
      };
      writeToDB(newGoal, "goals");
    } else {
      console.error("User is not authenticated");
    }
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
        <PressableButton 
          componentStyle={{backgroundColor: "white"}}
          pressedHandler={() => setIsModalVisible(true)}>
          <Text style={styles.addGoalButton}>Add a Goal</Text>
        </PressableButton>
        {/* <Button title='Add a goal' onPress={() => setIsModalVisible(true)} /> */}
      </View>
      <View style={styles.bottomContainer}>
        <FlatList 
          contentContainerStyle={styles.contentContainer}
          data={goals} 
          renderItem={({ item, separators }) => {
            return (
              <GoalItem 
                goalObj={item} 
                deleteHandler={handleDeleteGoal} 
                deleteConfirmHandler={handleConfirmDeleteGoal} 
                separators={separators}
              />
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
          ItemSeparatorComponent={({highlighted})=> (
            <View style={[styles.separator, highlighted && {backgroundColor: 'blue'}]}/>
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
  separatorHighlighted: {
    height: 2,
    backgroundColor: "blue",
    marginVertical: 10,
  },
  bottomButton: {
    margin: 20,
  },
  addGoalButton: {
    padding: 5,
    fontSize: 15,
    color: "white",
    borderRadius: 5,
    backgroundColor: "purple",
  }
});
