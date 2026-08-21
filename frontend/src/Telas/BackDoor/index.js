import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

import styles from "./styles";

import autenticacao from "../../Services/autenticacao";

export default function BackDoor({ navigation }) {

  const usuario = autenticacao((state) => state.usuario);

  return <>
    <View>

      <View style={styles.cabecalho}>
        
        <View style={styles.titulo}>
          <Text style={styles.saudacao}>Área Interna</Text>
        </View>

        <View style={styles.subTitulo}>
          <Text style={styles.nome}>{usuario?.nome}</Text>
          <Text style={styles.matricula}>{usuario?.matricula}</Text>
        </View>

        <Image
          source={{uri: usuario.fotoPerfil}}
          style={{width: 200, height: 200}}
        />

        <View>
          <Text style={styles.descricao}>Aqui você encontra dashboards, estoque, contas, etc</Text>
        </View>

      </View>
      
    </View>
  </>
}