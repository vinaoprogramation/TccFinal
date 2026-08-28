import React, { useEffect } from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import sheilong from '../../../assets/sheilong.png'
import coruja from '../../../assets/coruja.png'

import usePublicConfig from "../../Services/usePublicConfig";

export default function Inicio({ navigation }) {
  const configuracoes = usePublicConfig((state) => state.configuracoes);
  const consultaConfiguracoes = usePublicConfig((state) => state.consultaConfiguracoes);

  useEffect(() => {
    if (consultaConfiguracoes) {
      consultaConfiguracoes();
    }
  }, [consultaConfiguracoes])

  return <>
    <View style={styles.fundo}>

      <Image
      source={coruja}
      style={styles.sheilong}
      />

      <View>
        {configuracoes ?
          <>
            <Image
              source={{ uri: configuracoes.logo_url }}
              style={styles.logo}
              resizeMode="cover"
            />
          </>
          :
          null
        }

        <Text style={styles.saudacao}>Olá, bem vindo ao Reni 3D APP</Text>

      </View>

  



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