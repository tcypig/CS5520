import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '@/Firebase/firebaseSetup';
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupHandler = () => {
    router.replace('signup');
  };

  const loginHandler = async () => {
    if (email === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login successful!');
      // router.push('/(protected)/index');
    } catch (error: any) {
      // Alert.alert("Error", error.message);
      if (
        error instanceof FirebaseError &&
        "code" in error &&
        "message" in error
      ) {
        if (error.code === "auth/user-not-found") {
          Alert.alert("Error", "User not found");
          return;
        } else if (error.code === "auth/invalid-credential") {
          Alert.alert("Error", "Invalid credentials");
          return;
        }
        // Replace there with user friendly error message
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log In" onPress={loginHandler} />
      <Button title="New User? Create an account" onPress={signupHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' }
});
