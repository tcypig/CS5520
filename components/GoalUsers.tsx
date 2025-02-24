import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { writeToDB } from '@/Firebase/firestoreHelper';

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
  const [users, setUsers] = useState<User[]>([]);

  useEffect( () => {
    async function getUsers() {
      try{
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