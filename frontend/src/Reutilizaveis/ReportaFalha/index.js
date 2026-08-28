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

    const maquinas = useMaquinas((state) => state.maquinas);
    const consultaMaquinas = useMaquinas((state) => state.consultaMaquinas);


    const consultaOpcoes = useConfiguracoes((state) => state.consultaOpcoes);
    const materiais = useConfiguracoes((state) => state.materiais);
    const categorias = useConfiguracoes((state) => state.categorias);


    const estoque = useEstoque((state) => state.estoque);
    const consultaEstoque = useEstoque((state) => state.consultaEstoque);

    const [porcentagem, setPorcentagem] = useState("");
    const [observacao, setObservacao] = useState("");
    const [gramasPerdidas, setGramasPerdidas] = useState("");

    const [materialMostra, setMaterialMostra] = useState(false);
    const [materialValor, setMaterialValor] = useState("");

    const [corMostra, setCorMostra] = useState(false);
    const [corValor, setCorValor] = useState("");

    const [tempo, setTempo] = useState("");





    useEffect(() => {
        consultaMaquinas();
    }, [consultaMaquinas]);


    useEffect(() => {
        consultaOpcoes();
    }, [consultaOpcoes]);


    useEffect(() => {
        consultaEstoque();
    }, [consultaEstoque]);




    useEffect(() => {
        console.log(maquinasValor)
    }, [maquinasValor])


    useEffect(() => {
    }, [])




    const mostraPop = async (nome, categoria, tempo, maquina, material, cor, gramas, objetivo, comprador) => {
        const mostra = await cadastra(nome, categoria, tempo, maquina, material, cor, gramas, objetivo, comprador);


        if (mostra) {
            Toast.show({
                type: "success",
                text1: "Impressão cadastrada com sucesso!",
                visibilityTime: 3000
            })
            setCategoriasMostra(false);
            setCategoriasValor("");


            setEstoqueMostra(false);
            setEstoqueValor("");


            setMaquinasMostra(false);
            setMaquinasValor("");


            setMateriaisMostra(false);
            setMateriaisValor("");

            setObjetivo("");
            setComprador("")


            setNome("");
            setTempo("");
            setGramas("");


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

                        setMostraAdicionar();
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
                                {categoriasMostra ?
                                    <>
                                        <FlatList
                                            style={styles.flatList}
                                            data={categorias}
                                            scrollEnabled={false}
                                            keyExtractor={(item) => String(item.id)}
                                            ListHeaderComponent={() => <>
                                                <Text style={styles.textoFlat}>Selecione uma categoria</Text>
                                            </>}
                                            renderItem={({ item }) => <>


                                                <TouchableOpacity style={styles.itens}
                                                    onPress={() => {
                                                        setMaterialValor(item.nome)
                                                        setMaterialMostra(false)
                                                    }}
                                                >
                                                    <Text style={styles.textoMaquinas}>{item.nome}</Text>
                                                </TouchableOpacity>


                                            </>}
                                        />
                                    </>
                                    :
                                    null
                                }


                                <TouchableOpacity style={styles.filamento}
                                    activeOpacity={1}
                                >
                                    <View style={styles.cabecalhoFilamento}>
                                        <Text style={styles.tituloFilamento}>Filamentos Perdido
                                        </Text>
                                        <Text style={styles.descricaoFilamento}>Adicione as cores que foram realmente usadas antes da falha.</Text>
                                    </View>


                                    <View style={styles.inputsFilamento}>

                                        <View style={styles.opcoes}>
                                            <TouchableOpacity
                                                style={styles.input}
                                                onPress={() => {
                                                    setMateriaisMostra(!C)
                                                }}
                                            >
                                                <Text>
                                                    {materiaisValor != "" ? materiaisValor : "Selecione um material*"}
                                                </Text>
                                            </TouchableOpacity>
                                            {materiaisMostra ?
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
                                                                    setMateriaisValor(item.nome)
                                                                    setMateriaisMostra(false)
                                                                    setEstoqueValor("")
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




                                            <TouchableOpacity
                                                style={styles.input}
                                                onPress={() => {
                                                    setEstoqueMostra(!estoqueMostra)
                                                }}
                                            >
                                                <Text>
                                                    {estoqueValor != "" ? estoqueValor : "Selecione uma cor*"}
                                                </Text>
                                            </TouchableOpacity>
                                            {materiaisValor != "" ?
                                                <>
                                                    {estoqueMostra ?
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
                                                                    {materiaisValor ?
                                                                        <>


                                                                            {item.material == materiaisValor ? <>
                                                                                <TouchableOpacity style={[styles.itens, { flexDirection: 'row', gap: 10, flexWrap: 'wrap' }]}
                                                                                    onPress={() => {
                                                                                        setEstoqueValor(item.cor)
                                                                                        setEstoqueMostra(false)
                                                                                    }}


                                                                                >
                                                                                    <Text style={styles.textoMaquinas}>{item.material == materiaisValor ? item.cor : null}</Text>
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


                                            <Text style={styles.textoObs}>As cores vêm do estoque</Text>




                                            <TextInput
                                                style={styles.input}
                                                placeholder="Gramas Previstas*"
                                                value={gramas}
                                                onChangeText={setGramas}
                                            />

                                        </View>


                                    </View>

                                </TouchableOpacity>


                                <TextInput
                                    value={tempo}
                                    onChangeText={setTempo}
                                    placeholder="Tempo de Impressão*"
                                    style={styles.input}
                                />


                                {
                                    categoriasValor == 'Pessoal' ?
                                        <>
                                            <TextInput
                                                value={objetivo}
                                                onChangeText={setObjetivo}
                                                placeholder="Objetivo*"
                                                style={styles.input}
                                            />

                                        </>
                                        :
                                        null
                                }


                                {
                                    categoriasValor == 'Venda' ?
                                        <>
                                            <TextInput
                                                value={comprador}
                                                onChangeText={setComprador}
                                                placeholder="Comprador*"
                                                style={styles.input}
                                            />

                                        </>
                                        :
                                        null
                                }



                                <TouchableOpacity
                                    style={styles.input}
                                    onPress={() => {
                                        setMaquinasMostra(!maquinasMostra)
                                    }}
                                >
                                    <Text>
                                        {maquinasValor != "" ? `Reni-0${maquinasValor}` : "Selecione uma máquina*"}
                                    </Text>
                                </TouchableOpacity>


                                {maquinasMostra ?
                                    <FlatList
                                        style={styles.flatList}
                                        data={maquinas}
                                        scrollEnabled={false}
                                        keyExtractor={(item) => String(item.id)}
                                        ListHeaderComponent={() => <>
                                            <Text style={styles.textoFlat}>Selecione uma máquina</Text>
                                        </>}
                                        renderItem={({ item }) => <>


                                            <TouchableOpacity style={styles.itens}
                                                onPress={() => {
                                                    setMaquinasValor(item.id);
                                                    setMaquinasMostra(false);
                                                }}
                                            >
                                                <Text style={styles.textoMaquinas}>{item.nome}</Text>
                                            </TouchableOpacity>


                                        </>}
                                    />
                                    :
                                    null
                                }


                                <Text style={styles.incremento}>Apenas máquinas ativas aparecem aqui</Text>


                                <View style={styles.filamento}>
                                    <Text style={styles.descricaoFilamento}>Prévia do valor</Text>
                                    <View>
                                        <Text style={styles.tituloFilamento}>Calculado: </Text>
                                        <Text style={styles.tituloFilamento}>Final: </Text>
                                    </View>
                                </View>




                                <View style={styles.decisoes}>
                                    <TouchableOpacity style={styles.botaoDecisaoCancelar}
                                        onPress={() => {
                                            setCategoriasMostra(false);
                                            setCategoriasValor("");


                                            setEstoqueMostra(false);
                                            setEstoqueValor("");


                                            setMaquinasMostra(false);
                                            setMaquinasValor("");


                                            setMateriaisMostra(false);
                                            setMateriaisValor("");

                                            setObjetivo("");
                                            setComprador("")



                                            setNome("");
                                            setTempo("");
                                            setGramas("");


                                            setMostraAdicionar();
                                        }
                                        }
                                    >
                                        <Text style={styles.textoDecisaoCancelar}>CANCELAR</Text>
                                    </TouchableOpacity>


                                    <TouchableOpacity style={styles.botaoDecisaoSalvar}
                                        onPress={() => {
                                            console.log(nome, categoriasValor, tempo, maquinasValor, materiaisValor, estoqueValor, gramas)
                                            mostraPop(nome, categoriasValor, tempo, maquinasValor, materiaisValor, estoqueValor, gramas, objetivo, comprador)
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
