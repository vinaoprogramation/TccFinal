import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";

import styles from "./styles";

import useFinanceiro from "../../Services/useFinanceiro";
import useCatalogo from "../../Services/useCatalogo";

export default function FiltrosFinanceiro({ navigation, props }) {
  const filtrosUsado = useFinanceiro((state) => state.filtrosUsado);
  const setFiltros = useFinanceiro((state) => state.setFiltros);
  const setMostraFiltros = useFinanceiro((state) => state.setMostraFiltros);

  const consultaFiltros = useCatalogo((state) => state.consultaFiltros);
  const categorias = useCatalogo((state) => state.categorias);

  const setRecarregando = useFinanceiro((state) => state.setRecarregando);

  const consultaFinanceiro = useFinanceiro((state) => state.consultaFinanceiro);


  const [filtros, mostraFiltros] = useState(null);

  useEffect(() => {
    if (consultaFiltros) {
      consultaFiltros();
    }
  }, [consultaFiltros]);

  const pagamentos = [
    {
      "nome": "Todos"
    },
    {
      "nome": "Dinheiro"
    },
    {
      "nome": "Pix"
    },
    {
      "nome": "Cartão"
    },
    {
      "nome": "Transferência"
    },
    {
      "nome": "Outro"
    }
  ];




  const recarrega = async (var1, var2) => {
    console.log(var1, var2)
    setRecarregando(true)
    consultaFinanceiro(var1, var2);
  }


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
                          recarrega(item.nome, null)
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
                  if (filtros === pagamentos) {
                    mostraFiltros(null)
                  } else {
                    mostraFiltros('pagamentos')
                  }

                  console.log("filtros: " + pagamentos[1].nome)
                }}
              >
                <Text style={styles.opcaoCategoria}>Pagamentos</Text>
              </TouchableOpacity>

              {
                filtros === 'pagamentos' ?
                  <FlatList
                    style={styles.flatList}
                    data={pagamentos}
                    keyExtractor={(item) => String(item.nome)}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.botaoOpcao}
                        onPress={() => {
                          recarrega(null, item.nome)
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