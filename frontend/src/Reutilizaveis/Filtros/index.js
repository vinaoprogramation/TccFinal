import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";

import styles from "./styles";

import useCatalogo from "../../Services/useCatalogo";

import passarTela from "../../Services/passarTela";

export default function Filtros({ navigation, props }) {
    const filtroUsado = passarTela((state) => state.filtroUsado)
    const setFiltros = passarTela((state) => state.setFiltros)
    const alunos = useCatalogo((state) => state.alunos);
    const categorias = useCatalogo((state) => state.categorias);
    const materiais = useCatalogo((state) => state.materiais);
    const consultaCatalogo = useCatalogo((state) => state.consultaCatalogo);


    const [filtros, mostraFiltros] = useState(null)


    return <>
        {
            filtroUsado ? <>
                <View style={styles.fundo}>

                    <View style={styles.categorias}>
                        <TouchableOpacity
                            onPress={() => {
                                if (filtros === alunos) {
                                    mostraFiltros(null)
                                } else {
                                    mostraFiltros(alunos)
                                }

                            }}
                        >
                            <Text style={styles.opcaoCategoria}>Alunos</Text>
                        </TouchableOpacity>

                        {
                            filtros === alunos ?
                                <FlatList
                                    style={styles.flatList}
                                    data={alunos}
                                    keyExtractor={(item) => String(item.id)}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.botaoOpcao}
                                            onPress={() => {
                                                consultaCatalogo(null, null, null, item.id)
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
                                if (filtros === categorias) {
                                    mostraFiltros(null)
                                } else {
                                    mostraFiltros(categorias)
                                }
                            }}
                        >
                            <Text style={styles.opcaoCategoria}>Categorias</Text>
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
                                                consultaCatalogo(null, item.nome, null, null)
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
                            <Text style={styles.opcaoCategoria}>Materiais</Text>
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
                                                consultaCatalogo(null, null, item.nome, null)
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
                                setFiltros();
                            }}
                        >
                            <Text style={styles.fechar}>Fechar</Text>
                        </TouchableOpacity>




                    </View>
                </View>
            </>
                : null
        }
    </>
}