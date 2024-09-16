import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/Pages/Home';
import Entrada from './src/Pages/Entrada';
import Saida from './src/Pages/Saida';
import ListaCategorias from './src/Pages/Categoria/ListaCategorias';
import FormularioCategoria from './src/Pages/Categoria/FormularioCategoria'; 
import Login from './src/Pages/Login'; 

import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

const Stack = createStackNavigator();

export default function App() {
  const [login, setLogin] = useState(false); 

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!login ? (
            <Stack.Screen name="Login">
              {props => <Login {...props} setLogin={setLogin} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Entrada" component={Entrada} />
              <Stack.Screen name="Saida" component={Saida} />
              <Stack.Screen name="Categoria" component={ListaCategorias} />
              <Stack.Screen name="FormularioCategoria" component={FormularioCategoria} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
