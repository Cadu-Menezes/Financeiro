import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Pages/Home';
import Entrada from '../Pages/Entrada';
import Saida from '../Pages/Saida';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute' },
      }}
    >
      <Tab.Screen name="Home" component={Home} screenOptions={{ headerShown: false }}/>
      <Tab.Screen name="Entradas" component={Entrada} screenOptions={{ headerShown: false }}/>
      <Tab.Screen name="Saidas" component={Saida} screenOptions={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}
