import React, {
  useState,
  useEffect
} from "react";


import Toast from 'react-native-toast-message';


import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";


import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";


import styles from "./styles";


import trashcan from '../../../assets/trashcan.png';


import ReportaFalha from "../../Reutilizaveis/ReportaFalha";

import BotaoMenu from "../../Reutilizaveis/BotaoMenu";

import Menu from "../../Reutilizaveis/Menu";

import AvisoDelete from "../../Reutilizaveis/AvisoDelete";

import Filtros from '../../Reutilizaveis/Filtros';

import BotaoFiltro from '../../Reutilizaveis/BotaoFiltro';

import navegacaoMenu from "../../Services/navegacaoMenu";

import ConcluiImpressao from "../../Reutilizaveis/ConcluiImpressao";

import useImpressoes from "../../Services/useImpressoes";

import BotaoFiltrosImpressoes from "../../Reutilizaveis/BotaoFiltroImpressoes";

import FiltrosImpressoes from "../../Reutilizaveis/FiltrosImpressoes";

import AdicionaImpressao from "../../Reutilizaveis/AdicionaImpressao";


export default function Impressoes({ navigation }) {


  const setMostraAdicionar =
    useImpressoes(
      (state) => state.setMostraAdicionar
    );


  const setMostraDeletar =
    useImpressoes(
      (state) => state.setMostraDeletar
    );


  const impressoes =
    useImpressoes(
      (state) => state.impressoes
    );


  const consultaImpressoes =
    useImpressoes(
      (state) => state.consultaImpressoes
    );


  const setaId =
    useImpressoes(
      (state) => state.setaId
    );


  const setMostraConcluir =
    useImpressoes(
      (state) => state.setMostraConcluir
    );


  const recarregando =
    useImpressoes(
      (state) => state.recarregando
    );


  const setRecarregando =
    useImpressoes(
      (state) => state.setRecarregando
    );


  const setMostraFalha =
    useImpressoes(
      (state) => state.setMostraFalha
    );


  const enviaStl =
    useImpressoes(
      (state) => state.enviaStl
    );


  const enviaFoto =
    useImpressoes(
      (state) => state.enviaFoto
    );


  const iniciaMenu =
    navegacaoMenu(
      (state) => state.iniciaMenu
    );


  const [
    enviandoArquivo,
    setEnviandoArquivo
  ] = useState(false);


  useEffect(() => {

    if (iniciaMenu) {
      iniciaMenu();
    }

  }, [iniciaMenu]);


  useEffect(() => {

    consultaImpressoes();
    setRecarregando();

  }, [consultaImpressoes]);


  const selecionaStl = async (item) => {

    try {

      const resultado =
        await DocumentPicker.getDocumentAsync({

          type: "application/octet-stream",

          copyToCacheDirectory: true,

          multiple: false

        });


      if (resultado.canceled) {
        return;
      }


      const arquivo =
        resultado.assets[0];


      const nomeArquivo =
        arquivo.name || "";


      if (
        !nomeArquivo
          .toLowerCase()
          .endsWith(".stl")
      ) {

        Toast.show({

          type: "error",

          text1: "Arquivo inválido",

          text2: "Selecione um arquivo STL.",

          visibilityTime: 3000

        });

        return;
      }


      setEnviandoArquivo(true);


      setaId(item.id);


      const enviado =
        await enviaStl(
          item.id,
          arquivo
        );


      if (enviado) {

        Toast.show({

          type: "success",

          text1: "STL enviado com sucesso!",

          visibilityTime: 3000

        });


        await consultaImpressoes();

      } else {

        Toast.show({

          type: "error",

          text1: "Erro ao enviar STL",

          visibilityTime: 3000

        });

      }

    } catch (error) {

      console.error(
        "Erro ao selecionar STL:",
        error
      );


      Toast.show({

        type: "error",

        text1: "Erro ao selecionar STL",

        visibilityTime: 3000

      });

    } finally {

      setEnviandoArquivo(false);

    }

  };


  const selecionaMidias = async (item) => {

    try {

      const permissao =
        await ImagePicker
          .requestMediaLibraryPermissionsAsync();


      if (!permissao.granted) {

        Toast.show({

          type: "error",

          text1: "Permissão negada",

          text2:
            "Permita o acesso à galeria.",

          visibilityTime: 3000

        });

        return;
      }


      const resultado =
        await ImagePicker
          .launchImageLibraryAsync({

            mediaTypes: [
              "images",
              "videos"
            ],

            allowsMultipleSelection: true,

            selectionLimit: 10,

            quality: 0.8

          });


      if (resultado.canceled) {
        return;
      }


      const arquivos =
        resultado.assets;


      if (
        !arquivos ||
        arquivos.length === 0
      ) {
        return;
      }


      setEnviandoArquivo(true);


      setaId(item.id);


      let sucesso = true;


      for (
        const arquivo of arquivos
      ) {

        const enviado =
          await enviaFoto(
            item.id,
            arquivo
          );


        if (!enviado) {

          sucesso = false;

          break;

        }

      }


      if (sucesso) {

        Toast.show({

          type: "success",

          text1:
            "Mídias enviadas com sucesso!",

          text2:
            `${arquivos.length} arquivo(s) enviado(s).`,

          visibilityTime: 3000

        });

      } else {

        Toast.show({

          type: "error",

          text1:
            "Erro ao enviar mídia",

          visibilityTime: 3000

        });

      }

    } catch (error) {

      console.error(
        "Erro ao selecionar mídias:",
        error
      );


      Toast.show({

        type: "error",

        text1:
          "Erro ao selecionar mídia",

        visibilityTime: 3000

      });

    } finally {

      setEnviandoArquivo(false);

    }

  };


  return <>

    <BotaoMenu />


    <Menu
      navigation={navigation}
    />


    <BotaoFiltro />

    <Filtros />

    <AvisoDelete />

    <AdicionaImpressao />

    <ConcluiImpressao />

    <ReportaFalha />

    <BotaoFiltrosImpressoes />

    <FiltrosImpressoes />


    <View style={styles.cabecalho}>

      <View style={styles.textos}>

        <Text style={styles.titulo}>
          Impressões 3D
        </Text>


        <Text style={styles.chamada}>
          Controle de solicitacoes, custos e status das impressoes.
        </Text>

      </View>

    </View>


    {
      recarregando ?

        <ActivityIndicator
          size="large"
          color="#00000"
          style={styles.loader}
        />

        :

        <FlatList

          data={impressoes}

          keyExtractor={(item) =>
            String(item.id)
          }


          ListHeaderComponent={() => <>

            <TouchableOpacity
              style={styles.botaoAdicionar}
              onPress={() => {
                setMostraAdicionar();
              }}
            >

              <Text
                style={styles.textoAdicionar}
              >
                NOVA IMPRESSÃO
              </Text>

            </TouchableOpacity>


            {
              impressoes.length == 0 ?

                <View
                  style={{
                    marginTop: 50,
                    marginBottom: 100
                  }}
                >

                  <Text
                    style={{
                      fontSize: 18,
                      marginLeft: 20,
                      fontWeight: 'bold'
                    }}
                  >
                    Não há resultados.
                  </Text>

                </View>

                :

                null
            }

          </>}


          ListFooterComponent={() => <>

            <View
              style={{
                height: 500,
                width: 100
              }}
            />

          </>}


          renderItem={({ item }) => <>

            <View style={styles.item}>

              <View style={styles.topo}>

                <View style={styles.cima}>

                  <Text
                    style={styles.nomeImpressao}
                  >
                    {item.nome_impressao}
                  </Text>


                  <Text
                    style={styles.statusImpressao}
                  >
                    {item.status}
                  </Text>

                </View>


                <Text
                  style={styles.criadorImpressao}
                >
                  por {item.usuario_nome}
                </Text>

              </View>


              <View style={styles.conteudo}>

                <View style={styles.informacoes}>

                  <Text style={styles.informacao}>
                    {item.categoria}
                  </Text>


                  <Text style={styles.informacao}>
                    {item.material}
                  </Text>


                  <Text style={styles.informacao}>
                    1 cor(es)
                  </Text>


                  <Text
                    style={[
                      item.aprovacao_status

                        ?

                        item.aprovacao_status ==
                          'APROVADO'

                          ?

                          [
                            styles.informacao,
                            {
                              color: 'green',
                              borderColor: 'green'
                            }
                          ]

                          :

                          item.aprovacao_status ==
                            'REJEITADO'

                            ?

                            [
                              styles.informacao,
                              {
                                color: 'red',
                                borderColor: 'red'
                              }
                            ]

                            :

                            styles.informacao

                        :

                        {
                          display: 'none'
                        }
                    ]}
                  >

                    {
                      [
                        item.aprovacao_status ||
                        null
                      ]
                    }

                  </Text>

                </View>


                <View style={styles.containerDetalhe}>

                  <View style={styles.detalhes}>

                    <View style={styles.detalhe}>

                      <Text
                        style={
                          styles.informacaoDetalhe
                        }
                      >
                        Gramas
                      </Text>


                      <Text
                        style={
                          styles.principalDetalhe
                        }
                      >
                        {item.gramas}g
                      </Text>


                      <Text
                        style={
                          styles.informacaoDetalhe
                        }
                      >
                        {item.material}
                      </Text>

                    </View>


                    <View style={styles.detalhe}>

                      <Text
                        style={
                          styles.informacaoDetalhe
                        }
                      >
                        Tempo
                      </Text>


                      <Text
                        style={
                          styles.principalDetalhe
                        }
                      >
                        {item.tempo_impressao}
                      </Text>

                    </View>

                  </View>


                  <View style={styles.detalhes}>

                    <View style={styles.detalhe}>

                      <Text
                        style={
                          styles.informacaoDetalhe
                        }
                      >
                        Maquina
                      </Text>


                      <Text
                        style={
                          styles.principalDetalhe
                        }
                      >
                        {item.maquina}
                      </Text>

                    </View>


                    <View style={styles.detalhe}>

                      <Text
                        style={
                          styles.informacaoDetalhe
                        }
                      >
                        Valor Final
                      </Text>


                      <Text
                        style={
                          styles.principalDetalhe
                        }
                      >
                        {item.valor_final}
                      </Text>

                    </View>

                  </View>


                  <View style={styles.detalhes}>

                    <View style={styles.detalhe}>

                      <Text
                        style={
                          styles.informacaoDetalhe
                        }
                      >
                        Criado por
                      </Text>


                      <Text
                        style={
                          styles.principalDetalhe
                        }
                      >
                        {item.usuario_nome}
                      </Text>

                    </View>


                    <View style={styles.detalhe}>

                      <Text
                        style={
                          styles.informacaoDetalhe
                        }
                      >
                        Comprador
                      </Text>


                      <Text
                        style={
                          styles.principalDetalhe
                        }
                      >
                        {
                          [
                            item.comprador ||
                            "A ver"
                          ]
                        }
                      </Text>

                    </View>

                  </View>

                </View>

              </View>


              <View style={styles.footer}>

                {
                  item.status == 'Concluida' ?
                    <>
                      <View style={styles.containerCaixas}>


                        <TouchableOpacity
                          style={styles.caixa}

                          disabled={enviandoArquivo}

                          onPress={() =>
                            selecionaStl(item)
                          }
                        >

                          {
                            enviandoArquivo ?

                              <ActivityIndicator
                                size="small"
                              />

                              :

                              <Text
                                style={styles.textoCaixa}
                              >
                                STL
                              </Text>
                          }

                        </TouchableOpacity>


                        <TouchableOpacity
                          style={styles.caixa}

                          disabled={enviandoArquivo}

                          onPress={() =>
                            selecionaMidias(item)
                          }
                        >

                          {
                            enviandoArquivo ?

                              <ActivityIndicator
                                size="small"
                              />

                              :

                              <Text
                                style={styles.textoCaixa}
                              >
                                FOTOS E VÍDEOS
                              </Text>
                          }

                        </TouchableOpacity>


                      </View>
                    </>
                    :
                    null
                }



                <View style={styles.acoes}>


                  {
                    item.aprovacao_status &&
                      (
                        item.aprovacao_status ==
                        'REJEITADO' ||

                        item.aprovacao_status ==
                        'PENDENTE'
                      )

                      ?

                      null

                      :

                      <TouchableOpacity
                        style={
                          styles.botaoConcluir
                        }

                        onPress={() => {

                          setMostraConcluir();

                          setaId(item.id);

                        }}
                      >

                        <Text
                          style={
                            styles.textoBotaoConcluir
                          }
                        >
                          CONCLUIR
                        </Text>

                      </TouchableOpacity>
                  }


                  <TouchableOpacity
                    style={
                      styles.botaoRegistrarFalha
                    }

                    onPress={() => {

                      setaId(item.id);

                      setMostraFalha();

                    }}
                  >

                    <Text
                      style={
                        styles.textoBotaoRegistrarFalha
                      }
                    >
                      REGISTRAR FALHA
                    </Text>

                  </TouchableOpacity>


                  <TouchableOpacity
                    style={
                      styles.botaoLixeira
                    }

                    onPress={() => {

                      setMostraDeletar();

                      setaId(item.id);

                    }}
                  >

                    <Image
                      source={trashcan}
                      style={styles.lixeira}
                    />

                  </TouchableOpacity>


                </View>

              </View>

            </View>

          </>}

        />

    }

  </>

}