import { useState } from 'react';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Grid({data}) {

    const [showValue, setShowValue] = useState(false);
    
    return (
   
        
        <View>
           

            <View style={styles.conteudo}>
                
                <Text style={styles.descricao}>Id: {data.id}</Text>
                <Text style={styles.descricao}>Descrição: {data.categoriadescricao}</Text>
                <Text style={styles.descricao}>Entrada: {data.categoriaentrada ? 'Sim' : 'Não'} </Text>
                            
            </View>

        </View>
        
  
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
        flexDirection: 'column',
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
    },

    esconder:{
        marginTop: 6,
        width: 80,
        height: 10,
        backgroundColor: '#DADADA',
        borderRadius: 8
    }

})