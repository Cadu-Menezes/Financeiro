import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/Pages/Home'
import Entrada from './src/Pages/Entrada'
import Saida from './src/Pages/Saida'

const Stack = createStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
        
        <Stack.Navigator screenOptions={{headerShown: false,}}>

            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Entrada' component={Entrada}/>            
            <Stack.Screen name='Saida' component={Saida}/>            
                      

        </Stack.Navigator>

      </NavigationContainer>
      
  );
}

