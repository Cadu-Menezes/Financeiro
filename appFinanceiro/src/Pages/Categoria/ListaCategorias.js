import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { obterCategorias, deletarCategoria } from '../../Services/categoriaServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CATEGORIAS_STORAGE_KEY = '@categorias';

export default function ListaCategorias({ navigation }) {
  const [categorias, setCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      // Tentar obter categorias do AsyncStorage
      const categoriasSalvas = await AsyncStorage.getItem(CATEGORIAS_STORAGE_KEY);
      if (categoriasSalvas) {
        setCategorias(JSON.parse(categoriasSalvas));
      }

      // Buscar categorias do serviço e atualizar AsyncStorage
      const categoriasBuscadas = await obterCategorias();
      setCategorias(categoriasBuscadas);
      await AsyncStorage.setItem(CATEGORIAS_STORAGE_KEY, JSON.stringify(categoriasBuscadas));
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  useEffect(() => {
    fetchCategorias();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchCategorias(); // Atualizar a lista quando a tela ganhar foco
    });

    return unsubscribe; // Limpar o ouvinte quando o componente for desmontado
  }, [navigation]);

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
              await AsyncStorage.setItem(CATEGORIAS_STORAGE_KEY, JSON.stringify(categoriasAtualizadas));
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
        keyExtractor={(item) => item.id}
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
