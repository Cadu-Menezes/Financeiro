import { View, Text, TextInput, StyleSheet, Switch, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import { SelectList } from 'react-native-dropdown-select-list'
import Movimentacoes from '../../Components/Movimentacoes'
import { getListaCategorias } from "./functions/listacategorias"
import Loading from "../../Components/Loading"

export default function Entrada() {
  
    const [data, setData] = useState([]);
    const [load, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      getListaCategorias(setData, setLoading, setError)
    }, [])

    useEffect(() => {
      console.log(data)
    }, [data])

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
      ]

  return (
    
    <View style={styles.container}>
      
      <Header name="Cadu Menezes"/>
    
      <Text style={styles.titulo}> Lista de Categorias </Text>

      <Loading/>

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