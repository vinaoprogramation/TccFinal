import React, { useState, useEffect } from 'react';

import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Image,
    Touchable,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';

import styles from './styles';

import useCatalogo from '../../Services/useCatalogo';

import BotaoVoltar from '../../Reutilizaveis/BotaoVoltar';
import PassadorImagens from '../../Reutilizaveis/PassadorImagens';
import passarTela from '../../Services/passarTela';

import * as FileSystem from 'expo-file-system/legacy';


export default function DetailScreen({ navigation, route }) {

    const item = route.params;

    const setMostra = passarTela(
        (state) => state.setMostra
    );

    const consultaProjeto = useCatalogo(
        (state) => state.consultaProjeto
    );

    const projetoIndividual = useCatalogo(
        (state) => state.projetoIndividual
    );

    const [fotos, setFotos] = useState([]);

    // ============================================
    // ESTADOS DO STL
    // ============================================

    const [stlDisponivel, setStlDisponivel] = useState(false);

    const [verificandoStl, setVerificandoStl] = useState(true);

    const [baixando, setBaixando] = useState(false);


    // ============================================
    // BUSCAR PROJETO
    // ============================================

    useEffect(() => {

        const buscarDados = async () => {

            if (consultaProjeto && item?.id) {

                console.log(
                    "Buscando ID: " + item.id
                );

                await consultaProjeto(item.id);

            }

        };

        buscarDados();

    }, [item?.id]);


    // ============================================
    // FOTOS
    // ============================================

    useEffect(() => {

        if (projetoIndividual) {

            setFotos(projetoIndividual);

        }

    }, [projetoIndividual]);


    // ============================================
    // VERIFICAR SE EXISTE STL
    // ============================================

    useEffect(() => {

        let cancelado = false;

        const verificarStl = async () => {

            if (!item?.id) {

                if (!cancelado) {

                    setStlDisponivel(false);
                    setVerificandoStl(false);

                }

                return;
            }


            const stlUrl =
                `https://api-ip3d.mbinfoseg.com.br/api/catalogo/stl/${item.id}/download`;


            try {

                console.log(
                    "Verificando STL:",
                    stlUrl
                );


                const resposta = await fetch(
                    stlUrl,
                    {
                        method: 'HEAD'
                    }
                );


                console.log(
                    "Status STL:",
                    resposta.status
                );


                if (!cancelado) {

                    if (resposta.ok) {

                        setStlDisponivel(true);

                    } else {

                        setStlDisponivel(false);

                    }

                }


            } catch (error) {

                console.error(
                    "Erro ao verificar STL:",
                    error
                );


                if (!cancelado) {

                    setStlDisponivel(false);

                }

            } finally {

                if (!cancelado) {

                    setVerificandoStl(false);

                }

            }

        };


        setVerificandoStl(true);
        setStlDisponivel(false);

        verificarStl();


        return () => {

            cancelado = true;

        };

    }, [item?.id]);


    // ============================================
    // DOWNLOAD DO STL
    // ============================================

    const baixarStl = async () => {

        if (!item?.id) {

            Alert.alert(
                'Erro',
                'Projeto inválido.'
            );

            return;
        }


        const stlUrl =
            `https://api-ip3d.mbinfoseg.com.br/api/catalogo/stl/${item.id}/download`;


        setBaixando(true);


        try {

            console.log(
                "Baixando STL:",
                stlUrl
            );


            // ========================================
            // ESCOLHER A PASTA
            // ========================================

            const permissao =
                await FileSystem.StorageAccessFramework
                    .requestDirectoryPermissionsAsync();


            if (!permissao.granted) {

                return;

            }


            // ========================================
            // NOME DO ARQUIVO
            // ========================================

            const nomeArquivo =
                `modelo-${item.id}.stl`;


            const arquivoTemporario =
                `${FileSystem.cacheDirectory}${nomeArquivo}`;


            // ========================================
            // BAIXAR
            // ========================================

            const resultado =
                await FileSystem.downloadAsync(
                    stlUrl,
                    arquivoTemporario
                );


            console.log(
                "Resultado do download:",
                resultado
            );


            if (
                !resultado ||
                resultado.status !== 200 ||
                !resultado.uri
            ) {

                throw new Error(
                    'Arquivo STL não encontrado.'
                );

            }


            // ========================================
            // CRIAR ARQUIVO NA PASTA ESCOLHIDA
            // ========================================

            const arquivoFinal =
                await FileSystem.StorageAccessFramework
                    .createFileAsync(
                        permissao.directoryUri,
                        nomeArquivo,
                        'application/octet-stream'
                    );


            // ========================================
            // LER ARQUIVO TEMPORÁRIO
            // ========================================

            const base64 =
                await FileSystem.readAsStringAsync(
                    resultado.uri,
                    {
                        encoding:
                            FileSystem.EncodingType.Base64
                    }
                );


            // ========================================
            // ESCREVER ARQUIVO FINAL
            // ========================================

            await FileSystem.writeAsStringAsync(
                arquivoFinal,
                base64,
                {
                    encoding:
                        FileSystem.EncodingType.Base64
                }
            );


            // ========================================
            // APAGAR TEMPORÁRIO
            // ========================================

            await FileSystem.deleteAsync(
                resultado.uri,
                {
                    idempotent: true
                }
            );


            // ========================================
            // SUCESSO
            // ========================================

            Alert.alert(
                'Sucesso',
                `O arquivo ${nomeArquivo} foi salvo na pasta escolhida.`
            );


        } catch (error) {

            console.error(
                'Erro ao baixar STL:',
                error
            );


            Alert.alert(
                'Erro',
                'Não foi possível baixar o arquivo STL.'
            );


        } finally {

            setBaixando(false);

        }

    };


    // ============================================
    // TELA
    // ============================================

    return <>

        <ScrollView style={styles.item}>

            <BotaoVoltar
                navigation={navigation}
            />


            <View>

                <PassadorImagens
                    navigation={navigation}
                    props={[item.id, fotos]}
                />


                <View style={styles.textos}>

                    {/* ====================================
                        USUÁRIO
                    ==================================== */}

                    <View style={styles.usuario}>

                        <Image
                            source={{
                                uri: item.fotoPerfil
                            }}
                            style={styles.imagemUsuario}
                        />

                        <Text
                            style={styles.nomeUsuario}
                        >
                            {item.usuario_nome}
                        </Text>

                    </View>


                    {/* ====================================
                        NOME
                    ==================================== */}

                    <Text
                        style={styles.nomeImpressao}
                    >
                        {item.nome_impressao}
                    </Text>


                    {/* ====================================
                        DETALHES
                    ==================================== */}

                    <View style={styles.detalhes}>

                        <View style={styles.conteudo}>

                            <View style={styles.materiais}>

                                <Text
                                    style={styles.materiaisItem}
                                >
                                    {item.categoria}
                                </Text>

                                <Text
                                    style={styles.materiaisItem}
                                >
                                    {item.material}
                                </Text>

                                <Text
                                    style={styles.materiaisItem}
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
                                            : <Text>
                                                Não há comprador
                                            </Text>
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


            {/* ============================================
                BOTÃO STL

                O BOTÃO SEMPRE APARECE.

                STL existe:
                -> habilitado

                STL não existe:
                -> desabilitado

                Verificando:
                -> desabilitado

                Baixando:
                -> desabilitado
            ============================================ */}

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

                {baixando ? (

                    <ActivityIndicator
                        color="#fff"
                    />

                ) : (

                    <Text
                        style={styles.textoStl}
                    >
                        Baixar Stl
                    </Text>

                )}

            </TouchableOpacity>


        </ScrollView>

    </>;

}