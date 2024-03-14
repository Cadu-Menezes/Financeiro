import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/Pages/Home'
import Entrada from './src/Pages/Entrada'
import Saida from './src/Pages/Saida'
import Categoria from './src/Pages/Categoria'

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';


const Stack = createStackNavigator();


export default function App() {
  return (

    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        
        <Stack.Navigator screenOptions={{headerShown: false,}}>

            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Entrada' component={Entrada}/>            
            <Stack.Screen name='Saida' component={Saida}/>       
            <Stack.Screen name='Categoria' component={Categoria}/>          
                      

        </Stack.Navigator>

      </NavigationContainer>
    </ApplicationProvider>
  );
}

