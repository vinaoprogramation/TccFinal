import React, { useState, useEffect } from "react";

import Toast from 'react-native-toast-message'

import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";

import styles from "./styles";


import trashcan from '../../../assets/trashcan.png'


import BotaoMenu from "../../Reutilizaveis/BotaoMenu";
import Menu from "../../Reutilizaveis/Menu";

import navegacaoMenu from "../../Services/navegacaoMenu";

import useEstoque from "../../Services/useEstoque";

import AdicionaEstoque from "../../Reutilizaveis/AdicionaEstoque";
import AvisoDeleteEstoque from "../../Reutilizaveis/AvisoDeleteEstoque";
import AdicionaRolo from "../../Reutilizaveis/AdicionaRolo";
export default function Estoque({ navigation }) {

    const consultaEstoque = useEstoque((state) => state.consultaEstoque);
    const estoque = useEstoque((state) => state.estoque);
    const materiais = useEstoque((state) => state.materiais);
    const adicionaEstoque = useEstoque((state) => state.adicionaEstoque);
    const setMostraAdicionar = useEstoque((state) => state.setMostraAdicionar);
    const setMostraDeletar = useEstoque((state) => state.setMostraDeletar);
    const setaId = useEstoque((state) => state.setaId);
    const setMostraAdicionarRolo = useEstoque((state) => state.setMostraAdicionarRolo);


    const mostraMenu = navegacaoMenu((state) => state.mostraMenu);
    const iniciaMenu = navegacaoMenu((state) => state.iniciaMenu);

    useEffect(() => {
        if (iniciaMenu) {
            iniciaMenu();
        }
    }, [iniciaMenu])

    useEffect(() => {
        consultaEstoque()
    }, [consultaEstoque])


    const ajustaData = (dataInteira) => {
        const timestamp = dataInteira;
        const dataFormatada = new Date(timestamp);
        const dataFinal = dataFormatada.toLocaleString('pt-BR').split(",")[0]
        return dataFinal
    }


    return <>
        <BotaoMenu />
        <Menu
            navigation={navigation}
        />
        <AdicionaEstoque />
        <AdicionaRolo/>
        <AvisoDeleteEstoque/>

        <ScrollView style={styles.fundo}>
            <View style={styles.cabecalho}>
                <View style={styles.textos}>
                    <Text style={styles.titulo}>Estoque de Filamentos</Text>
                    <Text style={styles.chamada}>Controle de entrada, saida, saldo e alertas por material e cor.</Text>
                </View>

            </View>

            <TouchableOpacity
                style={styles.botaoAdicionar}
                onPress={() => {
                    setMostraAdicionar();
                }}
            >
                <Text style={styles.textoAdicionar}>NOVO ESTOQUE</Text>
            </TouchableOpacity>


            <View style={styles.dashboard}>
                <View style={styles.itemDashboard}>
                    <Text style={styles.legenda}>Itens cadastrados</Text>
                    <Text style={styles.quantidade}>{estoque.length}</Text>
                </View>
            </View>

            <View style={styles.dashboard}>
                <View style={styles.itemDashboard}>
                    <Text style={styles.legenda}>Estoque Baixo</Text>
                    <Text style={styles.quantidade}>1</Text>
                </View>
            </View>

            <View style={styles.dashboard}>
                <View style={styles.itemDashboard}>
                    <Text style={styles.legenda}>Estoque crítico</Text>
                    <Text style={styles.quantidade}>4</Text>
                </View>
            </View>

            <FlatList
                style={styles.flatList}
                data={materiais}
                keyExtractor={(item) => (item.material)}
                ListHeaderComponent={() => <>
                    <Text style={[styles.quantidade, { paddingHorizontal: 20, fontSize: 30, textAlign: 'center' }]}>Total por material</Text>

                </>}
                renderItem={({ item }) => <>


                    <View style={[styles.dashboard, { width: '100%' }]}>

                        <View style={styles.textos}>
                            <Text>{item.material}</Text>
                            <Text>Saldo: {item.total_saldo}</Text>
                            <Text>Entrada total: {item.total_entrada}</Text>
                            <Text>Saída total: {item.total_saida}</Text>
                        </View>
                    </View>





                </>}

            />




            <FlatList
                style={styles.flatList}
                data={estoque}
                keyExtractor={(item) => (item.id)}
                ListHeaderComponent={() => <>
                    <Text style={[styles.quantidade, { paddingHorizontal: 20, fontSize: 30, textAlign: 'center' }]}>Almoxarifado</Text>
                </>}
                renderItem={({ item }) => <>


                    <View style={[styles.dashboard, { width: '100%' }]}>

                        <View style={styles.textos}>
                            <View style={styles.divisoria}>
                                <Text style={styles.label}>Filamento: </Text>
                                <Text style={styles.principal}>{item.material}</Text>
                                <Text style={[styles.especificacao, { borderWidth: 1, padding: 5, borderRadius: 15 }]}>{item.cor}</Text>
                            </View>

                            <View style={styles.divisoria}>
                                <Text style={styles.label}>Movimento </Text>

                                <View style={styles.divisao}>
                                    <Text style={styles.especificacao}>Inicial: {item.peso_inicial}</Text>
                                    <Text style={styles.especificacao}>Entrada: {item.entrada}</Text>
                                    <Text style={styles.especificacao}>Saída: {item.saida}</Text>
                                </View>

                            </View>

                            <View style={styles.divisoria}>
                                <Text style={styles.label}>Saldo: </Text>
                                <Text style={styles.especificacao}>{item.saldo}g</Text>
                            </View>

                            <View style={styles.divisoria}>
                                <Text style={styles.label}>Última entrada: </Text>
                                <Text style={styles.especificacao}>{ajustaData(item.ultima_entrada)}</Text>
                            </View>

                            <View style={styles.divisoria}>
                                <Text style={styles.label}>Rolos/alertas: </Text>
                                <View style={styles.divisao}>
                                    <Text style={styles.especificacao}>Quantidade{item.total_rolos}</Text>
                                    <Text style={[styles.especificacao, item.alerta == 'OK' ? { borderWidth: 1, borderColor: '#85ec56', borderRadius: 10, width: '12%', alignSelf: 'center', color: '#85ec56' } : { borderWidth: 1, borderColor: '#fd7b7b', borderRadius: 10, width: '45%', alignSelf: 'center', color: '#fd7b7b' }]}>{item.alerta}</Text>
                                </View>

                            </View>

                        </View>
                        <TouchableOpacity style={styles.botaoLixeira}
                            onPress={() => {
                                setMostraDeletar();
                                setaId(item.id)
                            }}
                        >
                            <Image
                                source={trashcan}
                                style={styles.lixeira}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.botaoRolo}
                            onPress={() => {
                                setMostraAdicionarRolo();
                                setaId(item.id)
                            }}
                        >
                            <Text>ROLO</Text>
                        </TouchableOpacity>


                        
                    </View>



                </>}

            />











        </ScrollView>
    </>
}