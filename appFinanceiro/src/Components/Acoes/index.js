import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {AntDesign} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


export default function Acoes() {

    const {navigate} =  useNavigation();

 return (
   <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
        
        <TouchableOpacity style={styles.Botao} onPress={ () => {navigate('Entrada')} }>
            <View style={styles.areaBotao}>
                <AntDesign name='addfolder' size={26} color={'#000'}/>
            </View>
            <Text style={styles.descricaoBotao}>Entradas</Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.Botao} onPress={ () => {navigate('Saida')} }>
            <View style={styles.areaBotao}>
                <AntDesign name='tagso' size={26} color={'#000'}/>
            </View>
            <Text style={styles.descricaoBotao}>Saidas</Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.Botao}>
            <View style={styles.areaBotao}>
                <AntDesign name='setting' size={26} color={'#000'}/>
            </View>
            <Text style={styles.descricaoBotao}>Conta</Text>

        </TouchableOpacity>

   </ScrollView>
  );
}


const styles = StyleSheet.create({

    container:{
        maxHeight: 84,
        marginTop: 18,
        marginStart: 14,
        marginEnd: 14,
        paddingStart: 14
    },

    Botao:{
        alignItems: 'center',
        marginRight: 32
    },

    areaBotao:{
        backgroundColor: '#ecf0f1',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    descricaoBotao:{
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold'
    }

})
