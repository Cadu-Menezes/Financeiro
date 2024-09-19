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
    const syncData = async () => {
      if (isOnline) {
        // Sincronizar dados do Firestore com SQLite
        try {
          // Sincronizar movimentações
          const movimentacoesSnapshot = await getDocs(collection(db, 'movimentacoes'));
          clearTable();
          movimentacoesSnapshot.forEach(doc => {
            const { tipo, valor, data, timestamp } = doc.data();
            addMovimentacao(tipo, valor, data, timestamp);
          });

          // Sincronizar categorias
          const categoriasSnapshot = await getDocs(collection(db, 'categorias'));
          clearTableCategory();
          categoriasSnapshot.forEach(doc => {
            const { nome } = doc.data();
            addCategoria(nome);
          });
        } catch (error) {
          console.error('Erro ao sincronizar dados:', error);
        }
      } else {
        // Carregar dados offline
        try {
          const movimentacoesBuscadas = await getMovimentacoes();
          console.log('Movimentacoes offline carregados:', movimentacoesBuscadas);
        } catch (error) {
          console.error('Erro ao carregar dados offline:', error);
        }

        getCategorias(categorias => {
          console.log('Categorias offline carregadas:', categorias);
        });
      }
    };

    syncData();
  }, [isOnline]);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <PaperProvider>
        <Routes isOnline={isOnline} />
      </PaperProvider>
    </ApplicationProvider>
  );
}
