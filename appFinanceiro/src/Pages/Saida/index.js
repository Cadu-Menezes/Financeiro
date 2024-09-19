import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; 
import { criarMovimentacao } from '../../Services/movimentacoesServices';
import { obterCategorias } from '../../Services/categoriaServices';

export default function Saida({ navigation }) {
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasBuscadas = await obterCategorias();
        setCategorias(categoriasBuscadas);
        if (categoriasBuscadas.length > 0) {
          setCategoria(categoriasBuscadas[0].id); // Definir a primeira categoria como padrão
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!valor || !categoria) {
        setErro('Todos os campos são obrigatórios.');
        return;
      }

      // Obter a data atual no formato desejado (DD/MM/YYYY) -- chatzin
      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
      const ano = hoje.getFullYear();
      const dataAtual = `${dia}/${mes}/${ano}`;

      // Criar a movimentação com as URLs das imagens
      await criarMovimentacao({
        valor,
        categoria,
        movimentacao: 'saida',
        data: dataAtual,
      });

      navigation.goBack();

    } catch (err) {

      setErro('Falha ao salvar a movimentação.');
    
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.title}>Cadastrar Saída</Text>

      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      <TextInput
        label="Valor"
        value={valor}
        onChangeText={setValor}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Categoria</Text>
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.input}
      >
        {categorias.map(categoria => (
          <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.nome} />
        ))}
      </Picker>

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Salvar
      </Button>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
 
});
