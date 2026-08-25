import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList, TextInputComponent } from "react-native";


import styles from "./styles";


import Toast from 'react-native-toast-message'

import useImpressoes from "../../Services/useImpressoes";

export default function AvisoDelete({ navigation }) {
  const id = useImpressoes((state) => state.id);
  const setaId = useImpressoes((state) => state.setaId);
  const mostraDeletar = useImpressoes((state) => state.mostraDeletar);
  const setMostraDeletar = useImpressoes((state) => state.setMostraDeletar);
  const deletaImpressao = useImpressoes((state) => state.deletaImpressao);
  const consultaImpressoes = useImpressoes((state) => state.consultaImpressoes);

   const mostraPop = async (id) => {
     const mostra = await deletaImpressao(id);
     
     if (mostra) {
       Toast.show({
         type: "success",
         text1: "Impressão deletada com sucesso!",
         visibilityTime: 3000
       })

       consultaImpressoes();
       setMostraDeletar();
       
     }
  
  
   }



  return <>
    {mostraDeletar ?
      <>
        <TouchableOpacity style={styles.fundo} activeOpacity={1}>
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <Text style={styles.chamada}>Deseja deletar impressão?</Text>
            <View style={styles.botoes}>
              <TouchableOpacity style={[styles.botao, { backgroundColor: '#ffffff' }]}
                onPress={() => {
                  setMostraDeletar();
                }}
              >
                <Text style={[styles.textoBotao, { color: '#4dbeff' }]}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.botao, { backgroundColor: 'red' }]}
              onPress={() => {
                mostraPop(id);
                
              }}
              >
                <Text style={[styles.textoBotao, { color: '#ffffff' }]}>Deletar</Text>
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
