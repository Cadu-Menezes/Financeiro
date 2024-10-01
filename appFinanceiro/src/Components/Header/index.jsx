import React, { useState } from "react";
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Menu } from 'react-native-paper'; 
import { signOut } from "firebase/auth"; 
import { auth } from '../../../firebaseConfig'; 
import { useNavigation } from '@react-navigation/native'; 

const statusBarAltura = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64 

export default function Header({ name }) {
    const [visible, setVisible] = useState(false); 
    const navigation = useNavigation(); 

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleLogout = async () => {
        try {
            await signOut(auth); 
            navigation.navigate('Login')
        } catch (error) {
            console.log('Erro ao fazer logout: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.conteudo}>
                <Text style={styles.usuario}>{name}</Text>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={
                        <TouchableOpacity style={styles.botaoUsuario} onPress={openMenu}>
                            <Feather name="user" size={27} color={'#FFF'} />
                        </TouchableOpacity>
                    }
                >
                    <Menu.Item onPress={handleLogout} title="Logout" />
                </Menu>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#20B2AA',
        paddingTop: statusBarAltura,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 44,
    },
    conteudo: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    usuario: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    botaoUsuario: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 44 / 2,
    }
});
