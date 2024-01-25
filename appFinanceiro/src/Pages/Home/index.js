import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../Components/Header'
import Card from '../../Components/Card'

export default function App() {
  return (
    <View style={styles.container}>
      <Header name="Cadu Menezes" />
      <Card entrada="4.500" saida="-921.99"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});
