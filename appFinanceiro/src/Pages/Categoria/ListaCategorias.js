import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { obterCategorias, deletarCategoria } from '../../Services/categoriaServices';
import { getCategorias } from '../../Services/database'; 
import NetInfo from '@react-native-community/netinfo'; 


//GPT Ajudou mt no offline
export default function ListaCategorias({ navigation }) {
  
  const [categorias, setCategorias] = useState([]);
  const [isOnline, setIsOnline] = useState(true); // Estado para armazenar status da conexão

  const fetchCategorias = async () => {
    try {
      if (isOnline) {
        // Se estiver online, buscar categorias do serviço e atualiza o banco de dados 
        const categoriasBuscadas = await obterCategorias();
        setCategorias(categoriasBuscadas);
        // Aqui você pode adicionar a lógica para armazenar no SQLite se necessário
      } else {
        // Se estiver offline, buscar categorias do SQLite usando a função getCategorias
        getCategorias((categoriasSalvas) => {
          setCategorias(categoriasSalvas);
          console.log('Offline: carregando categorias do SQLite');
        });
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    
    // Verificar o status da conexão
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    fetchCategorias(); // Carregar categorias inicialmente

    const focusListener = navigation.addListener('focus', () => {
      fetchCategorias(); // Atualizar a lista quando a tela ganhar foco
    });

    return () => {
      unsubscribe(); // Desinscrever do listener de rede
      focusListener(); // Limpar o ouvinte quando o componente for desmontado
    };
  }, [navigation, isOnline]);

  const handleDelete = async (id) => {
    Alert.alert(
      'Excluir Categoria',
      'Tem certeza de que deseja excluir esta categoria?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deletarCategoria(id);
              // Atualizar a lista localmente após exclusão
              const categoriasAtualizadas = categorias.filter(categoria => categoria.id !== id);
              setCategorias(categoriasAtualizadas);
            } catch (error) {
              console.error('Erro ao excluir categoria:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()} // Ajuste para garantir que o ID seja uma string
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('FormularioCategoria', { categoria: item })}
                style={styles.button}
              >
                Editar
              </Button>
              <Button
                mode="outlined"
                onPress={() => handleDelete(item.id)}
                style={[styles.button, styles.deleteButton]}
              >
                Deletar
              </Button>
            </Card.Content>
          </Card>
        )}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('FormularioCategoria')}
        style={styles.addButton}
      >
        Adicionar Categoria
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  deleteButton: {
    borderColor: 'red',
    borderWidth: 1,
    color: 'red',
  },
  addButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});