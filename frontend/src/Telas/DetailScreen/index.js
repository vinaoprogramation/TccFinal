// Screens/DetailScreen/index.js

import React, { useEffect, useState } from 'react';

import {
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';

import * as FileSystem from 'expo-file-system/legacy';

import styles from './styles';

import useCatalogo from '../../Services/useCatalogo';

import BotaoVoltar from '../../Reutilizaveis/BotaoVoltar';
import PassadorImagens from '../../Reutilizaveis/PassadorImagens';
import ShimmerCard from '../../Reutilizaveis/ShimmerCard';

export default function DetailScreen({
  navigation,
  route
}) {
  const item = route.params;

  const consultaProjeto = useCatalogo(
    (state) => state.consultaProjeto
  );

  const projetoIndividual = useCatalogo(
    (state) => state.projetoIndividual
  );

  const verificarStl = useCatalogo(
    (state) => state.verificarStl
  );

  const obterUrlDownloadStl = useCatalogo(
    (state) => state.obterUrlDownloadStl
  );

  const stlDisponivel = useCatalogo(
    (state) => state.stlDisponivel
  );

  const verificandoStl = useCatalogo(
    (state) => state.verificandoStl
  );

  const [fotos, setFotos] = useState([]);

  const [baixando, setBaixando] =
    useState(false);


  useEffect(() => {
    let cancelado = false;

    const carregarProjeto = async () => {
      if (!item?.id) {
        return;
      }

      try {
        await consultaProjeto(item.id);
      } catch (error) {
        if (!cancelado) {
          console.error(
            'Erro ao carregar projeto:',
            error
          );
        }
      }
    };

    carregarProjeto();

    return () => {
      cancelado = true;
    };

  }, [item?.id]);


  useEffect(() => {
    if (Array.isArray(projetoIndividual)) {
      setFotos(projetoIndividual);
    } else {
      setFotos([]);
    }
  }, [projetoIndividual]);


  useEffect(() => {
    if (!item?.id) {
      return;
    }

    verificarStl(item.id);

  }, [item?.id]);


  const baixarStl = async () => {
    if (baixando) {
      return;
    }

    if (!item?.id) {
      Alert.alert(
        'Erro',
        'Projeto inválido.'
      );

      return;
    }

    if (!stlDisponivel) {
      Alert.alert(
        'Erro',
        'Este projeto não possui um arquivo STL disponível.'
      );

      return;
    }

    setBaixando(true);

    let arquivoTemporario = null;

    try {

      const urlDownload =
        obterUrlDownloadStl(item.id);

      if (!urlDownload) {
        throw new Error(
          'URL de download inválida.'
        );
      }


      console.log(
        '[STL] URL:',
        urlDownload
      );


      if (Platform.OS === 'web') {

        window.open(
          urlDownload,
          '_blank',
          'noopener,noreferrer'
        );

        return;
      }


      if (Platform.OS !== 'android') {
        Alert.alert(
          'Indisponível',
          'O download de STL está configurado para Android e Web.'
        );

        return;
      }


      const permissao =
        await FileSystem.StorageAccessFramework
          .requestDirectoryPermissionsAsync();


      if (!permissao?.granted) {
        return;
      }


      if (!permissao.directoryUri) {
        throw new Error(
          'Nenhuma pasta foi selecionada.'
        );
      }


      const nomeArquivo =
        `modelo-${item.id}.stl`;


      if (!FileSystem.cacheDirectory) {
        throw new Error(
          'Diretório temporário indisponível.'
        );
      }


      arquivoTemporario =
        `${FileSystem.cacheDirectory}${nomeArquivo}`;


      await FileSystem.deleteAsync(
        arquivoTemporario,
        {
          idempotent: true
        }
      );


      const resultado =
        await FileSystem.downloadAsync(
          urlDownload,
          arquivoTemporario,
          {
            headers: {
              Accept:
                'application/octet-stream'
            }
          }
        );


      console.log(
        '[STL] Resultado:',
        resultado
      );


      if (!resultado) {
        throw new Error(
          'O servidor não retornou uma resposta.'
        );
      }


      if (resultado.status !== 200) {
        throw new Error(
          `Servidor respondeu com HTTP ${resultado.status}.`
        );
      }


      if (!resultado.uri) {
        throw new Error(
          'Arquivo temporário inválido.'
        );
      }


      const arquivoInfo =
        await FileSystem.getInfoAsync(
          resultado.uri
        );


      if (!arquivoInfo.exists) {
        throw new Error(
          'O arquivo STL não foi baixado.'
        );
      }


      if (
        typeof arquivoInfo.size === 'number' &&
        arquivoInfo.size <= 0
      ) {
        throw new Error(
          'O arquivo STL está vazio.'
        );
      }


      let arquivoFinal;


      try {

        arquivoFinal =
          await FileSystem
            .StorageAccessFramework
            .createFileAsync(
              permissao.directoryUri,
              nomeArquivo,
              'application/octet-stream'
            );

      } catch (error) {

        console.error(
          '[STL] Erro criando arquivo:',
          error
        );

        throw new Error(
          'Não foi possível criar o arquivo na pasta escolhida.'
        );
      }


      const base64 =
        await FileSystem.readAsStringAsync(
          resultado.uri,
          {
            encoding:
              FileSystem.EncodingType.Base64
          }
        );


      if (!base64) {
        throw new Error(
          'Não foi possível ler o STL baixado.'
        );
      }


      await FileSystem.writeAsStringAsync(
        arquivoFinal,
        base64,
        {
          encoding:
            FileSystem.EncodingType.Base64
        }
      );


      await FileSystem.deleteAsync(
        resultado.uri,
        {
          idempotent: true
        }
      );


      Alert.alert(
        'Sucesso',
        `O arquivo ${nomeArquivo} foi salvo com sucesso.`
      );

    } catch (error) {

      console.error(
        '[STL] Erro completo:',
        error
      );

      let mensagem =
        'Não foi possível baixar o arquivo STL.';

      if (error?.message) {
        mensagem =
          error.message;
      }

      Alert.alert(
        'Erro',
        mensagem
      );

    } finally {

      if (arquivoTemporario) {
        try {
          await FileSystem.deleteAsync(
            arquivoTemporario,
            {
              idempotent: true
            }
          );
        } catch (error) {
          console.warn(
            '[STL] Erro removendo temporário:',
            error
          );
        }
      }

      setBaixando(false);
    }
  };


  return (
    <ScrollView style={styles.item}>

      <BotaoVoltar
        navigation={navigation}
      />


      <View>

        <PassadorImagens
          navigation={navigation}
          props={[
            item.id,
            fotos
          ]}
        />


        <View style={styles.textos}>

          <View style={styles.usuario}>

            {
              item.fotoPerfil ? (

                <Image
                  source={{
                    uri: item.fotoPerfil
                  }}
                  style={
                    styles.imagemUsuario
                  }
                />

              ) : (

                <ShimmerCard
                  style={
                    styles.imagemUsuario
                  }
                />

              )
            }


            <Text style={styles.nomeUsuario}>
              {item.usuario_nome}
            </Text>

          </View>


          <Text style={styles.nomeImpressao}>
            {item.nome_impressao}
          </Text>


          <View style={styles.detalhes}>

            <View style={styles.conteudo}>

              <View style={styles.materiais}>

                <Text
                  style={
                    styles.materiaisItem
                  }
                >
                  {item.categoria}
                </Text>


                <Text
                  style={
                    styles.materiaisItem
                  }
                >
                  {item.material}
                </Text>


                <Text
                  style={
                    styles.materiaisItem
                  }
                >
                  {item.cor_filamento}
                </Text>

              </View>


              <View style={styles.detalhes}>

                <Text>
                  Data: {item.data}
                </Text>

                <Text>
                  Peso: {item.gramas}g
                </Text>

                <Text>
                  Tempo: {item.tempo_impressao}
                </Text>

                <Text>
                  {
                    item.comprador
                      ? item.comprador
                      : 'Não há comprador'
                  }
                </Text>

                <Text>
                  Valor Final: {item.valor_final}R$
                </Text>

              </View>

            </View>

          </View>

        </View>

      </View>


      <TouchableOpacity
        style={[
          styles.botaoStl,

          (
            !stlDisponivel ||
            verificandoStl ||
            baixando
          ) && {
            opacity: 0.5
          }
        ]}
        onPress={baixarStl}
        disabled={
          !stlDisponivel ||
          verificandoStl ||
          baixando
        }
      >

        {
          baixando ? (

            <ActivityIndicator
              color="#fff"
            />

          ) : (

            <Text style={styles.textoStl}>

              {
                verificandoStl
                  ? 'Verificando...'
                  : stlDisponivel
                    ? 'Baixar STL'
                    : 'STL indisponível'
              }

            </Text>

          )
        }

      </TouchableOpacity>


    </ScrollView>
  );
}