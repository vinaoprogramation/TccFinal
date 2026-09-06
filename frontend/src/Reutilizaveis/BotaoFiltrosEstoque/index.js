import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import search from '../../../assets/search.png'

import useEstoque from "../../Services/useEstoque";
export default function BotaoFiltrosEstoque({ navigation }) {
    const setMostraFiltros = useEstoque((state) => state.setMostraFiltros)

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