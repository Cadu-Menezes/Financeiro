import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from '../../Components/Header';
import Card from '../../Components/Card';
import Movimentacoes from '../../Components/Movimentacoes';
import Acoes from '../../Components/Acoes';
import { useState, useEffect } from 'react';
import { obterMovimentacoes } from '../../Services/movimentacoesServices'; 
import { getAuth } from 'firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import { getMovimentacoes as getMovimentacoesOffline } from '../../Services/database'; 

export default function Home() {
  
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEntrada, setTotalEntrada] = useState(0);
  const [totalSaida, setTotalSaida] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [isOnline, setIsOnline] = useState(true); 

  useEffect(() => {
    // Recuperar o email do usuário logado
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
    
    // Verificar se o dispositivo está online ou offline
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    const carregarMovimentacoes = () => {
      if (isOnline) {
        // Se estiver online, buscar do Firestore
        const unsubscribe = obterMovimentacoes((movimentacoesBuscadas) => {
          console.log("📊 Movimentações obtidas online:", movimentacoesBuscadas);
          setMovimentacoes(movimentacoesBuscadas);
          calcularTotais(movimentacoesBuscadas);
          setLoading(false); 
        });

        // Limpa o ouvinte quando o componente for desmontado
        return () => unsubscribe();
      } else {
        // Se estiver offline, carregar do banco de dados local (SQLite)
        getMovimentacoesOffline((movimentacoesOffline) => {
          console.log("📊 Movimentações obtidas offline:", movimentacoesOffline);
          setMovimentacoes(movimentacoesOffline);
          calcularTotais(movimentacoesOffline);
          setLoading(false);
        });
      }
    };

    carregarMovimentacoes();
    
    // Limpa o listener de rede quando o componente for desmontado
    return () => unsubscribeNetInfo();
  }, [isOnline]);

  const calcularTotais = (movimentacoes) => {
    let entrada = 0;
    let saida = 0;

    movimentacoes.forEach((movimentacao) => {
      if (movimentacao.tipo === 'entrada') {
        entrada += parseFloat(movimentacao.valor);
      } else if (movimentacao.tipo === 'saida') {
        saida += parseFloat(movimentacao.valor);
      }
    });

    setTotalEntrada(entrada.toFixed(2));
    setTotalSaida(saida.toFixed(2));
  };

  if (loading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Carregando...</Text>
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
  containerLoading: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6200ee',
  }
});
