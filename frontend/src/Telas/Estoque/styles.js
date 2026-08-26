import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  fundo:{
    flex: 1,
    backgroundColor: '#ffffff',
  },
  conteudo:{
    marginTop: 20,
    gap: 10,
    marginBottom: 50
  },
  legenda:{
    fontSize: 18
  },
  titulo:{
    fontWeight: '600',
    fontSize: 30,
    color: '#ffffff'
  },
  chamada:{
    color: '#e7e7e7',
    marginTop: 20
  },
  cabecalho:{
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: 'rgb(41, 135, 223)',
    borderRadius: 10
  },
  dashboard:{
    backgroundColor: '#f8f8f8',
    padding: 30,
    borderRadius: 20,
    elevation: 5,
    width: width*0.95,
    alignSelf: 'center',
    marginVertical: 5
  },
  conteudo:{
    marginTop: 20,
    gap: 10,
    marginBottom: 50
  },
  legenda:{
    fontSize: 18
  },
  quantidade:{
    fontWeight: '900',
    fontSize: 35
  },
  flatList:{
    backgroundColor: '#e6e6e6',
    width: width*0.95,
    alignSelf: 'center',
    borderRadius: 15,
    padding: 0,
    padding: 20,
    marginVertical: 10
  },
  divisoria:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  label: {
    fontWeight: 'bold'
  },
  principal:{
    fontSize: 18,
    padding: 5,
    verticalAlign: 'middle',

  },
  divisao:{
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  especificacao:{
    textAlign: 'center'
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
 lixeira:{
   width: 20,
   height: 20,
   position: 'absolute',
   verticalAlign: 'middle'
 },
 botaoLixeira:{
  verticalAlign: 'middle',
  marginTop: 10
 },
 botaoRolo:{
  alignSelf: 'flex-end',
  borderWidth: 1,
  borderColor: 'rgb(41, 135, 223)',
  paddingVertical: 5,
  paddingHorizontal: 15,
  borderRadius: 20
 },
 textoRolo:{
  color: 'rgb(41, 135, 223)',
  textAlign: 'center'
 }

});

export default styles;

