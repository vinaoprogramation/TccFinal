import React, { useEffect, useState } from "react";

import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

import styles from "./styles";

import back from '../../../assets/back.png'
import usuarios from '../../../assets/usuarios.png'
import dashboard from '../../../assets/dashboard.png'
import money from '../../../assets/money.png'
import printer from '../../../assets/printer.png'
import checklist from '../../../assets/checklist.png'
import signout from '../../../assets/sign-out.png'
import estoque from '../../../assets/estoque.png'

import navegacaoMenu from "../../Services/navegacaoMenu";

export default function Menu({ navigation }) {
  const mostraMenu = navegacaoMenu((state) => state.mostraMenu);
  const setMostra = navegacaoMenu((state) => state.setMostra);

  return <>
    {mostraMenu ?
      <>

        <TouchableOpacity style={styles.container}
          activeOpacity={1}
        >
          <TouchableOpacity style={styles.botaoVoltar}
          activeOpacity={1}
            onPress={() => {
              setMostra();
            }}
          >
          </TouchableOpacity>
          <ScrollView style={styles.menu}>
            <View style={styles.cabecalho}>
              <Text style={styles.textoCabecalho}>Reni 3D App</Text>
            </View>

            <View style={styles.itens}>
              <TouchableOpacity style={styles.item}
              onPress={() => {
                navigation.replace('BackDoor')
                setMostra();
              }}
              >
                <Image
                  source={usuarios}
                  style={styles.imagemItem}
                />
                <Text style={styles.textoItem}>Meu Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.item}
              onPress={() => {
                navigation.replace('Dashboard')
              }}
              >
                <Image
                  source={dashboard}
                  style={styles.imagemItem}
                />
                <Text style={styles.textoItem}>Dashboard</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.item}
              onPress={() => {
                navigation.replace('Financeiro')
              }}
              >
                <Image
                  source={money}
                  style={styles.imagemItem}
                />

                <Text style={styles.textoItem}>Finanças</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.item}
              onPress={() => {
                navigation.replace('Impressoes')
              }}
              >
                <Image
                  source={printer}
                  style={styles.imagemItem}
                />
                <Text style={styles.textoItem}>Impressões 3D</Text>
              </TouchableOpacity>


              <TouchableOpacity style={styles.item}
              onPress={() => {
                navigation.replace('Aprovacoes')
              }}
              >
                <Image
                  source={checklist}
                  style={styles.imagemItem}
                />
                <Text style={styles.textoItem}>Aprovações</Text>
              </TouchableOpacity>



              <TouchableOpacity style={styles.item}
              onPress={() => {
                navigation.replace('Estoque')
              }}
              >
                <Image
                  source={estoque}
                  style={styles.imagemItem}
                />
                <Text style={styles.textoItem}>Estoque</Text>
              </TouchableOpacity>




              <TouchableOpacity style={styles.item}
              onPress={() => {
                navigation.replace('Inicio')
              }}
              >
                <Image
                  source={signout}
                  style={styles.imagemItem}
                />
                <Text style={styles.textoItem}>Sair</Text>
              </TouchableOpacity>



              


            </View>
          </ScrollView>
        </TouchableOpacity>

      </>

      :

      null
    }

  </>
}