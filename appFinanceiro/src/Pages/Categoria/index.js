import { View, Text, TextInput, StyleSheet, Switch, FlatList } from 'react-native';
import React, { useState } from 'react';
import Header from '../../Components/Header';
import { SelectList } from 'react-native-dropdown-select-list'
import Movimentacoes from '../../Components/Movimentacoes'
import axios from 'axios';

export default function Entrada() {
  
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

  return (
    
    <View style={styles.container}>
      
      <Header name="Cadu Menezes"/>
    
      <Text style={styles.titulo}> Lista de Categorias </Text>
     
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
    flex: 1,
    backgroundColor: '#fafafa',
  },

  titulo:{
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14
  },

  tituloForm:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },

  form:{
    margin: 14
  },

  input:{
    borderColor: '#BFBFBF',
    borderStyle: 'solid',
    borderWidth : 2,
    borderRadius: 5,
    padding: 5
  },
  
  swith:{
    flexDirection: 'row',
    alignItems: 'center'
  },

  campoForm:{
    marginTop: 6
  }
  

})