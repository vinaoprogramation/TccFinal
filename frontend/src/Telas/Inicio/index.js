import React from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

export default function Inicio({navigation}){
  return <>
  <View style={styles.fundo}>
    <View>
      <Text style={styles.saudacao}>Olá, bem vindo ao Reni 3D APP</Text>
    </View>

    <View style={styles.botoes}>
      <TouchableOpacity
      onPress={() => {
        navigation.navigate('AcessoInterno')
      }}
      style={styles.botao}
      >
        <Text style={styles.textoBotao}>Ver catálogo</Text>
      </TouchableOpacity>


      <TouchableOpacity
      style={styles.botao}
      >
        <Text style={styles.textoBotao}>Acesso interno</Text>
      </TouchableOpacity>

    </View>
  </View>
  </>
}