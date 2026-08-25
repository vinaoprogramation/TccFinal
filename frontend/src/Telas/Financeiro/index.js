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


  const ajustaData = (dataInteira) => {
    const timestamp = dataInteira;
    const dataFormatada = new Date(timestamp);
    return dataFormatada.toLocaleString('pt-BR')
  }



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




    <ScrollView>

      <FlatList
        style={styles.flatlist}
        data={pendentes}
        keyExtractor={(item) => String(item.impressao_id)}
        ListHeaderComponent={() => <>

          <View style={styles.cabecalhoFlatlist}>
            <Text style={styles.tituloFlatlist}>Contas Pendentes</Text>
            <Text style={styles.descricaoFlatlist}>Impressões concluídas ainda sem recebimento. Mais de uma semana de atraso aparece em vermelho.</Text>
          </View>
        </>}

        ListFooterComponent={() => <>
          <View style={{ marginBottom: 20 }}></View>
        </>}

        renderItem={({ item }) => <>
          <View style={styles.item}>
            <View style={styles.coluna}>
              <Text style={styles.label}>Impressão: </Text>
              <Text style={styles.nomePendente}>{item.nome_impressao}</Text>
              <View style={styles.materiais}>
                <Text style={styles.sobre}>{item.categoria}</Text>
                <Text style={styles.sobre}>{item.material}</Text>
              </View>

            </View>

            <View style={styles.coluna}>
              <Text style={styles.label}>Comprador:</Text>
              <Text style={styles.nomePendente}>{item.impressao_comprador}</Text>
            </View>

            <View style={styles.coluna}>
              <Text style={styles.label}>Vencimento:</Text>
              <Text style={styles.nomePendente}>{ajustaData(item.data_vencimento)}</Text>
            </View>

            <View style={styles.coluna}>
              <Text style={styles.label}>Valor:</Text>
              <Text style={styles.nomePendente}>{item.valor_final}</Text>
            </View>


            <View style={styles.coluna}>
              <Text style={styles.label}>Atraso:</Text>
              <Text style={styles.nomePendente}>{item.dias_atraso} dias</Text>
            </View>

            <View style={styles.coluna}>
              <View style={styles.containerBotao}>
                <TouchableOpacity style={styles.botaoReceber}>
                  <Text style={styles.textoBotaoReceber}>RECEBER</Text>
                </TouchableOpacity>
              </View>

            </View>




          </View>
        </>}
      />

      <View style={styles.separacao}>
        <View style={styles.textos}>
          <Text style={styles.titulo}>Financeiro</Text>
          <Text style={styles.chamada}>Recebimentos das impressoes.</Text>
        </View>
      </View>

      <FlatList
        style={styles.flatlistRecebimentos}
        data={pendentes}
        keyExtractor={(item) => String(item.impressao_id)}
        ListFooterComponent={() => <>
          <View style={{ marginBottom: 20 }}></View>
        </>}

        renderItem={({ item }) => <>
          <View style={styles.itemRecebimentos}>
            <View style={styles.coluna}>
              <Text style={styles.label}>Impressão: </Text>
              <Text style={styles.nomePendente}>{item.nome_impressao}</Text>
              <View style={styles.materiais}>
                <Text style={styles.sobre}>{item.categoria}</Text>
                <Text style={styles.sobre}>{item.material}</Text>
              </View>

            </View>

            <View style={styles.coluna}>
              <Text style={styles.label}>Comprador:</Text>
              <Text style={styles.nomePendente}>{item.impressao_comprador}</Text>
            </View>

            <View style={styles.coluna}>
              <Text style={styles.label}>Vencimento:</Text>
              <Text style={styles.nomePendente}>{ajustaData(item.data_vencimento)}</Text>
            </View>

            <View style={styles.coluna}>
              <Text style={styles.label}>Valor:</Text>
              <Text style={styles.nomePendente}>{item.valor_final}</Text>
            </View>


            <View style={styles.coluna}>
              <Text style={styles.label}>Atraso:</Text>
              <Text style={styles.nomePendente}>{item.dias_atraso} dias</Text>
            </View>





          </View>
        </>}
      />
      
    </ScrollView>
    




  </>
}

