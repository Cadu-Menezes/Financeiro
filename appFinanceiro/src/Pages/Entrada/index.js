import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import React, { useState } from 'react';
import Header from '../../Components/Header';



export default function Entrada() {
  
  const [valor, setValor] = useState('')
  const [fixo, setFixo] = useState(false);
  //Aqui quando o swith é acionado eu mudo o valor anterior dele
  //Ex: de False vai para True | False --> True
  const toggleSwitch = () => setFixo(previousState => !previousState);

  function registrar(){
    const data = {
      valor,
      fixo
    }

    console.log(data)
  }


  return (
    
    <View style={styles.container}>
      
      <Header name="Cadu Menezes"/>
    
      <Text style={styles.titulo}> Registro de Entrada </Text>
      
      <View style={styles.form}>

        <Text style={styles.tituloForm}>Valor</Text>
        <TextInput 
        style={styles.input}
        onChangeText={setValor}
        value={valor}
        placeholder='Digite o valor: R$: 200,00'
        />
        
        <View style={styles.swith}>
          
          <Text style={styles.tituloForm}>Fixo:</Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={fixo ? '#20B2AA' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={fixo}
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
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth : 2,
    borderRadius: 5,
    padding: 5
  },
  
  swith:{
    flexDirection: 'row',
    alignItems: 'center'
  }
  

})