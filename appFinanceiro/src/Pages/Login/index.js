import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { auth } from '../../../firebaseConfig'; 
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; 
import EsqueciSenhaModal from '../../Components/EsqueciSenhaModal'; 
import { useNavigation } from '@react-navigation/native'; 
import NetInfo from '@react-native-community/netinfo'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false); // Controle de visibilidade da modal
  const navigation = useNavigation(); 


   // Efeito para verificar credenciais armazenadas localmente -- chatzin
   useEffect(() => {
    const checkStoredCredentials = async () => {
      try {
        
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedPassword = await AsyncStorage.getItem('userPassword'); 
        
        console.log('Credenciais armazenadas:', storedEmail, storedPassword);

        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);

          // Tentar autenticar automaticamente com Firebase
          try {
            await getStoredCredentials(storedEmail, storedPassword);
            navigation.navigate('AppTabs'); // Navegar para a tela com tabs após login
          } catch (err) {
            console.error('Erro ao autenticar com credenciais armazenadas:', err);
          }
        }
      } catch (error) {
        console.error('Erro ao recuperar dados armazenados:', error);
      }
    };

    checkStoredCredentials();
  }, []);
  
  // Recuperar credenciais armazenadas -- chatzin
  const getStoredCredentials = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      const password = await AsyncStorage.getItem('userPassword');
      return { email, password };
    } catch (error) {
      console.error('Erro ao recuperar credenciais:', error);
      return { email: null, password: null };
    }
  };

  const handleLogin = async () => {
    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      
      // Armazenar o email e a senha localmente após login -- chatzin
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password); 

      navigation.navigate('AppTabs'); // Navegar para a tela com tabs após login
    
    } catch (err) {
      //chatzin
      if (err.code === 'auth/network-request-failed') {
        setError('Sem conexão com a internet. Verifique sua conexão e tente novamente.');
      } else {
        setError(`Falha no login: ${err.message}`);
      }
    
    }

  };

  const handleEsqueciSenha = () => {
    setModalVisible(true); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        label="Senha"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>

      <Button mode="text" onPress={handleEsqueciSenha} style={styles.forgotPassword}>
        Esqueci minha senha
      </Button>

      {/* Modal de redefinição de senha */}
      <EsqueciSenhaModal 
        visible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
      />
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
  forgotPassword: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});
