import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../Pages/Home'
import Entrada from '../Pages/Entrada'
import Saida from '../Pages/Saida'
import Categoria from '../Pages/Categoria'

const Stack = createStackNavigator();

export default function Routes() {
  return (
   
   <NavigationContainer>
        
        {/* //Agrupar as rotas */}
        <Stack.Navigator initialRouteName='Home'>

            {/* Carregar as telas */}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Entrada" component={Entrada} />
            <Stack.Screen name="Saida" component={Saida} />
            <Stack.Screen name="Categoria" component={Categoria} />
        
        </Stack.Navigator>
    
    </NavigationContainer>

  );
}