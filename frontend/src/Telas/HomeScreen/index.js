import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, Image, Touchable, TouchableOpacity } from 'react-native';
import styles from './styles';
import useCatalogo from '../../Services/useCatalogo';

export default function HomeScreen({ navigation }) {
  const projetos = useCatalogo((state) => state.projetos);
  const consultaCatalogo = useCatalogo((state) => state.consultaCatalogo);
  const [carregando, setCarregando] = useState(true);
  const [detalhes, setDetalhes] = useState(false)
  const [detalhesId, setDetalhesId] = useState(null)

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      await consultaCatalogo();
      setCarregando(false);
    }
    carregarDados();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.carregando}>Carregando...</Text>
        <ActivityIndicator size="large" color="#00000" style={styles.loader} />
      </View>
    );
  }

  return (
    <View>



      <FlatList
        data={projetos}
        keyExtractor={(item) => String(item.id)}
        style={styles.flatList}
        ListHeaderComponent={() => (
          <View style={styles.cabecalho}>
            <Text style={styles.saudacao}>Olá, confira o nosso catálogo de impressões</Text>

            <Text style={styles.app}>Reni 3D App</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}
            onPress={() => {
              {
                {
                  detalhesId ? item.id != detalhesId ? (setDetalhesId(item.id)
                    , setDetalhes(true)) : (setDetalhesId(item.id)
                      , setDetalhes(!detalhes)) : (setDetalhesId(item.id)
                        , setDetalhes(!detalhes))
                }

              }
            }}
          >
            <View>
              <Image
                source={{ uri: item.thumbnailUrl }}
                style={styles.imagemImpressao}
              />
            </View>


            <View style={styles.textos}>

              <View
                style={styles.usuario}
              >
                <Image
                  source={{ uri: item.fotoPerfil }}
                  style={styles.imagemUsuario}
                />
                <Text style={styles.nomeUsuario}>{item.usuario_nome}</Text>
              </View>




              <Text style={styles.nomeImpressao}>{item.nome_impressao}</Text>

              {detalhes && item.id == detalhesId ? (<View style={styles.detalhes}>
                <View style={styles.conteudo}>
                  <View style={styles.materiais}>
                    <Text>Categoria: {item.categoria}</Text>
                    <Text>Material: {item.material}</Text>
                    <Text>Cor Filamento: {item.cor_filamento}</Text>
                  </View>

                  <View style={styles.detalhes}>
                    <Text>Data: {item.data}</Text>
                    <Text>Peso: {item.gramas}g</Text>
                    <Text>Tempo: {item.tempo_impressao}</Text>
                    <Text>{item.comprador ? (item.comprador) : <Text>Não há comprador</Text>}</Text>
                    <Text>Valor Final: {item.valor_final}R$</Text>
                  </View>
                </View>



                <TouchableOpacity style={styles.botaoEntrar}
                onPress={() => {
                  navigation.navigate('DetailScreen', item)
                }}
                >
                  <Text style={styles.textoBotaoEntrar}>Abrir Projeto</Text>
                </TouchableOpacity>



              </View>) : (null)}



            </View>


          </TouchableOpacity>


        )
        }
      />
    </View >
  );
}
