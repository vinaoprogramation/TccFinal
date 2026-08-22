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
    alignSelf: 'center'
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
  }
});

export default styles;

