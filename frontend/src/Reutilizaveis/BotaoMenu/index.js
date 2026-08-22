import React from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import menu from '../../../assets/menu.png'


import navegacaoMenu from "../../Services/navegacaoMenu";

export default function BotaoMenu({navigation}){
  const setMostra = navegacaoMenu((state) => state.setMostra)
  return <>
    <TouchableOpacity
    style={styles.fundo}
    onPress={() => {
      setMostra();
    }}
    >
      <Image
      source={menu}
      style={styles.imagem}
      />
    </TouchableOpacity>
  </>
}