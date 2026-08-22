import React, { useState, useEffect } from "react";

import Toast from 'react-native-toast-message'

import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";

import styles from "./styles";

import autenticacao from "../../Services/autenticacao";
import useUsuarios from "../../Services/useUsuarios";

import user from '../../../assets/user.png'

import BotaoMenu from "../../Reutilizaveis/BotaoMenu";
import Menu from "../../Reutilizaveis/Menu";

import navegacaoMenu from "../../Services/navegacaoMenu";

import useAprovacao from "../../Services/useAprovacao";

export default function Aprovacoes({ navigation }) {
  const consultaAprovacoes = useAprovacao((state) => state.consultaAprovacoes);
  const aprovacoes = useAprovacao((state) => state.aprovacoes);

  const mostraMenu = navegacaoMenu((state) => state.mostraMenu);
  const iniciaMenu = navegacaoMenu((state) => state.iniciaMenu);

  const [obersvacao, setObservacao] = useState('')

  useEffect(() => {
    if (iniciaMenu) {
      iniciaMenu();
    }
  }, [iniciaMenu])


  useEffect(() => {
    if (consultaAprovacoes) {
      consultaAprovacoes();
    }
  }, [consultaAprovacoes])




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
        <Text style={styles.titulo}>Aprovações Pendentes</Text>
        <Text style={styles.chamada}>Analise impressões pedagogicas antes da producao.</Text>
      </View>

    </View>


    <FlatList
      data={aprovacoes}
      keyExtractor={(item) => String(item.id)}
      ListFooterComponent={() => <>
      <View style={{height: 500, width: 100}}>

      </View>
      </>}
      renderItem={({ item }) => <>
        <View style={styles.item}>
          <View>
            <Text style={styles.legenda}>{item.nome_impressao}</Text>
            <View style={styles.containerInformacoes}>
              <Text style={styles.informacoes}>{item.categoria}</Text>
              <Text style={styles.informacoes}>{item.cor_filamento}</Text>
            </View>

            <View style={styles.containerDetalhes}>
              <View style={styles.detalhes}>
                <Text style={styles.informacoes}>Solicitante</Text>
                <Text style={styles.legenda}>{item.usuario_nome}</Text>
              </View>


              <View style={styles.detalhes}>
                <Text style={styles.informacoes}>Material</Text>
                <Text style={styles.legenda}>{item.material}</Text>
              </View>

            </View>


             <View style={styles.containerDetalhes}>
              <View style={styles.detalhes}>
                <Text style={styles.informacoes}>Gramas</Text>
                <Text style={styles.legenda}>{item.gramas}</Text>
              </View>


              <View style={styles.detalhes}>
                <Text style={styles.informacoes}>Valor Final</Text>
                <Text style={styles.legenda}>{item.valor_final}</Text>
              </View>

            </View>


            <View style={styles.containerDetalhes}>
              <View style={styles.detalhes}>
                <Text style={styles.informacoes}>Tempo</Text>
                <Text style={styles.legenda}>{item.tempo_impressao}</Text>
              </View>
              


              <View style={styles.detalhes}>
                <Text style={styles.informacoes}>Criada em </Text>
                <Text style={styles.legenda}>{ajustaData(item.impressao_created_at)}</Text>
              </View>

            </View>



          </View>

          <View>
            <TextInput
            value={obersvacao}
            onChangeText={setObservacao}
            placeholder="Observação Opcional"
            style={styles.inputObservacao}
            />

            <View style={styles.botoes}>
              <TouchableOpacity style={[styles.botao, styles.botaoAprovar]}>
                <Text style={[styles.textoBotao, styles.textoBotaoAprovar]}>APROVAR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.botao, styles.botaoNegar]}>
                <Text style={[styles.textoBotao, styles.textoBotaoNegar]}>REJEITAR</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>
      </>}
    />


  </>
}