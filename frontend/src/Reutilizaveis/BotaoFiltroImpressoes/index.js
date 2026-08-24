import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import search from '../../../assets/search.png'

import passarTela from "../../Services/passarTela";

export default function BotaoFiltro({ navigation }) {
    const setFiltros = passarTela((state) => state.setFiltros)

    return <>
        <TouchableOpacity
            style={styles.fundo}
            onPress={() => {
                setFiltros()
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