import { View, Text } from 'react-native';
import React from 'react';
import Header from '../../Components/Header'
import { StyleSheet } from 'react-native';


export default function Entrada() {
 return (
    
    <View style={style.container}>
      
      <Header name="Cadu Menezes"/>
    
      <Text style={style.titulo}> Registro de Entrada </Text>
    
    
    
    </View>

    );
}

const style = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  titulo:{
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14
  },

})