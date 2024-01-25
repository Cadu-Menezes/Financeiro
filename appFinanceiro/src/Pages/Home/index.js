import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../Components/Header'

export default function App() {
  return (
    <View style={styles.container}>
      <Header name="Cadu Menezes" />
      <Text>Pagina Home</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
