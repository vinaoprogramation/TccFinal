import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList, TextInputComponent } from "react-native";


import styles from "./styles";


import Toast from 'react-native-toast-message'

import useEstoque from "../../Services/useEstoque";
export default function AdicionaEstoque({ navigation }) {
  const adicionaEstoque = useEstoque((state) => state.adicionaEstoque);
  const consultaEstoque = useEstoque((state) => state.consultaEstoque);
  const mostraAdicionar = useEstoque((state) => state.mostraAdicionar);
  const materiais = useEstoque((state) => state.materiais);
  const setMostraAdicionar = useEstoque((state) => state.setMostraAdicionar);


  const [cor, setCor] = useState('');
  const [pesoInicial, setPesoInicial] = useState('');
  const [entrada, setEntrada] = useState('');
  const [saida, setSaida] = useState('');
  const [material, setMaterial] = useState('');
  const [materiaisMostra, setMateriaisMostra] = useState(false)

  const mostraPop = async (material, cor, pesoInicial, entrada, saida) => {
    const mostra = await adicionaEstoque(material, cor, pesoInicial, entrada, saida, new Date(Date.Now).toLocaleDateString('pt-BR').split(',')[0]);

    if (mostra) {
      Toast.show({
        type: "success",
        text1: "Estoque adicionado com sucesso!",
        visibilityTime: 3000
      })
      setCor("");
      setMaterial("");
      setPesoInicial("");
      setSaida("")


      consultaEstoque()
      setMostraAdicionar();

    }


  }

  useEffect(() => {
    consultaEstoque();
  }, [consultaEstoque])

  useEffect(() => {
    console.log(material)
  }, [material])



  return <>
    {
      mostraAdicionar ?
        <>
          <TouchableOpacity style={styles.fundo} activeOpacity={1}>
            <TouchableOpacity style={styles.container} activeOpacity={1}>
              <ScrollView>
                <Text style={styles.titulo}>Nova Impressão</Text>


                <View style={styles.inputs}>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                      setMateriaisMostra(!materiaisMostra)
                    }}
                  >
                    <Text>
                      {material != "" ? material : "Material*"}
                    </Text>


                  </TouchableOpacity>

                  {materiaisMostra ?
                    <>
                      <FlatList
                        style={styles.flatList}
                        data={materiais}
                        scrollEnabled={false}
                        keyExtractor={(item) => String(item.material)}
                        ListHeaderComponent={() => <>
                          <Text style={styles.textoFlat}>Selecione um material</Text>
                        </>}
                        renderItem={({ item }) => <>


                          <TouchableOpacity style={styles.itens}
                            onPress={() => {
                              setMaterial(item.material)
                              setMateriaisMostra(false)
                            }}
                          >
                            <Text style={styles.textoInput}>{item.material}</Text>
                          </TouchableOpacity>


                        </>}
                      />
                    </>
                    :
                    null
                  }


                  <TextInput
                    value={cor}
                    onChangeText={setCor}
                    placeholder="Cor*"
                    style={styles.input}
                  />

                  <TextInput
                    value={pesoInicial}
                    onChangeText={setPesoInicial}
                    placeholder="Peso Inicial"
                    style={styles.input}
                  />

                  <TextInput
                    value={entrada}
                    onChangeText={setEntrada}
                    placeholder="Entrada*"
                    style={styles.input}
                  />

                  <TextInput
                    value={saida}
                    onChangeText={setSaida}
                    placeholder="Saida*"
                    style={styles.input}
                  />
                </View>


                <View style={styles.decisoes}>
                  <TouchableOpacity style={styles.botaoDecisaoCancelar}
                    onPress={() => {
                      setMateriaisMostra();
                      setCor("");
                      setMaterial("");
                      setPesoInicial("");
                      setSaida("")


                      setMostraAdicionar();
                    }
                    }
                  >
                    <Text style={styles.textoDecisaoCancelar}>CANCELAR</Text>
                  </TouchableOpacity>


                  <TouchableOpacity style={styles.botaoDecisaoSalvar}
                    onPress={() => {

                      mostraPop(material, cor, pesoInicial, entrada, saida)
                    }}


                  >
                    <Text style={styles.textoDecisaoSalvar}>SALVAR</Text>
                  </TouchableOpacity>


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


