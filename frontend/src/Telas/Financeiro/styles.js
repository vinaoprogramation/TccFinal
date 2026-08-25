import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
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
 cabecalhoFlatlist:{
  padding: 10,
  marginVertical: 5
 },
 tituloFlatlist:{
  fontWeight: '900',
  fontSize: 20
 },
 descricaoFlatlist:{
  color: '#464545',

 },
 item:{
  padding: 20,
  backgroundColor: '#ff000023',
  borderBottomWidth: 0.3
  
 },
 flatlist:{
  backgroundColor: '#ebebeb',
  width: width*0.9,
  alignSelf: 'center',
  marginVertical: 10,
  borderRadius: 20,
  elevation: 5,
  padding: 10
 },
 topoTabela:{
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: 5
 },
 itemTabela:{
  fontSize: 12,
  fontWeight: 'bold'
 }


});

export default styles;

