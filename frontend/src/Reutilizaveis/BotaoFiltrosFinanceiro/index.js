import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import search from '../../../assets/search.png'

import useFinanceiro from "../../Services/useFinanceiro";
export default function BotaoFiltrosFinanceiro({ navigation }) {
    const setMostraFiltros = useFinanceiro((state) => state.setMostraFiltros)

    return <>
        <TouchableOpacity
            style={styles.fundo}
            onPress={() => {
                setMostraFiltros()
            }}
            activeOpacity={0.8}
        >
            <Image
                source={search}
                style={styles.imagem}
            />
        </TouchableOpacity>
    </>
}