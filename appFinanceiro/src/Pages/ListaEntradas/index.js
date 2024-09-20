import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { obterEntradas, deletarMovimentacao, atualizarMovimentacao } from '../../Services/movimentacoesServices';
import EditarMovimentacao from '../../Components/EditarMovimentacao'; 
import { ActivityIndicator } from 'react-native-paper'; 

// Aqui na lista estava com dificuldade para ir para a minha tela de cadastro levando o Id então com a ajuda do amiguinho
//virtual eu fiz pela modal.

const ListaEntradas = () => {
  
    const [entradas, setEntradas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [idSelecionado, setIdSelecionado] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchData = async () => {
        
            try {
                
                const unsubscribe = obterEntradas(setEntradas);
                setLoading(false);

                // Limpeza ao desmontar o componente
                return () => unsubscribe();
                
                
            } catch (error) {
                console.error('Erro ao buscar entradas:', error);
            }

        };

        fetchData();
    
    }, []);

    const Deletar = (id) => {
        Alert.alert(
        'Confirmar exclusão',
        'Você tem certeza que deseja deletar esta movimentação?',
        [
            { text: 'Cancelar' },
            { text: 'Deletar', onPress: async () => {
                try {
                    await deletarMovimentacao(id);
                    setEntradas(entradas.filter(entrada => entrada.id !== id));
                } catch (error) {
                    console.error('Erro ao excluir movimentação:', error);
                }
            }},
        ]
        );
    };

    const Editar = (id, descricaoAtual, valorAtual, categoriaAtual) => {
        setIdSelecionado(id);
        setDescricao(descricaoAtual);
        setValor(valorAtual.toString());
        setCategoria(categoriaAtual);
        setModalVisible(true);
    };

    const Salvar = async () => {
        if (idSelecionado) {
            try {
                
                await atualizarMovimentacao(idSelecionado, { descricao, valor: parseFloat(valor), categoria });
                
                setEntradas(entradas.map(entrada => 
                    entrada.id === idSelecionado ? { ...entrada, descricao, valor: parseFloat(valor), categoria } : entrada
                ));

                setModalVisible(false);
                setIdSelecionado(null);
                setDescricao('');
                setValor('');
                setCategoria('');

            } catch (error) {
                console.error('Erro ao atualizar movimentação:', error);
            }
        }
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                
                <Text style={styles.cardTitle}>Categoria: {item.categoria || 'N/A'}</Text>
                <Text style={styles.cardValue}>Valor: R${item.valor || '0'}</Text>
                
                <View style={styles.buttonContainer}>

                    <Button mode="contained" onPress={() => Editar(item.id, item.descricao || '', item.valor || '', item.categoria || '')} style={styles.button}>
                        Editar
                    </Button>
                    
                    <Button mode="outlined" onPress={() => Deletar(item.id)} style={styles.button}>
                        Deletar
                    </Button>
                
                </View>
            
            </Card.Content>
        </Card>
    );


    if (loading) {
        return (
          <View style={styles.containerLoading}>
            <ActivityIndicator size="large" color="#6200ee" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        );
    }

    return (
        <View style={styles.container}>
            
            <Text style={styles.title}>Lista de Entradas</Text>
            
            <FlatList
                data={entradas}
                renderItem={renderItem}
                keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
            />
            
            <EditarMovimentacao
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={Salvar}
                descricao={descricao}
                setDescricao={setDescricao}
                valor={valor}
                setValor={setValor}
                categoria={categoria}
                setCategoria={setCategoria}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 12,
    elevation: 2,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginHorizontal: 4,
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListaEntradas;
