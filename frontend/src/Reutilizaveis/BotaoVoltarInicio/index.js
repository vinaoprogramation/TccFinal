import React from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import logout from '../../../assets/logout.png'

export default function BotaoVoltarInicio({navigation}){
  return <>
  <TouchableOpacity style={styles.fundo}
  onPress={() => {
    navigation.goBack()
  }}
  >
    <Image
    source={logout}
    style={styles.imagem}
    />
  </TouchableOpacity>
  </>
}