import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper'; 
import { auth } from '../../../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import EsqueciSenhaModal from '../../Components/EsqueciSenhaModal'; 
import { useNavigation } from '@react-navigation/native'; 

export default function Login({ setLogin }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false); // Controle de visibilidade da modal
  const navigation = useNavigation(); 

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (err) {
      setError(`Falha no login: ${err.message}`);
    }
  };

  const handleEsqueciSenha = () => {
    setModalVisible(true); // Abre a modal
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
