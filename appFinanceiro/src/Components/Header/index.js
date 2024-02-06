import React from "react";
import { View, StyleSheet, Text, StatusBar, TouchableOpacity} from "react-native";
import {Feather} from '@expo/vector-icons'

//Aqui estou pegando a altura do statusBar para poder dar um padding para 
//nao ficar colado no topo do celular
const statusBarAltura = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64 

export default function Header({name}){

    return(
        
        <View style={styles.container}>
        
            <View style={styles.conteudo}>
            
                <Text style={styles.usuario}>{name}</Text>
                <TouchableOpacity style={styles.botaoUsuario}>
                    <Feather name="user" size={27} color={'#FFF'}/>
                </TouchableOpacity>
            
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        backgroundColor: '#20B2AA',
        paddingTop: statusBarAltura,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 44,
    },

    conteudo:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    usuario:{
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },

    botaoUsuario:{
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44 / 2,
    }

})