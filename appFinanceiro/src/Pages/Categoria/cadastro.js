import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import React, { useState } from 'react';
import Header from '../../Components/Header';
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';

export default function Entrada() {
  
  const [valor, setValor] = useState('')
  const [entrada, setEntrada] = useState(false);

  return (
    
    <View style={styles.container}>
      
      <Header name="Cadu Menezes"/>
    
      <Text style={styles.titulo}> Registro de Categoria </Text>
      
      <View style={styles.form}>

        <View>
          <Text style={styles.tituloForm}>Descrição:</Text>
          <TextInput 
          style={styles.input}
          onChangeText={setValor}
          value={valor}
          placeholder='Ex: Salário'
          />
        </View> 

        <View style={styles.swith}>
          
          <Text style={styles.tituloForm}>Entrada:</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={entrada ? '#20B2AA' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setEntrada}
            value={entrada}
          />

        </View>


      </View>
           
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