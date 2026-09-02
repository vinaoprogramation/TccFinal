import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList, TextInputComponent } from "react-native";


import styles from "./styles";


import search from '../../../assets/search.png'




import Toast from 'react-native-toast-message'


import passarTela from "../../Services/passarTela";
import useImpressoes from "../../Services/useImpressoes";
import useMaquinas from "../../Services/useMaquinas";
import useEstoque from "../../Services/useEstoque";
import useConfiguracoes from "../../Services/useConfiguracoes";


export default function ReportaFalha({ navigation }) {
    const consultaImpressoes = useImpressoes((state) => state.consultaImpressoes);

    const mostraFalha = useImpressoes((state) => state.mostraFalha);
    const setMostraFalha = useImpressoes((state) => state.setMostraFalha);
    const reportaFalha = useImpressoes((state) => state.reportaFalha);


    const consultaOpcoes = useConfiguracoes((state) => state.consultaOpcoes);
    const materiais = useConfiguracoes((state) => state.materiais);


    const estoque = useEstoque((state) => state.estoque);
    const consultaEstoque = useEstoque((state) => state.consultaEstoque);

    const [porcentagem, setPorcentagem] = useState("");
    const [observacao, setObservacao] = useState("");
    const [gramasPerdidas, setGramasPerdidas] = useState("");
    const [foto, setFoto] = useState("");

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



    const mostraPop = async (id, foto, percentualFalha, material, cor, gramasPerdidas, observacao) => {
        const mostra = await reportaFalha(id, foto, percentualFalha, material, cor, gramasPerdidas, observacao);


        if (mostra) {
            Toast.show({
                type: "success",
                text1: "Impressão cadastrada com sucesso!",
                visibilityTime: 3000
            })


            setCorMostra(false);
            setCorValor("");

            setPorcentagem("");
            setObservacao("");
            setGramasPerdidas("");
            setFoto("");

            setMaterialMostra(false);
            setMaterialValor("");

            consultaImpressoes();
            setMostraFalha();
        }


    }




    const cadastra = async (nome, categoria, tempo, maquina, material, cor, gramas, objetivo, comprador) => {
        if (!nome || !categoria || !tempo || !maquina || !material || materiaisValor != "Material Próprio" && !cor || !gramas || categoria == "Pessoal" && !objetivo || objetivo == "" || categoria == "Venda" && !comprador) {
            console.log("Faltam parâmetros");
            Toast.show({
                type: "error",
                text1: "Insira todos os campos",
                visibilityTime: 3000
            })
            return;
        }
        if (!cadastraImpressao) {
            console.log("Função não carregada");
            return;
        }
        const envia = await cadastraImpressao(nome, categoria, tempo, maquina, material, cor, gramas, objetivo, comprador);
        if (!envia) {
            console.log("Erro ao cadastrar impressão");
            return;
        }


        console.log("Impressão cadastrada");
        return true;
    }




    return <>
        {mostraFalha ?
            <>
                <TouchableOpacity style={styles.fundo}
                    onPress={() => {

                        setMostraFalha();
                    }}
                >


                    <TouchableOpacity style={styles.container}
                        activeOpacity={1}
                    >
                        <ScrollView>
                            <Text style={styles.titulo}>Registrar Falha</Text>
                            <Text style={styles.titulo}>Informe apenas o material realmente perdido. A porcentagem fica como historico e nao calcula estoque automaticamente.</Text>


                            <View style={styles.inputs}>

                                <TextInput
                                    value={foto}
                                    onChangeText={setFoto}
                                    placeholder="Enviar foto"
                                    style={styles.input}
                                />

                                <TextInput
                                    value={porcentagem}
                                    onChangeText={setPorcentagem}
                                    placeholder="Porcentagem aproximada onde parou*"
                                    style={styles.input}
                                />

                                <TextInput
                                    value={observacao}
                                    onChangeText={setObservacao}
                                    placeholder="Observação*"
                                    style={styles.input}
                                />


                                <TouchableOpacity
                                    style={styles.input}
                                    onPress={() => {
                                        setMaterialMostra(!materialMostra)
                                    }}
                                >
                                    <Text>
                                        {materialValor != "" ? materialValor : "Selecione o material*"}
                                    </Text>


                                </TouchableOpacity>
                                {materialMostra ?
                                    <>
                                        <FlatList
                                            style={styles.flatList}
                                            data={materiais}
                                            scrollEnabled={false}
                                            keyExtractor={(item) => String(item.id)}
                                            ListHeaderComponent={() => <>
                                                <Text style={styles.textoFlat}>Selecione um material</Text>
                                            </>}
                                            renderItem={({ item }) => <>


                                                <TouchableOpacity style={[styles.itens, { flexDirection: 'row', gap: 10, flexWrap: 'wrap' }]}
                                                    onPress={() => {
                                                        setMaterialValor(item.nome)
                                                        setMaterialMostra(false)
                                                        setCorValor("")
                                                    }}


                                                >
                                                    <Text style={styles.textoMaquinas}>{item.nome}</Text>
                                                    <Text style={styles.textoMaquinas}>·</Text>
                                                    <Text style={styles.textoMaquinas}>R$ {item.valor_grama}/g</Text>
                                                </TouchableOpacity>


                                            </>}
                                        />
                                    </>
                                    :
                                    null
                                }



                                {materialValor != "" ?
                                    <>
                                        {corMostra ?
                                            <>


                                                <FlatList
                                                    style={styles.flatList}
                                                    data={estoque}
                                                    scrollEnabled={false}
                                                    keyExtractor={(item) => String(item.id)}
                                                    ListHeaderComponent={() => <>
                                                        <Text style={styles.textoFlat}>Selecione uma cor</Text>
                                                    </>}
                                                    renderItem={({ item }) => <>
                                                        {materialValor ?
                                                            <>


                                                                {item.material == materialValor ? <>
                                                                    <TouchableOpacity style={[styles.itens, { flexDirection: 'row', gap: 10, flexWrap: 'wrap' }]}
                                                                        onPress={() => {
                                                                            setCorValor(item.cor)
                                                                            setCorMostra(false)
                                                                        }}


                                                                    >
                                                                        <Text style={styles.textoMaquinas}>{item.material == materialValor ? item.cor : null}</Text>
                                                                        <Text style={styles.textoMaquinas}>·</Text>
                                                                        <Text style={styles.textoMaquinas}>saldo {item.saldo}g</Text>
                                                                    </TouchableOpacity>
                                                                </> : null}
                                                            </>
                                                            :
                                                            null
                                                        }


                                                    </>}
                                                />




                                            </>
                                            :
                                            null


                                        }
                                    </>
                                    :
                                    <Text style={styles.textoObs}>Selecione um Material*</Text>
                                }



                                <TouchableOpacity
                                    style={styles.input}
                                    onPress={() => {
                                        setCorMostra(!corMostra)
                                    }}
                                >
                                    <Text>
                                        {corValor != "" ? corValor : "Selecione a cor*"}
                                    </Text>


                                </TouchableOpacity>


                                <View style={styles.decisoes}>
                                    <TouchableOpacity style={styles.botaoDecisaoCancelar}
                                        onPress={() => {
                                            setMaterialMostra(false);
                                            setMaterialValor("");

                                            setMostraFalha();
                                        }
                                        }
                                    >
                                        <Text style={styles.textoDecisaoCancelar}>CANCELAR</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity style={styles.botaoDecisaoSalvar}
                                        onPress={() => {
                                            mostraPop(id, foto, porcentagem, materialValor, cor, gramasPerdidas, observacao)
                                        }}


                                    >
                                        <Text style={styles.textoDecisaoSalvar}>SALVAR</Text>
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
