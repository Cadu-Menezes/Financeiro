import { useState } from 'react';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Movimentacoes({data}) {

    
    return (
   
        <TouchableOpacity style={styles.container}>
        
            <Text style={styles.data}>{data.data}</Text>

            <View style={styles.conteudo}>
                
                <Text style={styles.descricao}> {data.descricao}</Text>
                
                <Text style={data.tipo == 1 ? styles.valor : styles.saida}>
                    {data.tipo === 1 ? `R$: ${data.valor}` : ` R$: - ${data.valor}`} 
                </Text>
            
            </View>
        
        </TouchableOpacity>
  
  );
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        marginBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: "#DADADA"
    },

    conteudo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8
    },

    data:{
        fontWeight: 'bold'
    },

    

    descricao:{

    },

    valor:{
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    saida:{
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: 'bold'
    }

})