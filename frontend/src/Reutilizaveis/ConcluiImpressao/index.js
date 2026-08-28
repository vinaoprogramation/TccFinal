import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList, TextInputComponent } from "react-native";


import styles from "./styles";


import Toast from 'react-native-toast-message'

import useImpressoes from "../../Services/useImpressoes";
export default function ConcluiImpressao({ navigation }) {
    const mostraConcluir = useImpressoes((state) => state.mostraConcluir);
    const setMostraConcluir = useImpressoes((state) => state.setMostraConcluir);
    const alteraStatus = useImpressoes((state) => state.alteraStatus);
    const id = useImpressoes((state) => state.id);
    const setaId= useImpressoes((state) => state.setaId);

    useEffect(() => {
        console.log("Id: "+id)
    }, [id])


    const mostraPop = async (id) => {
        const mostra = await alteraStatus(id);

        if (mostra) {
            Toast.show({
                type: "success",
                text1: "Impressão concluída com sucesso!",
                visibilityTime: 3000
            })


            setMostraConcluir();
            setaId("");

        }


    }

    return <>
        {
            mostraConcluir ?
                <>
                      <TouchableOpacity style={styles.fundo} activeOpacity={1}>
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <Text style={styles.chamada}>Deseja Concluir impressão?</Text>
            <View style={styles.botoes}>
              <TouchableOpacity style={[styles.botao, { backgroundColor: '#ffffff' }]}
                onPress={() => {
                  setMostraConcluir();
                }}
              >
                <Text style={[styles.textoBotao, { color: '#4dbeff' }]}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.botao, { backgroundColor: 'rgb(71, 134, 13)' }]}
              onPress={() => {
                mostraPop(id);
                
              }}
              >
                <Text style={[styles.textoBotao, { color: '#ffffff' }]}>Concluir</Text>
              </TouchableOpacity>
            </View>

          </TouchableOpacity>
        </TouchableOpacity>
                </>
                :
                null
        }

    </>
}



