import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../Pages/Home';
import Entrada from '../Pages/Entrada';
import Saida from '../Pages/Saida';
import ListaCategorias from '../Pages/Categoria/ListaCategorias';
import FormularioCategoria from '../Pages/Categoria/FormularioCategoria';
import Login from '../Pages/Login'; 

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}> 
        <Stack.Screen name="Login" component={Login} screenOptions={{ headerShown: false }}/> 
        <Stack.Screen name="Home" component={Home} screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="Entrada" component={Entrada} screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="Saida" component={Saida} screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="ListaCategorias" component={ListaCategorias} screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="FormularioCategoria" component={FormularioCategoria} screenOptions={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
