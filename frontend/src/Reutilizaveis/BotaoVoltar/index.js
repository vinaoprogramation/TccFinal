import React from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import home from '../../../assets/home-button.png'

export default function BotaoVoltar({navigation}){
  return <>
  <TouchableOpacity style={styles.fundo}
  onPress={() => {
    navigation.goBack()
  }}
  >
    <Image
    source={home}
    style={styles.imagem}
    />
  </TouchableOpacity>
  </>
}