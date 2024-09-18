import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../../Components/Header';
import Card from '../../Components/Card';
import Movimentacoes from '../../Components/Movimentacoes';
import Acoes from '../../Components/Acoes';
import { useState, useEffect } from 'react';
import { obterMovimentacoes } from '../../Services/movimentacoesServices'; // Função para buscar do Firebase
import { getAuth } from 'firebase/auth';

export default function App() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEntrada, setTotalEntrada] = useState(0);
  const [totalSaida, setTotalSaida] = useState(0);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
     
    // Recuperar o email do usuário logado
     const auth = getAuth();
     const user = auth.currentUser;
     if (user) {
       setUserEmail(user.email); //
     }
     
    const unsubscribe = obterMovimentacoes((movimentacoesBuscadas) => {
      setMovimentacoes(movimentacoesBuscadas);
      calcularTotais(movimentacoesBuscadas);
      setLoading(false); // Parar de mostrar "Carregando..." quando os dados estiverem disponíveis
    });

    // Limpa o ouvinte quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  const calcularTotais = (movimentacoes) => {
    let entrada = 0;
    let saida = 0;

    movimentacoes.forEach((movimentacao) => {
      if (movimentacao.movimentacao === 'entrada') {
        entrada += parseFloat(movimentacao.valor);
      } else if (movimentacao.movimentacao === 'saida') {
        saida += parseFloat(movimentacao.valor);
      }
    });

    setTotalEntrada(entrada.toFixed(2));
    setTotalSaida(saida.toFixed(2));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header name={userEmail} />
      <Card entrada={`${totalEntrada}`} saida={`-${totalSaida}`} />
      <StatusBar style="auto" />

      <Acoes />

      <Text style={styles.titulo}>Últimas Movimentações</Text>

      <FlatList
        style={styles.lista}
        data={movimentacoes}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Movimentacoes data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 14,
  },
  lista: {
    flex: 1,
  },
});
