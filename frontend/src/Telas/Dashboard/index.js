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
import useDashboard from "../../Services/useDashboard";

export default function Dashboard({ navigation }) {
  const consultaDashboard = useDashboard((state) => state.consultaDashboard);
  const atualizado = useDashboard((state) => state.atualizado);
  const indicadores = useDashboard((state) => state.indicadores);
  const impressoesPorCategoria = useDashboard((state) => state.impressoesPorCategoria);
  const consumoPorMaterial = useDashboard((state) => state.consumoPorMaterial);
  const horasPorMaquina = useDashboard((state) => state.horasPorMaquina);
  const arrecadacaoPorMes = useDashboard((state) => state.arrecadacaoPorMes);

  const mostraMenu = navegacaoMenu((state) => state.mostraMenu);
  const iniciaMenu = navegacaoMenu((state) => state.iniciaMenu);

  useEffect(() => {
    if (consultaDashboard) {
      consultaDashboard();
    }
  }, [consultaDashboard])

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
    <ScrollView style={styles.fundo}>
      <View style={styles.cabecalho}>
        <View style={styles.textos}>
          <Text style={styles.titulo}>Dashboard Administrativo</Text>
          <Text style={styles.chamada}>Indicadores operacionais, financeiros e de produção atualizados automaticamente.</Text>
        </View>

      </View>
      <View style={styles.conteudo}>
        <View style={styles.item}>
          <Text style={styles.legenda}>Quantidade de impressões</Text>
          <Text style={styles.quantidade}>{indicadores?.quantidade_impressoes}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.legenda}>Quantidade STL</Text>
          <Text style={styles.quantidade}>{indicadores?.quantidade_stl}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.legenda}>Quantidade Fotos</Text>
          <Text style={styles.quantidade}>{indicadores?.quantidade_fotos}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.legenda}>Projetos Pedagógicos</Text>
          <Text style={styles.quantidade}>{indicadores?.projetos_pedagogicos}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.legenda}>Projetos Vendidos</Text>
          <Text style={styles.quantidade}>{indicadores?.projetos_vendidos}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.legenda}>PLA Consumido</Text>
          <Text style={styles.quantidade}>{indicadores?.pla_consumido}g</Text>
        </View>


        <View style={styles.item}>
          <Text style={styles.legenda}>TPU Consumido</Text>
          <Text style={styles.quantidade}>{indicadores?.tpu_consumido}g</Text>
        </View>


         <View style={styles.item}>
          <Text style={styles.legenda}>Arrecadação</Text>
          <Text style={styles.quantidade}>R$ {indicadores?.arrecadacao}</Text>
        </View>



        <View style={styles.item}>
          <Text style={styles.legenda}>Horas Totais</Text>
          <Text style={styles.quantidade}>{indicadores?.horas_totais}h</Text>
        </View>


        <View style={styles.item}>
          <Text style={styles.legenda}>Gráficos</Text>
          <Text style={styles.quantidade}>Em breve ...</Text>
        </View>


        
      </View>


    </ScrollView>
  </>
}