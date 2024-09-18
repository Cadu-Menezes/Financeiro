import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; 
import { obterCategorias } from '../../Services/categoriaServices'; 

const EditarMovimentacao = ({ visible, onClose, onSave, valor, setValor, categoria, setCategoria }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const dadosCategorias = await obterCategorias();
        setCategorias(dadosCategorias);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        
        <Text style={styles.titulo}>Editar Movimentação</Text>
        
        <TextInput
          style={styles.input}
          value={valor}
          onChangeText={setValor}
        />
        
        {/* Chatzin */}
        <Picker
          selectedValue={categoria}
          style={styles.picker}
          onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          {categorias.map((categoria) => (
            <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.nome} />
          ))}
        </Picker>

        <Button mode="contained" onPress={onSave} style={styles.saveButton}>
          Salvar
        </Button>
        
        <Button mode="outlined" onPress={onClose} style={styles.cancelButton}>
          Cancelar
        </Button>
      
      </View>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    padding: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 4,
  },
  picker: {
    width: '80%',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 4,
  },
  saveButton: {
    marginVertical: 8,
    width: '80%',
  },
  cancelButton: {
    width: '80%',
    backgroundColor: '#fff',
  },
});

export default EditarMovimentacao;
