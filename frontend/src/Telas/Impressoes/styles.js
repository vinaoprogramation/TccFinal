import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');


const styles = StyleSheet.create({
 fundo: {
   flex: 1,
   backgroundColor: '#ffffff',
 },
 botaoAdicionar:{
   backgroundColor: 'rgb(41, 135, 223)',
   marginVertical: 10,
   width: width*0.8,
   borderRadius: 20,
   padding: 10,
   alignSelf: 'center'
 },
 textoAdicionar:{
   color: '#ffffff',
   textAlign: 'center',
   fontWeight: '700',
   elevation: 5
 },
 item: {
   backgroundColor: '#ebebeb',
   padding: 20,
   borderRadius: 20,
   elevation: 5,
   width: width * 0.95,
   alignSelf: 'center',
   marginVertical: 8,
 },
 titulo: {
   fontWeight: '600',
   fontSize: 30,
   color: '#ffffff'
 },
 chamada: {
   color: '#e7e7e7',
   marginTop: 20
 },
 cabecalho: {
   paddingTop: 100,
   paddingHorizontal: 20,
   paddingBottom: 50,
   backgroundColor: 'rgb(41, 135, 223)',
   borderRadius: 10
 },
 topo: {},
 nomeImpressao: {
   fontSize: 20,
   fontWeight: '900'
 },
 criadorImpressao: {
   fontSize: 16,
   color: '#535353',
   fontWeight: '300'
 },
 cima: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   flexWrap: 'wrap',
   marginBottom: 10
 },
 statusImpressao: {
   position: 'relative',
   right: 0,
   backgroundColor: '#e7e7e7',
   borderRadius: 20,
   padding: 10,
   elevation: 3
 },
 informacoes: {
   flexDirection: 'row',
   gap: 10,
   flexWrap: 'wrap',
   marginTop: 10
 },
 informacao: {
   borderWidth: 0.8,
   borderRadius: 20,
   padding: 5
 },
 containerDetalhe: {
   marginTop: 10
 },
 detalhes: {
   flexDirection: 'row',
   gap: 20,
   flexWrap: 'wrap',
   justifyContent: 'space-between'
 },
 detalhe: {
   marginVertical: 5,
   width: '45%'
 },
 principalDetalhe: {
   fontWeight: 'bold',
   fontSize: 16
 },
 informacaoDetalhe: {
   color: '#646464',
   marginVertical: 2
 },
 footer:{
   marginTop: 10,
 },
 containerCaixas:{
   gap: 10
 },
 caixa:{
   padding: 20,
   backgroundColor: '#ffffff',
   borderRadius: 15
 },
 textoCaixa:{
   color: '#757575'
 },
 acoes:{
   flexDirection: 'row',
   gap: 20,
   marginTop: 10
 },
 botaoConcluir:{
   padding: 10,
   borderRadius: 20,
   backgroundColor: '#3aa0ff',
   elevation: 5,
 },
 textoBotaoConcluir:{
   fontWeight: 'bold',
   color: '#ffffff'
 },
 botaoRegistrarFalha:{
   padding: 10,
   borderRadius: 20,
   backgroundColor: '#ffffff',
   borderWidth: 0.8,
   borderColor: 'red',
   elevation: 5,
 },
 textoBotaoRegistrarFalha:{
   color: 'red'
 },
 lixeira:{
   width: 20,
   height: 20,
   position: 'absolute'
 }
}
);


export default styles;
