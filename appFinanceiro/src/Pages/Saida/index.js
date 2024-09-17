import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; 
import * as ImagePicker from 'expo-image-picker'; 
import { criarMovimentacao } from '../../Services/movimentacoesServices';
import { obterCategorias } from '../../Services/categoriaServices';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 

export default function Saida({ navigation }) {
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [imagens, setImagens] = useState([]); 
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

  const selecionarImagens = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria foi negada!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Permitir seleção de múltiplas imagens
      quality: 1,
    });

    if (!result.canceled) {
      setImagens([...imagens, ...result.assets]);
    }
  };

  const removerImagem = (index) => {
    const novasImagens = [...imagens];
    novasImagens.splice(index, 1);
    setImagens(novasImagens);
  };

  const uploadImagem = async (uri) => {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();
    const imagemRef = ref(storage, `imagens/${Date.now()}`);
    await uploadBytes(imagemRef, blob);

    const downloadURL = await getDownloadURL(imagemRef);
    return downloadURL;
  };

  const handleSubmit = async () => {
    try {
      if (!valor || !categoria) {
        setErro('Todos os campos são obrigatórios.');
        return;
      }

      // Fazer o upload das imagens
      const urlsImagens = [];
      for (const imagem of imagens) {
        const url = await uploadImagem(imagem.uri);
        urlsImagens.push(url);
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
        imagens: urlsImagens, // Adiciona as URLs das imagens à movimentação
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

      <Button mode="outlined" onPress={selecionarImagens} style={styles.button}>
        Selecionar Fotos
      </Button>

      <ScrollView horizontal style={styles.imagensContainer}>
        {imagens.map((imagem, index) => (
          <View key={index} style={styles.imagemWrapper}>
            <Image source={{ uri: imagem.uri }} style={styles.imagem} />
            <Button mode="text" onPress={() => removerImagem(index)}>
              Remover
            </Button>
          </View>
        ))}
      </ScrollView>

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
  imagensContainer: {
    marginTop: 20,
  },
  imagemWrapper: {
    marginRight: 10,
    alignItems: 'center',
  },
  imagem: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
});
