import React, { useState, useEffect } from 'react';
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

import styles from './styles';
import useCatalogo, { baseUrl } from '../../Services/useCatalogo';
import BotaoVoltar from '../../Reutilizaveis/BotaoVoltar';
import PassadorImagens from '../../Reutilizaveis/PassadorImagens';
import passarTela from '../../Services/passarTela';

// Import correto para versões atuais do Expo
import * as FileSystem from 'expo-file-system';

export default function DetailScreen({ navigation, route }) {
    const item = route.params;

    const consultaProjeto = useCatalogo((state) => state.consultaProjeto);
    const projetoIndividual = useCatalogo((state) => state.projetoIndividual);

    const [fotos, setFotos] = useState([]);
    const [stlDisponivel, setStlDisponivel] = useState(false);
    const [verificandoStl, setVerificandoStl] = useState(true);
    const [baixando, setBaixando] = useState(false);

    useEffect(() => {
        const buscarDados = async () => {
            if (consultaProjeto && item?.id) {
                await consultaProjeto(item.id);
            }
        };
        buscarDados();
    }, [item?.id]);

    useEffect(() => {
        if (projetoIndividual) {
            setFotos(projetoIndividual);
        }
    }, [projetoIndividual]);

    // ============================================
    // VERIFICAR STL (ATRAVÉS DO SEU BACKEND)
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

            // Consulta o SEU backend
            const urlVerificacao = `${baseUrl}/catalogo/stl/${item.id}/verificar`;

            try {
                const resposta = await fetch(urlVerificacao);
                const dados = await resposta.json();

                if (!cancelado) {
                    setStlDisponivel(!!dados.disponivel);
                }
            } catch (error) {
                console.error("Erro ao verificar STL via backend:", error);
                if (!cancelado) setStlDisponivel(false);
            } finally {
                if (!cancelado) setVerificandoStl(false);
            }
        };

        setVerificandoStl(true);
        setStlDisponivel(false);
        verificarStl();

        return () => { cancelado = true; };
    }, [item?.id]);

    // ============================================
    // DOWNLOAD DO STL (WEB + MOBILE)
    // ============================================
    const baixarStl = async () => {
        if (!item?.id) {
            Alert.alert('Erro', 'Projeto inválido.');
            return;
        }

        const urlDownload = `${baseUrl}/catalogo/stl/${item.id}/download`;
        setBaixando(true);

        try {
            // === COMPORTAMENTO PARA WEB ===
            if (Platform.OS === 'web') {
                window.open(urlDownload, '_blank');
                setBaixando(false);
                return;
            }

            // === COMPORTAMENTO PARA MOBILE (ANDROID/IOS) ===
            const permissao = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

            if (!permissao.granted) {
                setBaixando(false);
                return;
            }

            const nomeArquivo = `modelo-${item.id}.stl`;
            const arquivoTemporario = `${FileSystem.cacheDirectory}${nomeArquivo}`;

            const resultado = await FileSystem.downloadAsync(urlDownload, arquivoTemporario);

            if (!resultado || resultado.status !== 200 || !resultado.uri) {
                throw new Error('Arquivo STL não encontrado.');
            }

            const arquivoFinal = await FileSystem.StorageAccessFramework.createFileAsync(
                permissao.directoryUri,
                nomeArquivo,
                'application/octet-stream'
            );

            const base64 = await FileSystem.readAsStringAsync(resultado.uri, {
                encoding: FileSystem.EncodingType.Base64
            });

            await FileSystem.writeAsStringAsync(arquivoFinal, base64, {
                encoding: FileSystem.EncodingType.Base64
            });

            await FileSystem.deleteAsync(resultado.uri, { idempotent: true });

            Alert.alert('Sucesso', `O arquivo ${nomeArquivo} foi salvo com sucesso!`);
        } catch (error) {
            console.error('Erro ao baixar STL:', error);
            Alert.alert('Erro', 'Não foi possível baixar o arquivo STL.');
        } finally {
            setBaixando(false);
        }
    };

    return (
        <ScrollView style={styles.item}>
            <BotaoVoltar navigation={navigation} />

            <View>
                <PassadorImagens navigation={navigation} props={[item.id, fotos]} />

                <View style={styles.textos}>
                    <View style={styles.usuario}>
                        <Image source={{ uri: item.fotoPerfil }} style={styles.imagemUsuario} />
                        <Text style={styles.nomeUsuario}>{item.usuario_nome}</Text>
                    </View>

                    <Text style={styles.nomeImpressao}>{item.nome_impressao}</Text>

                    <View style={styles.detalhes}>
                        <View style={styles.conteudo}>
                            <View style={styles.materiais}>
                                <Text style={styles.materiaisItem}>{item.categoria}</Text>
                                <Text style={styles.materiaisItem}>{item.material}</Text>
                                <Text style={styles.materiaisItem}>{item.cor_filamento}</Text>
                            </View>

                            <View style={styles.detalhes}>
                                <Text>Data: {item.data}</Text>
                                <Text>Peso: {item.gramas}g</Text>
                                <Text>Tempo: {item.tempo_impressao}</Text>
                                <Text>{item.comprador ? item.comprador : 'Não há comprador'}</Text>
                                <Text>Valor Final: {item.valor_final}R$</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={[
                    styles.botaoStl,
                    (!stlDisponivel || verificandoStl || baixando) && { opacity: 0.5 }
                ]}
                onPress={baixarStl}
                disabled={!stlDisponivel || verificandoStl || baixando}
            >
                {baixando ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoStl}>
                        {verificandoStl ? 'Verificando...' : 'Baixar Stl'}
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}