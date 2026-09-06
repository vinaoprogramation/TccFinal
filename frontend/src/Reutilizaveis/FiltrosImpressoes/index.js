import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";

import styles from "./styles";

import useCatalogo from "../../Services/useCatalogo";
import useEstoque from "../../Services/useEstoque";
import useImpressoes from "../../Services/useImpressoes";

export default function FiltrosImpressoes({ navigation, props }) {
    const filtrosUsado = useImpressoes((state) => state.filtrosUsado);
    const setMostraFiltros = useImpressoes((state) => state.setMostraFiltros);

    const materiais = useCatalogo((state) => state.materiais);
    const consultaFiltros = useCatalogo((state) => state.consultaFiltros);

    const setRecarregando = useImpressoes((state) => state.setRecarregando);

    const categorias = useCatalogo((state) => state.categorias);
    const consultaCatalogo = useCatalogo((state) => state.consultaCatalogo);

    const consultaImpressoes = useImpressoes((state) => state.consultaImpressoes);


    const [filtros, mostraFiltros] = useState(null);

    useEffect(() => {
        if (consultaFiltros) {
            consultaFiltros();
        }
    }, [consultaFiltros]);


    useEffect(() => {
        if (consultaCatalogo) {
            consultaCatalogo();
        }
    }, [consultaFiltros]);


    const recarrega = async (var1, var2, var3) => {
        if(var1 == 'Todas'){
            var1 = null
        };

        if(var2 == 'Todos'){
            var2 = null
        };

        if(var3 == 'Todos'){
            var3 = null
        }
        setRecarregando(true)
        consultaImpressoes(var1, var2, var3);
    }

    const statusList = [
        { "nome": "Todos" },
        { "nome": "Pendente" },
        { "nome": "Em andamento" },
        { "nome": "Concluida" },
        { "nome": "Cancelada" },
        { "nome": "Falhada" },
    ]


    return <>
        {
            filtrosUsado ?
                <>
                    <View style={styles.fundo}>
                        <View style={styles.categorias}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (filtros === categorias) {
                                        mostraFiltros(null)
                                    } else {
                                        mostraFiltros(categorias)
                                    }
                                }}
                            >
                                <Text style={styles.opcaoCategoria}>Categoria</Text>
                            </TouchableOpacity>



                            {
                                filtros === categorias ?
                                    <FlatList
                                        style={styles.flatList}
                                        data={categorias}
                                        keyExtractor={(item) => String(item.id)}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.botaoOpcao}
                                                onPress={() => {
                                                    recarrega(item.nome, null, null)
                                                    setMostraFiltros();
                                                }}
                                            >
                                                <Text style={styles.textoOpcao}>{item.nome}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                    :
                                    null

                            }


                            <TouchableOpacity
                                onPress={() => {
                                    if (filtros === materiais) {
                                        mostraFiltros(null)
                                    } else {
                                        mostraFiltros(materiais)
                                    }
                                }}
                            >
                                <Text style={styles.opcaoCategoria}>Material</Text>
                            </TouchableOpacity>



                            {
                                filtros === materiais ?
                                    <FlatList
                                        style={styles.flatList}
                                        data={materiais}
                                        keyExtractor={(item) => String(item.id)}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.botaoOpcao}
                                                onPress={() => {
                                                    recarrega(null, item.nome, null)
                                                    setMostraFiltros();
                                                }}
                                            >
                                                <Text style={styles.textoOpcao}>{item.nome}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                    :
                                    null

                            }



                            <TouchableOpacity
                                onPress={() => {
                                    if (filtros === statusList) {
                                        mostraFiltros(null)
                                    } else {
                                        mostraFiltros('statusList')
                                    }
                                }}
                            >
                                <Text style={styles.opcaoCategoria}>Status</Text>
                            </TouchableOpacity>



                            {
                                filtros === 'statusList' ?
                                    <FlatList
                                        style={styles.flatList}
                                        data={statusList}
                                        keyExtractor={(item) => String(item.nome)}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.botaoOpcao}
                                                onPress={() => {
                                                    recarrega(null, null, item.nome)
                                                    setMostraFiltros();
                                                }}
                                            >
                                                <Text style={styles.textoOpcao}>{item.nome}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                    :
                                    null

                            }

                            <TouchableOpacity
                                onPress={() => {
                                    mostraFiltros(null)
                                    setMostraFiltros()
                                }}
                            >
                                <Text style={styles.fechar}>Fechar</Text>
                            </TouchableOpacity>




                        </View>
                    </View>
                </>
                :
                null
        }


    </>
}