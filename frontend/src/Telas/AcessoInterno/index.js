import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";

import styles from "./styles";

import autenticacao from "../../Services/autenticacao";

export default function AcessoInterno({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const login = autenticacao((state) => state.login)
    const autenticado = autenticacao((state) => state.autenticado)

    const handleLogin = (email, senha) => {
        if (!login) {
            console.log("Login não foi carregado")
            return;

        }
        if (!email, !senha) {
            console.log("Parâmetros inválidos")
            return;

        }
        login(email, senha)
    }


    useEffect(() => {
        if (autenticado === null) {
            return;
        }
        if (autenticado === false) {
            return;
        }
        if (autenticado === true) {
            navigation.navigate('BackDoor')
        }
    }, [autenticacao])


    return <>
        <View style={styles.fundo}>
            <View>
                <Text style={styles.saudacao}>Acesso Interno</Text>
            </View>

            <View
                style={styles.inputs}
            >
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="email"
                    style={styles.input}
                />

                <TextInput
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="senha"
                    style={styles.input}
                />


            </View>

            <View>
                <TouchableOpacity
                    onPress={() => {
                        handleLogin(email, senha)
                    }}

                    style={styles.botao}
                >
                    <Text style={styles.textoBotao}>Entrar</Text>
                </TouchableOpacity>
            </View>

        </View>

    </>
}