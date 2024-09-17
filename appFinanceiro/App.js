import React from 'react';
import Routes from './src/Routes/routes'; 
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </ApplicationProvider>
  );
}
