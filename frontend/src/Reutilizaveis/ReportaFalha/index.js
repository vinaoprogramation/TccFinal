import React, { useState, useEffect } from "react";

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    FlatList
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import styles from "./styles";

import Toast from "react-native-toast-message";

import useImpressoes from "../../Services/useImpressoes";
import useEstoque from "../../Services/useEstoque";
import useConfiguracoes from "../../Services/useConfiguracoes";


export default function ReportaFalha({ navigation }) {

    const consultaImpressoes = useImpressoes(
        (state) => state.consultaImpressoes
    );

    const mostraFalha = useImpressoes(
        (state) => state.mostraFalha
    );

    const setMostraFalha = useImpressoes(
        (state) => state.setMostraFalha
    );

    const reportaFalha = useImpressoes(
        (state) => state.reportaFalha
    );

    const id = useImpressoes(
        (state) => state.id
    );


    const consultaOpcoes = useConfiguracoes(
        (state) => state.consultaOpcoes
    );

    const materiais = useConfiguracoes(
        (state) => state.materiais
    );


    const estoque = useEstoque(
        (state) => state.estoque
    );

    const consultaEstoque = useEstoque(
        (state) => state.consultaEstoque
    );


    const [porcentagem, setPorcentagem] = useState("");

    const [observacao, setObservacao] = useState("");

    const [gramasPerdidas, setGramasPerdidas] = useState("");

    const [foto, setFoto] = useState(null);


    const [materialMostra, setMaterialMostra] = useState(false);

    const [materialValor, setMaterialValor] = useState("");


    const [corMostra, setCorMostra] = useState(false);

    const [corValor, setCorValor] = useState("");


    useEffect(() => {

        consultaOpcoes();

    }, [consultaOpcoes]);


    useEffect(() => {

        consultaEstoque();

    }, [consultaEstoque]);


    const selecionaFoto = async () => {

        try {

            const permissao =
                await ImagePicker.requestMediaLibraryPermissionsAsync();


            if (!permissao.granted) {

                Toast.show({
                    type: "error",
                    text1: "Permissão negada",
                    text2: "Permita o acesso à galeria.",
                    visibilityTime: 3000
                });

                return;

            }


            const resultado =
                await ImagePicker.launchImageLibraryAsync({

                    mediaTypes: ["images"],

                    allowsEditing: false,

                    quality: 0.8,

                    selectionLimit: 1

                });


            if (resultado.canceled) {
                return;
            }


            const arquivo = resultado.assets[0];


            setFoto({
                uri: arquivo.uri,

                name:
                    arquivo.fileName ||
                    `foto-${Date.now()}.jpg`,

                type:
                    arquivo.mimeType ||
                    "image/jpeg"
            });

        } catch (error) {

            console.error(
                "Erro ao selecionar foto:",
                error
            );

            Toast.show({
                type: "error",
                text1: "Erro ao selecionar foto",
                visibilityTime: 3000
            });

        }

    };


    const mostraPop = async () => {

        if (!id) {

            Toast.show({
                type: "error",
                text1: "Impressão não identificada",
                visibilityTime: 3000
            });

            return;

        }


        if (
            !foto ||
            !porcentagem ||
            !gramasPerdidas ||
            !materialValor ||
            !observacao
        ) {

            Toast.show({
                type: "error",
                text1: "Insira todos os campos",
                visibilityTime: 3000
            });

            return;

        }


        if (
            materialValor !== "Material Próprio" &&
            !corValor
        ) {

            Toast.show({
                type: "error",
                text1: "Selecione a cor",
                visibilityTime: 3000
            });

            return;

        }


        const mostra = await reportaFalha(
            id,
            foto,
            porcentagem,
            materialValor,
            corValor,
            gramasPerdidas,
            observacao
        );


        if (mostra) {

            Toast.show({
                type: "success",
                text1: "Falha registrada com sucesso!",
                visibilityTime: 3000
            });


            setCorMostra(false);
            setCorValor("");

            setPorcentagem("");

            setObservacao("");

            setGramasPerdidas("");

            setFoto(null);

            setMaterialMostra(false);

            setMaterialValor("");


            consultaImpressoes();

            setMostraFalha();

        }

    };


    return <>

        {mostraFalha ?

            <>

                <TouchableOpacity
                    style={styles.fundo}
                    onPress={() => {

                        setMaterialMostra(false);

                        setCorMostra(false);

                        setMostraFalha();

                    }}
                >

                    <TouchableOpacity
                        style={styles.container}
                        activeOpacity={1}
                    >

                        <ScrollView>

                            <Text style={styles.titulo}>
                                Registrar Falha
                            </Text>


                            <Text style={styles.subTitulo}>
                                Informe apenas o material realmente perdido. A porcentagem fica como historico e não calcula estoque automaticamente.
                            </Text>


                            <View style={styles.inputs}>

                                <TouchableOpacity
                                    style={styles.input}
                                    onPress={selecionaFoto}
                                >

                                    <Text>
                                        {foto
                                            ? "Foto selecionada"
                                            : "Enviar foto*"
                                        }
                                    </Text>

                                </TouchableOpacity>


                                {foto ?

                                    <View style={styles.previewFoto}>

                                        <Image
                                            source={{
                                                uri: foto.uri
                                            }}
                                            style={styles.miniaturaFoto}
                                            resizeMode="cover"
                                        />


                                        <TouchableOpacity
                                            onPress={() => {
                                                setFoto(null);
                                            }}
                                        >

                                            <Text
                                                style={styles.removerFoto}
                                            >
                                                REMOVER FOTO
                                            </Text>

                                        </TouchableOpacity>

                                    </View>

                                    :
                                    null
                                }


                                <TextInput
                                    value={porcentagem}
                                    onChangeText={setPorcentagem}
                                    placeholder="Porcentagem aproximada onde parou*"
                                    keyboardType="numeric"
                                    style={styles.input}
                                />


                                <TextInput
                                    value={gramasPerdidas}
                                    onChangeText={setGramasPerdidas}
                                    placeholder="Gramas perdidas*"
                                    keyboardType="numeric"
                                    style={styles.input}
                                />


                                <TextInput
                                    value={observacao}
                                    onChangeText={setObservacao}
                                    placeholder="Observação*"
                                    multiline={true}
                                    style={styles.input}
                                />


                                <TouchableOpacity
                                    style={styles.input}
                                    onPress={() => {

                                        setMaterialMostra(
                                            !materialMostra
                                        );

                                        setCorMostra(false);

                                    }}
                                >

                                    <Text>

                                        {
                                            materialValor !== ""
                                                ? materialValor
                                                : "Selecione o material*"
                                        }

                                    </Text>

                                </TouchableOpacity>


                                {materialMostra ?

                                    <FlatList
                                        style={styles.flatList}
                                        data={materiais}
                                        scrollEnabled={false}
                                        keyExtractor={(item) =>
                                            String(item.id)
                                        }

                                        ListHeaderComponent={() => (
                                            <Text
                                                style={styles.textoFlat}
                                            >
                                                Selecione um material
                                            </Text>
                                        )}

                                        renderItem={({ item }) => (

                                            <TouchableOpacity
                                                style={[
                                                    styles.itens,
                                                    {
                                                        flexDirection: 'row',
                                                        gap: 10,
                                                        flexWrap: 'wrap'
                                                    }
                                                ]}
                                                onPress={() => {

                                                    setMaterialValor(
                                                        item.nome
                                                    );

                                                    setMaterialMostra(
                                                        false
                                                    );

                                                    setCorValor("");

                                                }}
                                            >

                                                <Text
                                                    style={
                                                        styles.textoMaquinas
                                                    }
                                                >
                                                    {item.nome}
                                                </Text>


                                                <Text
                                                    style={
                                                        styles.textoMaquinas
                                                    }
                                                >
                                                    ·
                                                </Text>


                                                <Text
                                                    style={
                                                        styles.textoMaquinas
                                                    }
                                                >
                                                    R$ {item.valor_grama}/g
                                                </Text>

                                            </TouchableOpacity>

                                        )}

                                    />

                                    :
                                    null
                                }


                                {
                                    materialValor !== "" &&
                                    materialValor !== "Material Próprio"
                                        ?

                                        <>

                                            <TouchableOpacity
                                                style={styles.input}
                                                onPress={() => {

                                                    setCorMostra(
                                                        !corMostra
                                                    );

                                                    setMaterialMostra(
                                                        false
                                                    );

                                                }}
                                            >

                                                <Text>

                                                    {
                                                        corValor !== ""
                                                            ? corValor
                                                            : "Selecione a cor*"
                                                    }

                                                </Text>

                                            </TouchableOpacity>


                                            {corMostra ?

                                                <FlatList
                                                    style={styles.flatList}
                                                    data={estoque}
                                                    scrollEnabled={false}
                                                    keyExtractor={(item) =>
                                                        String(item.id)
                                                    }

                                                    ListHeaderComponent={() => (
                                                        <Text
                                                            style={
                                                                styles.textoFlat
                                                            }
                                                        >
                                                            Selecione uma cor
                                                        </Text>
                                                    )}

                                                    renderItem={({ item }) => {

                                                        if (
                                                            item.material !==
                                                            materialValor
                                                        ) {
                                                            return null;
                                                        }


                                                        return (

                                                            <TouchableOpacity
                                                                style={[
                                                                    styles.itens,
                                                                    {
                                                                        flexDirection: 'row',
                                                                        gap: 10,
                                                                        flexWrap: 'wrap'
                                                                    }
                                                                ]}
                                                                onPress={() => {

                                                                    setCorValor(
                                                                        item.cor
                                                                    );

                                                                    setCorMostra(
                                                                        false
                                                                    );

                                                                }}
                                                            >

                                                                <Text
                                                                    style={
                                                                        styles.textoMaquinas
                                                                    }
                                                                >
                                                                    {item.cor}
                                                                </Text>


                                                                <Text
                                                                    style={
                                                                        styles.textoMaquinas
                                                                    }
                                                                >
                                                                    ·
                                                                </Text>


                                                                <Text
                                                                    style={
                                                                        styles.textoMaquinas
                                                                    }
                                                                >
                                                                    saldo {item.saldo}g
                                                                </Text>

                                                            </TouchableOpacity>

                                                        );

                                                    }}

                                                />

                                                :
                                                null
                                            }

                                        </>

                                        :
                                        null
                                }


                                {
                                    materialValor === "Material Próprio"
                                        ?
                                        null
                                        :
                                        materialValor === ""
                                            ?
                                            null
                                            :
                                            <Text
                                                style={styles.textoObs}
                                            >
                                                As cores vêm do estoque
                                            </Text>
                                }


                                <View style={styles.decisoes}>

                                    <TouchableOpacity
                                        style={
                                            styles.botaoDecisaoCancelar
                                        }
                                        onPress={() => {

                                            setMaterialMostra(
                                                false
                                            );

                                            setMaterialValor("");

                                            setCorMostra(false);

                                            setCorValor("");

                                            setPorcentagem("");

                                            setObservacao("");

                                            setGramasPerdidas("");

                                            setFoto(null);

                                            setMostraFalha();

                                        }}
                                    >

                                        <Text
                                            style={
                                                styles.textoDecisaoCancelar
                                            }
                                        >
                                            CANCELAR
                                        </Text>

                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={
                                            styles.botaoDecisaoSalvar
                                        }
                                        onPress={mostraPop}
                                    >

                                        <Text
                                            style={
                                                styles.textoDecisaoSalvar
                                            }
                                        >
                                            SALVAR
                                        </Text>

                                    </TouchableOpacity>

                                </View>

                            </View>

                        </ScrollView>

                    </TouchableOpacity>

                </TouchableOpacity>

            </>

            :
            null
        }

    </>

}