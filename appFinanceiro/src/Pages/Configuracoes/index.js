import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { getAuth } from 'firebase/auth';

export default function Configuracao({ navigation }) {
    
    console.log("chamou")
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        
        // Recuperar o email do usuário logado
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
        setUserEmail(user.email); //
        }
        
    }, []);

    return (
        <View style={styles.container}>
        
            <Text style={styles.title}>Confiruações</Text>

            <Text style={styles.title}>{userEmail}</Text>
       
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
