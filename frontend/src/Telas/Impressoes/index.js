import React, { useState, useEffect } from "react";


import Toast from 'react-native-toast-message';


import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, FlatList } from "react-native";


import styles from "./styles";


import trashcan from '../../../assets/trashcan.png'

import ReportaFalha from "../../Reutilizaveis/ReportaFalha";

import autenticacao from "../../Services/autenticacao";
import useUsuarios from "../../Services/useUsuarios";


import user from '../../../assets/user.png'


import BotaoMenu from "../../Reutilizaveis/BotaoMenu";
import Menu from "../../Reutilizaveis/Menu";
import AvisoDelete from "../../Reutilizaveis/AvisoDelete";



import Filtros from '../../Reutilizaveis/Filtros';


import BotaoFiltro from '../../Reutilizaveis/BotaoFiltro';


import navegacaoMenu from "../../Services/navegacaoMenu";

import ConcluiImpressao from "../../Reutilizaveis/ConcluiImpressao";


import useImpressoes from "../../Services/useImpressoes";
import useMaquinas from "../../Services/useMaquinas";
import useEstoque from "../../Services/useEstoque";
import AdicionaImpressao from "../../Reutilizaveis/AdicionaImpressao";
import useConfiguracoes from "../../Services/useConfiguracoes";
export default function Impressoes({ navigation }) {


 const setMostraAdicionar = useImpressoes((state) => state.setMostraAdicionar);
 const setMostraDeletar = useImpressoes((state) => state.setMostraDeletar);
 const impressoes = useImpressoes((state) => state.impressoes);
 const consultaImpressoes = useImpressoes((state) => state.consultaImpressoes);
 const setaId = useImpressoes((state) => state.setaId);
 const setMostraConcluir = useImpressoes((state) => state.setMostraConcluir);

 const setMostraFalha = useImpressoes((state) => state.setMostraFalha);
 


 const mostraMenu = navegacaoMenu((state) => state.mostraMenu);
 const iniciaMenu = navegacaoMenu((state) => state.iniciaMenu);




 useEffect(() => {
   if (iniciaMenu) {
     iniciaMenu();
   }
 }, [iniciaMenu]);




 useEffect(() => {
   consultaImpressoes();
 }, [consultaImpressoes]);














 return <>
   <BotaoMenu />
   <Menu
     navigation={navigation}
   />
   <BotaoFiltro/>
   <Filtros/>
   <AvisoDelete/>
   <AdicionaImpressao/>
   <ConcluiImpressao/>
   <ReportaFalha/>
   <View style={styles.cabecalho}>
     <View style={styles.textos}>
       <Text style={styles.titulo}>Impressões 3D</Text>
       <Text style={styles.chamada}>Controle de solicitacoes, custos e status das impressoes.</Text>
     </View>


   </View>




   <FlatList
     data={impressoes}
     keyExtractor={(item) => String(item.id)}
     ListHeaderComponent={() => <>
     <TouchableOpacity
     style={styles.botaoAdicionar}
     onPress={() => {
       setMostraAdicionar();
     }}
     >
       <Text style={styles.textoAdicionar}>NOVA IMPRESSÃO</Text>
     </TouchableOpacity>
     </>}
     ListFooterComponent={() => <>
       <View style={{ height: 500, width: 100 }}>


       </View>
     </>}
     renderItem={({ item }) => <>
       <View style={styles.item}>
         <View style={styles.topo}>
           <View style={styles.cima}>
             <Text style={styles.nomeImpressao}>{item.nome_impressao}</Text>
             <Text style={styles.statusImpressao}>{item.status}</Text>
           </View>


           <Text style={styles.criadorImpressao}>por {item.usuario_nome}</Text>


         </View>


         <View style={styles.conteudo}>
           <View style={styles.informacoes}>
             <Text style={styles.informacao}>{item.categoria}</Text>
             <Text style={styles.informacao}>{item.material}</Text>
             <Text style={styles.informacao}>1 cor(es)</Text>
             <Text style={[
               item.aprovacao_status ?
                 item.aprovacao_status == 'APROVADO' ?
                   [styles.informacao, { color: 'green', borderColor: 'green' }]
                   :
                   item.aprovacao_status == 'REJEITADO' ?
                     [styles.informacao, { color: 'red', borderColor: 'red' }]
                     :
                     styles.informacao
                 :
                 { display: 'none' }]
             }>
               {[item.aprovacao_status || null]}</Text>
           </View>




           <View style={styles.containerDetalhe}>


             <View style={styles.detalhes}>
               <View style={styles.detalhe}>
                 <Text style={styles.informacaoDetalhe}>Gramas</Text>
                 <Text style={styles.principalDetalhe}>{item.gramas}g</Text>
                 <Text style={styles.informacaoDetalhe}>{item.material}</Text>
               </View>


               <View style={styles.detalhe}>
                 <Text style={styles.informacaoDetalhe}>Tempo</Text>
                 <Text style={styles.principalDetalhe}>{item.tempo_impressao}</Text>
               </View>
             </View>




             <View style={styles.detalhes}>
               <View style={styles.detalhe}>
                 <Text style={styles.informacaoDetalhe}>Maquina</Text>
                 <Text style={styles.principalDetalhe}>{item.maquina}</Text>
               </View>


               <View style={styles.detalhe}>
                 <Text style={styles.informacaoDetalhe}>Valor Final</Text>
                 <Text style={styles.principalDetalhe}>{item.valor_final}</Text>
               </View>
             </View>




             <View style={styles.detalhes}>
               <View style={styles.detalhe}>
                 <Text style={styles.informacaoDetalhe}>Criado por</Text>
                 <Text style={styles.principalDetalhe}>{item.usuario_nome}</Text>
               </View>


               <View style={styles.detalhe}>
                 <Text style={styles.informacaoDetalhe}>Comprador</Text>
                 <Text style={styles.principalDetalhe}>{[item.comprador || "A ver"]} </Text>
               </View>
             </View>










           </View>




         </View>


         <View style={styles.footer}>
           <View style={styles.containerCaixas}>
             <View style={styles.caixa}>
               <Text style={styles.textoCaixa}>STL</Text>
             </View>


             <View style={styles.caixa}>
               <Text style={styles.textoCaixa}>FOTOS E VÍDEOS</Text>
             </View>
           </View>


           <View style={styles.acoes}>
             <TouchableOpacity style={styles.botaoConcluir}
             onPress={() => {
              setMostraConcluir();
              setaId(item.id)
             }}
             >
               <Text style={styles.textoBotaoConcluir}>CONCLUIR</Text>
             </TouchableOpacity>


             <TouchableOpacity style={styles.botaoRegistrarFalha}
             onPress={() => {
              setMostraFalha();
             }}
             >
               <Text style={styles.textoBotaoRegistrarFalha}>REGISTRAR FALHA</Text>
             </TouchableOpacity>


             <TouchableOpacity style={styles.botaoLixeira}
             onPress={() => {
              setMostraDeletar();
              setaId(item.id)
             }}
             >
               <Image
               source={trashcan}
               style={styles.lixeira}
               />
             </TouchableOpacity>


           </View>




         </View>


       </View>
     </>}
   />
 </>
}
