import React, { useState, useEffect } from "react";

import Toast from 'react-native-toast-message'

import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";

import styles from "./styles";
import BotaoMenu from "../../Reutilizaveis/BotaoMenu";
import Menu from "../../Reutilizaveis/Menu";

import navegacaoMenu from "../../Services/navegacaoMenu";

import useFinanceiro from "../../Services/useFinanceiro";

export default function Financeiro({ navigation }) {
  const mostraMenu = navegacaoMenu((state) => state.mostraMenu);
  const iniciaMenu = navegacaoMenu((state) => state.iniciaMenu);

  const pendentes = useFinanceiro((state) => state.pendentes);
  const consultaPendentes = useFinanceiro((state) => state.consultaPendentes);


  useEffect(() => {
    if (iniciaMenu) {
      iniciaMenu();
    }
  }, [iniciaMenu])


  useEffect(() => {
    if (consultaPendentes) {
      consultaPendentes();
    }
  }, [consultaPendentes])


  return <>
    <BotaoMenu />
    <Menu
      navigation={navigation}
    />
    <View style={styles.cabecalho}>
     <View style={styles.textos}>
       <Text style={styles.titulo}>Financeiro</Text>
       <Text style={styles.chamada}>Recebimentos, totais e visao financeira das impressoes.</Text>
     </View>
   </View>

   <FlatList
   style={styles.flatlist}
     data={pendentes}
     keyExtractor={(item) => String(item.impressao_id)}
    ListHeaderComponent={() => <>
      
      <View style={styles.cabecalhoFlatlist}>
        <Text style={styles.tituloFlatlist}>Contas Pendentes</Text>
        <Text style={styles.descricaoFlatlist}>Impressões concluídas ainda sem recebimento. Mais de uma semana de atraso aparece em vermelho.</Text>
      </View>

      <View style={styles.topoTabela}>
        <Text style={styles.itemTabela}>Impressão</Text>
        <Text style={styles.itemTabela}>Comprador</Text>
        <Text style={styles.itemTabela}>Vencimento</Text>
        <Text style={styles.itemTabela}>Valor</Text>
        <Text style={styles.itemTabela}>Ações</Text>
      </View>
      
    </>}

     renderItem={({ item }) => <>
      <View style={styles.item}>
          <Text>{item.nome_impressao}</Text>
      </View>
     </>}
   />

  </>
}