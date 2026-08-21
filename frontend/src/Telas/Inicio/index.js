import React from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import sheilong from '../../../assets/sheilong.png'

export default function Inicio({navigation}){

  return <>
  <View style={styles.fundo}>
    <View>
      <Text style={styles.saudacao}>Olá, bem vindo ao Reni 3D APP</Text>
      
    </View>

    <Image
      source={sheilong}
      style={styles.sheilong}
      />

      

    <View style={styles.botoes}>
      <TouchableOpacity
      onPress={() => {
        navigation.navigate('HomeScreen')
      }}
     
      style={styles.botao}
      >
        <Text style={styles.textoBotao}>Ver catálogo</Text>
      </TouchableOpacity>


      <TouchableOpacity
       onPress={() => {
        navigation.navigate('AcessoInterno')
      }}
      
      style={styles.botao}
      >
        <Text style={styles.textoBotao}>Acesso interno</Text>
      </TouchableOpacity>

    </View>
  </View>
  </>
}