
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container:{
    width: width,
    height: height,
    backgroundColor: '#00000049',
    position: 'absolute',
    zIndex: 5
  },
  menu:{
    backgroundColor: 'rgb(41, 135, 223)',
    width: width*0.75,
    height: height,
    position: 'absolute',
    elevation: 5
  },
  botaoVoltar:{
    position: 'absolute',
    zIndex: 6,
    right: 0,
    backgroundColor: '#ffffff00',
    height: height,
    justifyContent: 'center',
     width: 90,
  },
  cabecalho:{
    padding: 20,
    borderBottomWidth: 0.5,
    height: height*0.1,
    justifyContent: 'center',
    elevation: 5,
    backgroundColor: 'rgb(41, 135, 223)',
    borderRadius: 2
  },
  textoCabecalho:{
    color: '#ffffff',
    verticalAlign: 'middle',
    fontWeight: '900',
    fontSize: 20
  },
  itens:{
    padding: 20,
    gap: 20
  },
  item:{
    padding: 20,
    flexDirection: 'row',
    gap: 30,
    backgroundColor: '#ffffff00',
    borderBottomWidth: 0.5,
    borderColor: '#0000002c'
  },
  textoItem:{
    color: '#ffffff',
    verticalAlign: 'middle',
    fontWeight: '300'
  },
  imagemItem:{
    width: 50,
    height: 50
  }

 
});

export default styles;

