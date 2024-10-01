import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { criarCategoria, atualizarCategoria } from '../../Services/categoriaServices';

export default function FormularioCategoria({ route, navigation }) {
  const { categoria } = route.params || {};
  const [nome, setNome] = useState(categoria ? categoria.nome : '');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome);
    }
  }, [categoria]);

  const handleSubmit = async () => {
    setErro(''); 
    try {
      if (categoria) {
        await atualizarCategoria(categoria.id, { nome });
      } else {
        await criarCategoria({ nome });
      }
      navigation.goBack();
    } catch (err) {
      setErro('Falha ao salvar a categoria.');
      console.error('Erro ao salvar categoria:', err); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoria ? 'Editar Categoria' : 'Adicionar Categoria'}</Text>

      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      <TextInput
        label="Nome da Categoria"
        value={nome}
        onChangeText={setNome}
        mode="outlined"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        {categoria ? 'Salvar' : 'Adicionar'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
