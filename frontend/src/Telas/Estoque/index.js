import React, { useState, useEffect } from "react";

import Toast from 'react-native-toast-message'

import { Text, View, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";

import styles from "./styles";

import BotaoMenu from "../../Reutilizaveis/BotaoMenu";
import Menu from "../../Reutilizaveis/Menu";

import navegacaoMenu from "../../Services/navegacaoMenu";

import useEstoque from "../../Services/useEstoque";

export default function Estoque({ navigation }) {

    const consultaEstoque = useEstoque((state) => state.consultaEstoque);
    const estoque = useEstoque((state) => state.estoque);

    const mostraMenu = navegacaoMenu((state) => state.mostraMenu);
    const iniciaMenu = navegacaoMenu((state) => state.iniciaMenu);

    useEffect(() => {
        if (iniciaMenu) {
            iniciaMenu();
        }
    }, [iniciaMenu])

    useEffect(() => {
        consultaEstoque()
    }, [consultaEstoque])


    return <>
        <BotaoMenu />
        <Menu
            navigation={navigation}
        />
        <ScrollView style={styles.fundo}>
            <View style={styles.cabecalho}>
                <View style={styles.textos}>
                    <Text style={styles.titulo}>Estoque de Filamentos</Text>
                    <Text style={styles.chamada}>Controle de entrada, saida, saldo e alertas por material e cor.</Text>
                </View>

            </View>


            <View style={styles.dashboard}>
                <View style={styles.itemDashboard}>
                    <Text style={styles.legenda}>Itens cadastrados</Text>
                    <Text style={styles.quantidade}>{estoque.length}</Text>
                </View>
            </View>

            <View style={styles.dashboard}>
                <View style={styles.itemDashboard}>
                    <Text style={styles.legenda}>Estoque Baixo</Text>
                    <Text style={styles.quantidade}>1</Text>
                </View>
            </View>

            <View style={styles.dashboard}>
                <View style={styles.itemDashboard}>
                    <Text style={styles.legenda}>Estoque crítico</Text>
                    <Text style={styles.quantidade}>4</Text>
                </View>
            </View>
            



        </ScrollView>
    </>
}