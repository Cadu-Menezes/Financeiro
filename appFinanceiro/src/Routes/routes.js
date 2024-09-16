import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../Pages/Home';
import Entrada from '../Pages/Entrada';
import Saida from '../Pages/Saida';
import ListaCategorias from '../Pages/Categoria/ListaCategorias';
import FormularioCategoria from '../Pages/Categoria/FormularioCategoria';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Entrada" component={Entrada} />
        <Stack.Screen name="Saida" component={Saida} />
        <Stack.Screen name="ListaCategorias" component={ListaCategorias} />
        <Stack.Screen name="FormularioCategoria" component={FormularioCategoria} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
