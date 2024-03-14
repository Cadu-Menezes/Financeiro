import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../../Components/Header'
import Card from '../../Components/Card'
import Movimentacoes from '../../Components/Movimentacoes'
import Acoes from '../../Components/Acoes';
import Routes from '../../Routes/routes';


const lista = [

  {
    id: 1,
    descricao: "Conta de luz",
    valor: "300,00",
    data: "25/01/2024", 
    tipo: 0 //saida
  }, 
  
  {
    id: 2,
    descricao: "Salario",
    valor: "3500,00",
    data: "25/01/2024", 
    tipo: 1 //entrada
  },

  {
    id: 3,
    descricao: "Faculdade",
    valor: "920,00",
    data: "25/01/2024", 
    tipo: 0 //saida
  }

]

export default function App() {
  return (
    
    <View style={styles.container}>
     
      <Header name="Cadu Menezes" />
       
      <Card entrada="4.500" saida="-921.99"/>
      
      <StatusBar style="auto" />

      <Acoes />

      <Text style={styles.titulo}>Últimas Movimentações</Text>

      <FlatList
        style={styles.lista}
        data={lista}
        keyExtractor={ (item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={ ({item}) => <Movimentacoes data={item} /> }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  titulo:{
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14
  },

  lista:{
    marginStart: 14,
    marginEnd: 14, 
  }

});
