import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import { SelectList } from 'react-native-dropdown-select-list'
import { getListaCategorias } from "./functions/listacategorias"
import LoadingComponent from "../../Components/Loading"
import { Card } from '@ui-kitten/components';
import Grid from '../../Components/Grid'

export default function Entrada() {
  
    const [data, setData] = useState([]);
    const [load, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      getListaCategorias(setData, setLoading, setError)
    }, [])

    // useEffect(() => {
    //   console.log(data)
    // }, [data])
    
    const lista = []
    
    for (let item of data) {
      
      lista.push(item)

    }
    console.log(lista)

  return (
    
    <View style={styles.container}>
      
      <Header name="Cadu Menezes"/>
    
      <Text style={styles.titulo}> Lista de Categorias </Text>

      <>
        
        {load && <LoadingComponent />}

        <FlatList
            style={styles.lista}
            data={lista}
            keyExtractor={ (item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={ ({item}) => <Grid data={item} /> }
          />
      
      </>

                 
    
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