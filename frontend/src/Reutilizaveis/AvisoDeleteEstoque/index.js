import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList, TextInputComponent } from "react-native";


import styles from "./styles";


import Toast from 'react-native-toast-message'

import useImpressoes from "../../Services/useImpressoes";
import useEstoque from "../../Services/useEstoque";

export default function AvisoDeleteEstoque({ navigation }) {
  const id = useEstoque((state) => state.id);
  const setaId = useEstoque((state) => state.setaId);
  const mostraDeletar = useEstoque((state) => state.mostraDeletar);
  const setMostraDeletar = useEstoque((state) => state.setMostraDeletar);
  const deletaEstoque = useEstoque((state) => state.deletaEstoque);
  const consultaEstoque = useEstoque((state) => state.consultaEstoque);

   const mostraPop = async (id) => {
     const mostra = await deletaEstoque(id);
     
     if (mostra) {
       Toast.show({
         type: "success",
         text1: "Estoque deletado com sucesso!",
         visibilityTime: 3000
       })

       consultaEstoque();
       setMostraDeletar();
       
     }
  
  
   }



  return <>
    {mostraDeletar ?
      <>
        <TouchableOpacity style={styles.fundo} activeOpacity={1}>
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <Text style={styles.chamada}>Deseja deletar estoque?</Text>
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
