import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,  View } from 'react-native';
import Header from './components/Header';
import Input from './components/Input';


export default function App() {

  const appName = "My Awesome App";

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName} />
      <Input focused={true}/>
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
