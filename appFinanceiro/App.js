import React, { useState, useEffect } from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Provider as PaperProvider } from 'react-native-paper';
import { NetworkInfo } from 'expo-network';
import { createTable, getMovimentacoes, addMovimentacao, clearTable } from './src/Services/database'; // Ajuste o caminho conforme necessário
import Routes from './src/Routes/routes';

export default function App() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Cria a tabela no SQLite ao iniciar o app
    createTable();

    // Verifica o status da conexão
    const checkNetworkStatus = async () => {
      const networkState = await NetworkInfo.getNetworkStateAsync();
      setIsOnline(networkState.isConnected);
    };

    checkNetworkStatus();

    // Assinatura para eventos de conexão
    const unsubscribe = NetworkInfo.addNetworkStateListener((state) => {
      setIsOnline(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      // Quando offline, sincroniza dados do SQLite
      getMovimentacoes((movimentacoesBuscadas) => {
        // Use os dados conforme necessário
        console.log('Dados offline carregados:', movimentacoesBuscadas);
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
