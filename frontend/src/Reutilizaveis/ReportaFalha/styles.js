import { StyleSheet, Dimensions, FlatList } from "react-native";


const {width, height} = Dimensions.get('screen');


const styles = StyleSheet.create({
 fundo:{
   width: width,
   height: height,
   backgroundColor: '#0000007c',
   position: 'absolute',
   zIndex: 5,
   justifyContent: 'center',
   padding: 100
 },
 container:{
   backgroundColor: '#f5f5f5',
   alignSelf: 'center',
   zIndex:6,
   width: width*0.8,
   borderRadius: 15
 },
 inputs:{
   padding: 20,
   gap: 15
 },
 input:{
   borderWidth: 0.5,
   padding: 20,
   borderRadius: 20,
   color: '#929292'
 },
 titulo:{
   padding: 20,
   fontSize: 20
 },
 filamento:{
   backgroundColor: '#ffffff',
   padding: 15,
   borderRadius: 15
 },
 tituloFilamento:{
   fontWeight: '900',
   fontSize: 18
 },
 descricaoFilamento:{
   color: '#777777'
 },
 inputsFilamento:{
   marginTop: 10
 },
 adicionarFilamento:{
   borderWidth: 0.7,
   backgroundColor: 'rgb(255, 255, 255)',
   borderColor:'rgb(41, 135, 223)',
   width: '95%',
   alignSelf: 'center',
   padding: 10,
   borderRadius: 15
 },
 textoAdicionarFilamento:{
   color: 'rgb(41, 135, 223)',
   fontSize: 16,
   textAlign: 'center'
 },
 opcoes:{
   gap: 30,
   marginTop: 20
 },
 textoObs:{
   marginTop: -25,
   marginLeft: 10,
   fontSize: 12,
   color: '#9c9c9c'
 },
 incremento:{
   marginTop: -10,
   marginLeft: 10,
   fontSize: 12,
   color: '#9c9c9c'
 },
 decisoes:{
   flexDirection: 'row',
   justifyContent: 'flex-end'
 },
 botaoDecisaoCancelar:{
   backgroundColor: 'rgba(255, 255, 255, 0)',
   color: 'rgb(41, 135, 223)',
   padding: 10
 },
 textoDecisaoCancelar:{
   color: 'rgb(41, 135, 223)',
 },
 botaoDecisaoSalvar:{
   backgroundColor: 'rgb(41, 135, 223)',
   paddingVertical: 10,
   paddingHorizontal: 20,
   borderRadius: 15
 },
 textoDecisaoSalvar:{
   color: '#ffffff',
   fontWeight: '500'
 },
 itens:{
   padding: 20,


 },
 flatList:{
   backgroundColor: '#ffffff',
   elevation: 5,
   borderRadius: 15,
   marginTop: -10
 },
 textoFlat:{
   padding: 20,
   color: '#979797'
 },
 




});


export default styles;
