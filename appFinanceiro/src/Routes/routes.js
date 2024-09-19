import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../Pages/Home';
import Entrada from '../Pages/Entrada';
import Saida from '../Pages/Saida';
import ListaCategorias from '../Pages/Categoria/ListaCategorias';
import FormularioCategoria from '../Pages/Categoria/FormularioCategoria';
import Login from '../Pages/Login'; 
import ListaEntradas from '../Pages/ListaEntradas';
import ListaSaidas from '../Pages/ListaSaidas';
import Configuracao from '../Pages/Configuracoes';
import EditarUsuario from '../Pages/EditarUsuario';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegação com abas -- Chatzin
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Entradas') {
            iconName = 'arrow-up-bold';
          } else if (route.name === 'Saídas') {
            iconName = 'arrow-down-bold';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false, // Oculta o cabeçalho para todas as abas
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Entradas" component={ListaEntradas} />
      <Tab.Screen name="Saídas" component={ListaSaidas} />
    </Tab.Navigator>
  );
}

// Navegação principal
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="ListaCategorias" component={ListaCategorias} />
        <Stack.Screen name="FormularioCategoria" component={FormularioCategoria} />
        <Stack.Screen name="Entrada" component={Entrada} />
        <Stack.Screen name="Saida" component={Saida} />
        <Stack.Screen name="Configuracao" component={Configuracao} />
        <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
