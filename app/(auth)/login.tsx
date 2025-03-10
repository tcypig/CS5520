import { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '@/Firebase/firebaseSetup';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupHandler = () => {
    router.push('/(auth)/signup');
  };

  const loginHandler = async () => {
    try {
      if (email === '' || password === '') {
        alert('Please fill in all fields');
        return;
      }
  
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      router.push('/(protected)/index');
    } catch (error) {
      alert((error as any).message);
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
      <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
        <Text style={styles.link}>New User? Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' }
});
