import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Movimentacoes({ data }) {
    const [showValue, setShowValue] = useState(false);

    console.log("Data - Movimentacao", data);

    return (
        <TouchableOpacity style={styles.container} onPress={() => setShowValue(!showValue)}>
            <View style={styles.conteudo}>
                <Text style={styles.descricao}> {data.data || 'Não há data para este registro'}</Text>
                <Text style={styles.descricao}> {data.categoria || 'Sem Categoria'}</Text>

                <View style={styles.infoContainer}>
                    <View style={styles.valorContainer}>
                        {showValue && (
                            <Text style={data.movimentacao === 'entrada' ? styles.valor : styles.saida}>
                                {data.movimentacao === 'entrada' ? `R$: ${data.valor}` : `R$: -${data.valor}`} 
                            </Text>
                        )}
                    </View>
                    <View style={styles.iconContainer}>
                        {data.movimentacao === 'entrada' && (
                            <Icon name="arrow-up" size={20} color="#2ecc71" />
                        )}
                        {data.movimentacao === 'saida' && (
                            <Icon name="arrow-down" size={20} color="#e74c3c" />
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: "#DADADA",
        padding: 10,
    },
    conteudo: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 2,
        marginBottom: 8,
    },
    descricao: {
        fontSize: 16,
    },
    valorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    valor: {
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold',
    },
    saida: {
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: 'bold',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
