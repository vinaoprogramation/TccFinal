import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, ActivityIndicator, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import useCatalogo from '../../Services/useCatalogo';

import BotaoVoltar from '../../Reutilizaveis/BotaoVoltar';
import PassadorImagens from '../../Reutilizaveis/PassadorImagens';
import arrow from '../../../assets/arrow.png'

export default function DetailScreen({ navigation, route }) {
    const item = route.params;
    const consultaProjeto = useCatalogo((state) => state.consultaProjeto);
    const projetoIndividual = useCatalogo((state) => state.projetoIndividual);

    const [fotos, setFotos] = useState([]);
    const [contador, setContador] = useState(0);

    useEffect(async() => {
        if(consultaProjeto){
            console.log(item.id)
            await consultaProjeto(item.id);
            setFotos(projetoIndividual?.fotos)
        }
    }, [consultaProjeto])



    return <>
        
        <ScrollView style={styles.item}>
        
            <View >
            <BotaoVoltar
            navigation={navigation}
            />

            <PassadorImagens
                navigation={navigation}
                props={fotos}
            />

                <TouchableOpacity>
                    <Image
                        source={{ uri: item.thumbnailUrl }}
                        style={styles.imagemImpressao}
                        resizeMode='contain'
                    />
                </TouchableOpacity>


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

                   <View style={styles.detalhes}>
                        <View style={styles.conteudo}>
                            <View style={styles.materiais}>
                                <Text style={styles.materiaisItem}>{item.categoria}</Text>
                                <Text style={styles.materiaisItem}>{item.material}</Text>
                                <Text style={styles.materiaisItem}>{item.cor_filamento}</Text>
                            </View>

                            <View style={styles.detalhes}>
                                <Text>Data: {item.data}</Text>
                                <Text>Peso: {item.gramas}g</Text>
                                <Text>Tempo: {item.tempo_impressao}</Text>
                                <Text>{item.comprador ? (item.comprador) : <Text>Não há comprador</Text>}</Text>
                                <Text>Valor Final: {item.valor_final}R$</Text>
                            </View>
                        </View>







                    </View>



                </View>


            </View>
        </ScrollView>
    </>
}
