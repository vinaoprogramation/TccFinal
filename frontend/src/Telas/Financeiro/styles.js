import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

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
  cabecalhoFlatlist: {
    padding: 10,
    marginVertical: 5
  },
  tituloFlatlist: {
    fontWeight: '900',
    fontSize: 20
  },
  descricaoFlatlist: {
    color: '#464545',

  }, item: {
    padding: 20,
    backgroundColor: 'rgb(247, 185, 185)',
    borderBottomWidth: 0.3,
    borderRadius: 15,
    elevation: 2



  },
  flatlist: {
    backgroundColor: '#ebebeb',
    width: width * 0.9,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 20,
    elevation: 5,
    padding: 10,
  },
  topoTabela: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  itemTabela: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  nomePendente: {
    color: 'rgb(236, 37, 37)',
    fontWeight: '600'
  },
  coluna: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',

  },
  materiais: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10
  },
  sobre: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    backgroundColor: 'rgb(247, 185, 185)',
    elevation: 3
  },
  botaoReceber: {
    backgroundColor: 'rgb(40, 148, 211)',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 5,
    alignSelf: 'center',
    marginVertical: 5

  },
  textoBotaoReceber: {
    color: '#ffffff',
    fontWeight: '500',

  },
  containerBotao: {
    width: '100%'
  },
  separacao: {
    paddingHorizontal: 20,
    fontWeight: '600',
    padding: 20,
    fontSize: 30,
    color: '#ffffff',
    backgroundColor: 'rgb(41, 135, 223)',
    marginVertical: 10,
    elevation: 5,
    justifyContent: 'center'
  },
  tituloSeparacao: {
    fontWeight: '600',
    fontSize: 30,
    color: '#ffffff',
    verticalAlign: 'middle'
  },
  flatlistRecebimentos: {
    width: width,
    alignSelf: 'center',
    marginVertical: 10,
  },
  tituloFlatlistRecebimentos: {
    fontWeight: '900',
    fontSize: 20
  },
  itemRecebimentos: {
    padding: 20,
    borderBottomWidth: 0.3,
    borderRadius: 15,
    elevation: 2
  }



});

export default styles;

