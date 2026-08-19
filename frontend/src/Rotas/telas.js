import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Inicio from '../Telas/Inicio';
import AcessoInterno from '../Telas/AcessoInterno';
import BackDoor from '../Telas/BackDoor';


const Tab = createNativeStackNavigator();


export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>


        <Tab.Screen name="Inicio" options={{ headerShown: false }}
          component={Inicio}
        />

        <Tab.Screen name="AcessoInterno" options={{ headerShown: false }}
          component={AcessoInterno}
        />


        <Tab.Screen name="BackDoor" options={{ headerShown: false }}
          component={BackDoor}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
