import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

import styles from "./styles";

export default function AcessoInterno({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  return <>
    <View style={styles.fundo}>
      <View>
        <Text style={styles.saudacao}>Acesso Interno</Text>
      </View>

      <View>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="email"
        />

        <TextInput
          value={senha}
          onChangeText={setSenha}
          placeholder="senha"
        />
        

      </View>

      <View>
        <TouchableOpacity>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </View>

    </View>

  </>
}