import React, { useState, useEffect } from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Provider as PaperProvider } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import { createTable, getMovimentacoes, getCategorias, addMovimentacao, addCategoria, clearTable, clearTableCategory } from './src/Services/database';
import Routes from './src/Routes/routes';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig'; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    createTable();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    const checkNetworkStatus = async () => {
      const state = await NetInfo.fetch();
      setIsOnline(state.isConnected);
    };

    checkNetworkStatus();

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      // Sincronizar dados do Firestore com SQLite
      const syncData = async () => {
        // Sincronizar movimentações
        const movimentacoesSnapshot = await getDocs(collection(db, 'movimentacoes'));
        clearTable();
        movimentacoesSnapshot.forEach(doc => {
          const { tipo, valor, data } = doc.data();
          addMovimentacao(tipo, valor, data);
        });

        // Sincronizar categorias
        const categoriasSnapshot = await getDocs(collection(db, 'categorias'));
        clearTableCategory();
        categoriasSnapshot.forEach(doc => {
          const { nome } = doc.data();
          addCategoria(nome);
        });
      };

      syncData();
    } else {
      // Carregar dados offline
      getMovimentacoes(movimentacoesBuscadas => {
        console.log('Dados offline carregados:', movimentacoesBuscadas); //esse aq n funcinou
      });

      getCategorias(categorias => {
        console.log('Categorias offline carregadas:', categorias); // esse aqui funcinou
      });
    }
  }, [isOnline]);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <PaperProvider>
        <Routes isOnline={isOnline} />
      </PaperProvider>
    </ApplicationProvider>
  );
}
