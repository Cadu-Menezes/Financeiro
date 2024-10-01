import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { getAuth, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export default function EditarUsuario({ navigation }) {
  const [carregando, setCarregando] = useState(true);
  const [dadosUsuario, setDadosUsuario] = useState({
    nomeExibicao: '',
    urlFoto: '',
  });

  const [novoNome, setNovoNome] = useState('');
  const [novaUrlFoto, setNovaUrlFoto] = useState('');
  const [cameraPermissao, setCameraPermissao] = useState(null);
  const [galeriaPermissao, setGaleriaPermissao] = useState(null);
  const [mensagemSnackbar, setMensagemSnackbar] = useState('');

  useEffect(() => {
    const obterPermissoes = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const galeriaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setCameraPermissao(cameraStatus.status === 'granted');
      setGaleriaPermissao(galeriaStatus.status === 'granted');
    };

    obterPermissoes();

    const auth = getAuth();
    const usuario = auth.currentUser;

    if (usuario) {
      setDadosUsuario({
        nomeExibicao: usuario.displayName || '',
        urlFoto: usuario.photoURL || '',
      });

      setNovoNome(usuario.displayName || '');
      setNovaUrlFoto(usuario.photoURL || '');
    }

    setCarregando(false);
  }, []);

  const escolherFotoGaleria = async () => {
    if (!galeriaPermissao) {
      setMensagemSnackbar('Permissão para acessar a galeria é necessária!');
      return;
    }

    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setNovaUrlFoto(resultado.assets[0].uri);
    }
  };

  const tirarFotoCamera = async () => {
    if (!cameraPermissao) {
      setMensagemSnackbar('Permissão para acessar a câmera é necessária!');
      return;
    }

    let resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setNovaUrlFoto(resultado.assets[0].uri);
    }
  };

  const atualizarPerfil = () => {
    const auth = getAuth();
    const usuario = auth.currentUser;

    if (usuario) {
      updateProfile(usuario, {
        displayName: novoNome,
        photoURL: novaUrlFoto,
      })
        .then(() => {
          setMensagemSnackbar('Perfil atualizado com sucesso!');
          navigation.goBack();
        })
        .catch((error) => {
          setMensagemSnackbar('Erro ao atualizar perfil: ' + error.message);
        });
    }
  };

  if (carregando) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: novaUrlFoto || dadosUsuario.urlFoto }}
        style={styles.imagemPerfil}
      />
      <TextInput
        label="Nome"
        value={novoNome}
        onChangeText={setNovoNome}
        style={styles.input}
      />
      
      <Text style={styles.titulo}>Editar foto de perfil:</Text>

      <View style={styles.botoes}>
        <Button mode="contained" onPress={escolherFotoGaleria}>
          Escolher da Galeria
        </Button>
        <Button mode="contained" onPress={tirarFotoCamera}>
          Tirar Foto
        </Button>
      </View>
      <Button mode="contained" onPress={atualizarPerfil} style={styles.botao}>
        Salvar
      </Button>
      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.botao}>
        Cancelar
      </Button>
      <Snackbar
        visible={!!mensagemSnackbar}
        onDismiss={() => setMensagemSnackbar('')}
        duration={Snackbar.DURATION_SHORT}
      >
        {mensagemSnackbar}
      </Snackbar>
    </View>
  );
}

//pedi pro chat melhorar visualmente 
//acabou que ele corrigiu bastante coisa de fotos/imagens 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  imagemPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  botao: {
    marginTop: 10,
    width: '100%',
  },
});
