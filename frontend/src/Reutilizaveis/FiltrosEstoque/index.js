import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";

import styles from "./styles";

import useCatalogo from "../../Services/useCatalogo";
import useEstoque from "../../Services/useEstoque";

export default function FiltrosEstoque({ navigation, props }) {
  const filtrosUsado = useEstoque((state) => state.filtrosUsado);
  const setMostraFiltros = useEstoque((state) => state.setMostraFiltros);
  
  const materiais = useCatalogo((state) => state.materiais);
  const consultaFiltros = useCatalogo((state) => state.consultaFiltros);

  const setRecarregando = useEstoque((state) => state.setRecarregando);
  const consultaEstoque = useEstoque((state) => state.consultaEstoque);


  const [filtros, mostraFiltros] = useState(null);

  useEffect(() => {
    if (consultaFiltros) {
      consultaFiltros();
    }
  }, [consultaFiltros]);


  const recarrega = async (var1) => {
    setRecarregando(true)

    consultaEstoque(var1);
  }


  return <>
    {
      filtrosUsado ?
        <>
          <View style={styles.fundo}>
            <View style={styles.categorias}>
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
                          recarrega(item.nome)
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