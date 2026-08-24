import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  fundo:{
    flex: 1,
    backgroundColor: '#ffffff',
    
  },
  item:{
    backgroundColor: '#f8f8f8',
    padding: 30,
    borderRadius: 20,
    elevation: 5,
    width: width*0.95,
    alignSelf: 'center',
  },
  conteudo:{
    marginTop: 20,
    gap: 10,
    marginBottom: 50
  },
  legenda:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  quantidade:{
    fontWeight: '900',
    fontSize: 35
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
  containerInformacoes:{
    flexDirection: 'row',
    gap: 20,
    marginTop: 10
  },
  informacoes:{
    color: '#7c7c7c'
  },
  containerDetalhes:{
    flexDirection: 'row',
    gap: '10%',
    marginVertical: 20,
    flexWrap: 'wrap',
  },
  inputObservacao:{
    borderWidth: 0.5,
    borderRadius: 15,
    height: 70,
    textAlign: 'left',
    verticalAlign: 'top',
    padding: 10
  },
  botao:{
    paddingVertical: 15,
    elevation: 2,
    borderRadius: 20,
    paddingHorizontal: 40
  },
  botoes:{
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textoBotao:{
    fontWeight: 'bold',
    fontSize: 10
  },
  textoBotaoAprovar:{
    color: '#ffffff',
    
  },
  textoBotaoNegar:{
    color: '#ff0000'
  },
  botaoAprovar:{
    backgroundColor: '#4b9b00'
  },
  botaoNegar:{
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#ff0000'
  }
});

export default styles;

