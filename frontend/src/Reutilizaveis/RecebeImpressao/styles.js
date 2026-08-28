import { StyleSheet, Dimensions, FlatList } from "react-native";


const {width, height} = Dimensions.get('screen');


const styles = StyleSheet.create({
  fundo:{ 
    width: width,
    height: height,
    position: 'absolute',
    zIndex: 5,
    backgroundColor: '#00000070',
    justifyContent: 'center'
  },
  container:{
    width:width*0.8,
    height: height*0.6,
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    alignSelf: 'center',
    padding: 20,
    boxSizing: 'border-box'
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
 textoInput:{
  padding: 10
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
 tituloImpressao:{
  fontSize: 20
 },
 itens:{
  backgroundColor: 'rgb(253, 253, 253)',
  padding: 10
 },
 pagamentos:{
  gap: 0,
  borderRadius: 5
 }

});


export default styles;
