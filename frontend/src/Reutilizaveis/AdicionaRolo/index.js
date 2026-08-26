import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList, TextInputComponent } from "react-native";


import styles from "./styles";


import Toast from 'react-native-toast-message'

import useEstoque from "../../Services/useEstoque";
export default function AdicionaRolo({ navigation }) {
    const consultaEstoque = useEstoque((state) => state.consultaEstoque);
    const mostraAdicionarRolo = useEstoque((state) => state.mostraAdicionarRolo);
    const setMostraAdicionarRolo = useEstoque((state) => state.setMostraAdicionarRolo);
    const adicionaRolo = useEstoque((state) => state.adicionaRolo);
    const id = useEstoque((state) => state.id);

    const [peso, setPeso] = useState('');
    const [observacao, setObservacao] = useState('');


    const mostraPop = async (peso, observacao) => {
        const mostra = await adicionaRolo(peso, new Date(Date.Now).toLocaleDateString('pt-BR').split(',')[0], observacao, id);

        if (mostra) {
            Toast.show({
                type: "success",
                text1: "Rolo adicionado com sucesso!",
                visibilityTime: 3000
            })
            setPeso("");
            setObservacao("")



            consultaEstoque()
            setMostraAdicionarRolo();

        }


    }

    return <>
        {
            mostraAdicionarRolo ?
                <>
                    <TouchableOpacity style={styles.fundo} activeOpacity={1}>
                        <TouchableOpacity style={styles.container} activeOpacity={1}>
                            <ScrollView>
                                <Text style={styles.titulo}>Novo Rolo</Text>


                                <View style={styles.inputs}>

                                    <TextInput
                                        value={peso}
                                        onChangeText={setPeso}
                                        placeholder="Peso*"
                                        style={styles.input}
                                    />

                                    <TextInput
                                        value={observacao}
                                        onChangeText={setObservacao}
                                        placeholder="Observação"
                                        style={styles.input}
                                    />


                                    <View style={styles.decisoes}>
                                        <TouchableOpacity style={styles.botaoDecisaoCancelar}
                                            onPress={() => {
                                                setPeso("");
                                                setObservacao("")


                                                setMostraAdicionarRolo();
                                            }
                                            }
                                        >
                                            <Text style={styles.textoDecisaoCancelar}>CANCELAR</Text>
                                        </TouchableOpacity>


                                        <TouchableOpacity style={styles.botaoDecisaoSalvar}
                                            onPress={() => {

                                                mostraPop(peso, observacao)
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


