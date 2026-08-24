import React, { useState, useEffect } from "react";

import Toast from 'react-native-toast-message'

import { Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";

import styles from "./styles";

import autenticacao from "../../Services/autenticacao";
import useUsuarios from "../../Services/useUsuarios";

import user from '../../../assets/user.png'

import BotaoMenu from "../../Reutilizaveis/BotaoMenu";
import Menu from "../../Reutilizaveis/Menu";

import navegacaoMenu from "../../Services/navegacaoMenu";

export default function BackDoor({ navigation }) {

  const usuario = autenticacao((state) => state.usuario);
  const consultarUsuario = autenticacao((state) => state.consultarUsuario);
  const foto = autenticacao((state) => state.foto);

  const alteraUsuario = useUsuarios((state) => state.alteraUsuario);
  const mostraMenu = navegacaoMenu((state) => state.mostraMenu);
  const iniciaMenu = navegacaoMenu((state) => state.iniciaMenu);

  useEffect(() => {
    if (iniciaMenu) {
      iniciaMenu();
    }
  }, [iniciaMenu])

  const altera = async (nome, curso) => {
    if (!nome || !curso) {
      console.log("Faltam parâmetros");
      return;
    }
    if (!alteraUsuario) {
      console.log("Função não carregada");
      return;
    }

    const alterou = await alteraUsuario(nome, curso);

    if (!alterou) {
      console.log("Erro ao alterar usuário")
      return;
    }

    console.log("Usuário alterado com sucesso")
    return true;

  }

  const mostraPop = async (nome, curso) => {
    const mostra = await altera(nome, curso);
    console.log(mostra)
    if (mostra) {
      Toast.show({
        type: "success",
        text1: "Usuário alterado com sucesso!",
        visibilityTime: 3000
      })
    }
  }

  useEffect(() => {
    if (consultarUsuario) {
      consultarUsuario();
    }
  }, [consultarUsuario])


  const [nome, setNome] = useState(usuario?.nome)
  const [curso, setCurso] = useState(usuario?.curso)


  return <>

    {usuario && foto ?
      <>
        <BotaoMenu />
        <Menu
          navigation={navigation}
        />
        <View style={styles.fundo}>

          <View style={styles.cabecalho}>

            <View style={styles.titulo}>
              <Text style={styles.saudacao}>Minha Conta</Text>

              <Text style={styles.descricao}>Altere seu nome, curso e foto de perfil no catálogo principal</Text>
            </View>

            {
              foto ?
                <>
                  <Image
                    source={{ uri: foto }}
                    style={styles.fotoPerfil}
                  />
                </>
                :
                <>
                  <Image
                    source={user}
                    style={styles.fotoPerfil}
                  />
                </>

            }


            <View style={styles.subTitulo}>
              <View style={styles.containerInput}>
                <TextInput
                  value={nome}
                  onChangeText={setNome}
                  placeholder="Nome*"
                  style={styles.input}
                  editable={mostraMenu ? false : true}
                />
              </View>

              <View style={styles.containerInput}>
                <TextInput
                  value={curso}
                  onChangeText={setCurso}
                  placeholder="Curso*"
                  style={styles.input}
                  editable={mostraMenu ? false : true}
                />
              </View>


              <View style={styles.containerInput}>
                <Text style={[styles.input, styles.matricula]}>{usuario?.matricula}</Text>
              </View>


            </View>



            <View>
              <TouchableOpacity style={styles.botao}
                onPress={() => {
                  mostraPop(nome, curso)
                }}
              >
                <Text style={styles.textoBotao}>Salvar Perfil</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </>
      :
      <ActivityIndicator />
    }
    <>

    </>

  </>
}