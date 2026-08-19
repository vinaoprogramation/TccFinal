import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

import styles from "./styles";

import autenticacao from "../../Services/autenticacao";

export default function BackDoor({ navigation }) {
  const user = autenticacao((state) => state.user);

  return <>
    <View>
      <View>
        <Text>Área Interna</Text>
        <Text>Aqui você encontra dashboards, contas, etc</Text>
      </View>
    </View>
  </>
}