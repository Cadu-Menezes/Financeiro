import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Routes from '../../Routes/routes';

export default function Card({entrada, saida}) {
 return (
   <View style={styles.container}>
        
        <View style={styles.item}>
   
            <Text style={styles.tituloItem}>Saldo</Text>
            <View style={styles.conteudo}>
                <Text style={styles.simbolo}>R$</Text>
                <Text style={styles.valorEntrada}>{entrada}</Text>
            </View>

        </View>
    

        <View style={styles.item}>
   
            <Text style={styles.tituloItem}>Gasto</Text>
            <View style={styles.conteudo}>
                <Text style={styles.simbolo}>R$</Text>
                <Text style={styles.valorSaida}>{saida}</Text>
            </View>

        </View>

   </View>
   
   
  );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: 18,
        paddingEnd: 18,
        marginTop: -24,
        marginStart: 14,
        marginEnd: 14,
        borderRadius: 4,
        paddingTop: 22,
        paddingBottom: 22,
        zIndex: 99,
    },
    
    tituloItem: {
        fontSize: 20,
        //color: '#DADADA',
    },

    conteudo:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    simbolo:{
        color: '#DADADA',
        marginRight: 6,
    },

    valorEntrada:{
        fontSize: 22,
        color: '#2ecc71'
    },
    
    valorSaida:{
        fontSize: 22,
        color: '#e73c3c'
    }
})