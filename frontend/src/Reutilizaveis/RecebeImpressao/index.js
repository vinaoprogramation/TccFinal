import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, ScrollView, TextInput, FlatList, TextInputComponent } from "react-native";


import styles from "./styles";


import Toast from 'react-native-toast-message'

import useFinanceiro from "../../Services/useFinanceiro";
export default function RecebeImpressao({ navigation }) {
  const recebeImpressao = useFinanceiro((state) => state.recebeImpressao);
  const consultaPendentes = useFinanceiro((state) => state.consultaPendentes);
  const mostraReceber = useFinanceiro((state) => state.mostraReceber);
  const setMostraReceber = useFinanceiro((state) => state.setMostraReceber);
  const pendencia = useFinanceiro((state) => state.pendencia);

  const [comprador, setComprador] = useState("");
  const [valorRecebido, setValorRecebido] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [observacao, setObervacao] = useState("");
  const [opcao, setOpcao] = useState("");
  const [mostraOpcao, setMostraOpcao] = useState("");



  const mostraPop = async (impressaoId, comprador, valorRecebido, formaPagamento, observacoes, dataVencimento) => {
    const mostra = await recebeImpressao(impressaoId, comprador, valorRecebido, formaPagamento, observacoes, dataVencimento, new Date(Date.Now).toLocaleDateString('pt-BR').split(',')[0]);

    if (mostra) {
      Toast.show({
        type: "success",
        text1: "Recebimento realizado com sucesso!",
        visibilityTime: 3000
      })

      setComprador("");
      setValorRecebido("");
      setFormaPagamento("");
      setObervacao("");



      consultaPendentes();
      setMostraReceber();

    }


  }

  return <>
    {
      mostraReceber && pendencia ?
        <>
          <TouchableOpacity style={styles.fundo} activeOpacity={1}>
            <TouchableOpacity style={styles.container} activeOpacity={1}>
              <ScrollView>
                <Text style={styles.titulo}>Receber</Text>


                <View style={styles.inputs}>
                  <Text style={styles.tituloImpressao}>{pendencia.nome_impressao}</Text>

                  <TextInput
                    value={comprador}
                    onChangeText={setComprador}
                    placeholder="Comprador*"
                    style={styles.input}
                  />

                  <TextInput
                    value={valorRecebido}
                    onChangeText={setValorRecebido}
                    placeholder="Valor recebido"
                    style={styles.input}
                  />

                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                      setMostraOpcao(!mostraOpcao)
                    }}
                  >
                    <Text>{opcao ? opcao : "Forma de Pagamento"}</Text>

                  </TouchableOpacity>

                  {mostraOpcao ?
                    <>
                      <View style={styles.pagamentos}>
                        <TouchableOpacity style={styles.itens}
                          onPress={() => {
                            setMostraOpcao()
                            setOpcao("Dinheiro")
                          }}
                        >
                          <Text style={styles.textoMaquinas}>Dinheiro</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itens}
                          onPress={() => {
                            setMostraOpcao()
                            setOpcao("Pix")
                          }}
                        >
                          <Text style={styles.textoMaquinas}>Pix</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itens}
                          onPress={() => {
                            setMostraOpcao()
                            setOpcao("Cartão")
                          }}
                        >
                          <Text style={styles.textoMaquinas}>Cartão</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itens}
                          onPress={() => {
                            setMostraOpcao()
                            setOpcao("Transferência")
                          }}
                        >
                          <Text style={styles.textoMaquinas}>Transferência</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.itens}
                          onPress={() => {
                            setMostraOpcao()
                            setOpcao("Outro")
                          }}
                        >
                          <Text style={styles.textoMaquinas}>Outro</Text>
                        </TouchableOpacity>
                      </View>

                    </>
                    :
                    null
                  }





                  <TextInput
                    value={observacao}
                    onChangeText={setObervacao}
                    placeholder="Observação"
                    style={styles.input}
                  />


                  <View style={styles.decisoes}>
                    <TouchableOpacity style={styles.botaoDecisaoCancelar}
                      onPress={() => {
                        setComprador("");
                        setValorRecebido("");
                        setFormaPagamento("");
                        setObervacao("");




                        setMostraReceber();
                      }
                      }
                    >
                      <Text style={styles.textoDecisaoCancelar}>CANCELAR</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.botaoDecisaoSalvar}
                      onPress={() => {

                        mostraPop(pendencia.impressao_id, comprador, valorRecebido, formaPagamento, observacao, new Date(pendencia.data_vencimento).toLocaleDateString('pt-BR').split(',')[0])
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


