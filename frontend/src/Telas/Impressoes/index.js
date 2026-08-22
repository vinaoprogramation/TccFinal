import React, { useState, useEffect } from "react";

import Toast from 'react-native-toast-message'

import { Text, View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";

import styles from "./styles";

import autenticacao from "../../Services/autenticacao";
import useUsuarios from "../../Services/useUsuarios";

import user from '../../../assets/user.png'

import BotaoMenu from "../../Reutilizaveis/BotaoMenu";
import Menu from "../../Reutilizaveis/Menu";

import navegacaoMenu from "../../Services/navegacaoMenu";


export default function Impressoes({ navigation }) {
  const mostraMenu = navegacaoMenu((state) => state.mostraMenu);
  const iniciaMenu = navegacaoMenu((state) => state.iniciaMenu);

  useEffect(() => {
    if (iniciaMenu) {
      iniciaMenu();
    }
  }, [iniciaMenu])


  return <>
    <BotaoMenu />
    <Menu
      navigation={navigation}
    />
    <Text>Imptessoes</Text>
  </>
}