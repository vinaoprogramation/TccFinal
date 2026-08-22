import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Inicio from '../Telas/Inicio';
import AcessoInterno from '../Telas/AcessoInterno';
import BackDoor from '../Telas/BackDoor';
import HomeScreen from '../Telas/HomeScreen';
import DetailScreen from '../Telas/DetailScreen';
import Dashboard from '../Telas/Dashboard';
import Impressoes from '../Telas/Impressoes';
import Financeiro from '../Telas/Financeiro';
import Aprovacoes from '../Telas/Aprovacoes';


const Tab = createNativeStackNavigator();


export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>


        <Tab.Screen name="Inicio" options={{ headerShown: false }}
          component={Inicio}
        />

        <Tab.Screen name="HomeScreen" options={{ headerShown: false }}
          component={HomeScreen}
        />

        <Tab.Screen name="DetailScreen" options={{ headerShown: false }}
          component={DetailScreen}
        />


        <Tab.Screen name="AcessoInterno" options={{ headerShown: false }}
          component={AcessoInterno}
        />


        <Tab.Screen name="BackDoor" options={{ headerShown: false }}
          component={BackDoor}
        />


        <Tab.Screen name="Dashboard" options={{ headerShown: false }}
          component={Dashboard}
        />


        <Tab.Screen name="Impressoes" options={{ headerShown: false }}
          component={Impressoes}
        />

        <Tab.Screen name="Financeiro" options={{ headerShown: false }}
          component={Financeiro}
        />


        <Tab.Screen name="Aprovacoes" options={{ headerShown: false }}
          component={Aprovacoes}
        />



      </Tab.Navigator>
    </NavigationContainer>
  );
}
