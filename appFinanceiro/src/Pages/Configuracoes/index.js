import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Card, ActivityIndicator } from 'react-native-paper';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Configuracao({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState({
    email: '',
    displayName: '',
    photoURL: '',
  });

  useEffect(() => {
    const auth = getAuth();
    
    // Listener para mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario({
          email: user.email,
          displayName: user.displayName || 'Usuário sem nome',
          photoURL: user.photoURL || 'https://via.placeholder.com/150', // Placeholder para usuários sem foto || by chatzin
        });
      } else {
        setUsuario({
          email: '',
          displayName: 'Usuário sem nome',
          photoURL: 'https://via.placeholder.com/150',
        });
      }
      setLoading(false);
    });

    // Limpar o listener quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" animating={true} />
        <Text style={styles.title}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image
            source={{ uri: usuario.photoURL }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{usuario.displayName}</Text>
          <Text style={styles.email}>{usuario.email}</Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button mode="contained" onPress={() => navigation.navigate('EditarUsuario', { usuario })}>
            Editar Perfil
          </Button>
          <Button mode="outlined" onPress={() => navigation.goBack()}>
            Sair
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}



//pedi pro chat melhorar visualmente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  cardContent: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
