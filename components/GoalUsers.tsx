import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { readAllFromDB, writeToDB } from '@/Firebase/firestoreHelper';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

interface GoalUsersProps {
  goalId: string;
}

export default function GoalUsers({goalId}: GoalUsersProps) {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect( () => {
    async function getUsers() {
      try{
        // check if the users are already in the database
        // if they are, fetch them from the database
        const userFromDB = await readAllFromDB(`goals/${goalId}/users`);
        console.log("data from db ");
        if (userFromDB) {
          const userNames = userFromDB.map((user: User) => ({
            id: user.id.toString(), 
            name: user.name,
          }));
          setUsers(userNames);
          return;
        }

        // if they are not in the database, fetch them from the API
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error(
            `Something went wrong with the ${response.status} code`
          );
        } 
        const data = await response.json();
        const userNames = data.map((user: User) => ({
          id: user.id.toString(), 
          name: user.name,
        }));
        console.log("data from api ");
        setUsers(userNames);
        data.forEach((user: User) => {
          writeToDB(user, `goals/${goalId}/users`); 
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
    
  }, [goalId])

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <Text>{item.name }</Text>;
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})