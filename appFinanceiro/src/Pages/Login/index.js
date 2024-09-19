import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { auth } from '../../../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import EsqueciSenhaModal from '../../Components/EsqueciSenhaModal'; 
import { useNavigation } from '@react-navigation/native'; 
import NetInfo from '@react-native-community/netinfo'; 

export default function Login() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false); // Controle de visibilidade da modal
  const [online, setOnline] = useState(true); // Estado para verificar conexão com a internet
  const navigation = useNavigation(); 

  useEffect(() => {
    const verificaConexao = NetInfo.addEventListener(state => {
      setOnline(state.isConnected);
    });

    return () => {
      verificaConexao();
    };
  }, []);

  const handleLogin = async () => {
    if (online) {
      // Verifica as credenciais no Firebase quando online
      try {
        
        await signInWithEmailAndPassword(auth, email, password);
        
        await AsyncStorage.setItem('userEmail', email); // Armazena o email do usuário para caso tente entrar offline

        navigation.navigate('AppTabs'); // Navegar para a tela com tabs após login
      
      } catch (err) {
       
        if (err.code === 'auth/network-request-failed') {
          setError('Sem conexão com a internet. Verifique sua conexão e tente novamente.');
        } else {
          setError(`Falha no login: ${err.message}`);
        }
      
      }
    } else {
      
      // Verifica se tem credenciais armazenadas localmente quando offline
      try {

        const storedEmail = await AsyncStorage.getItem('userEmail');
        
        //se o email for igual ao armazenado, navega para a tela de tabs, se não, mostra erro
        
        if (storedEmail === email) {
        
          navigation.navigate('AppTabs');
        
        } else {
        
          setError('Credenciais inválidas.');
        
        }
      } catch (err) {
        
        setError('Erro ao verificar credenciais offline.');
      
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
