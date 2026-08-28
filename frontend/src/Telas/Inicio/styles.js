
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  fundo:{
    backgroundColor: 'rgb(41, 135, 223)',
    alignItems: 'center',
    flex: 1
  },
  saudacao:{
    fontSize: 20,
    marginTop: 300,
    color: '#ffffff',
    fontSize: 20,
    padding: 20,
    fontWeight: '500'
  },
  botoes:{
    gap: 10,
    marginTop: 50
  },
  botao:{
    borderRadius: 10,
    backgroundColor: 'rgb(222, 246, 255)',
    elevation: 5,
    paddingVertical: 10,
    width: width*0.9
    
  },
  textoBotao:{
    fontSize: 16,
    textAlign: 'center'
  },
  sheilong:{
    width: 500,
    height: 500,
    position: 'absolute',
    top: -120,
    borderRadius: 1000,
  },
  logo:{
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: 'center',
    top: 550,
    elevation: 5
  }
});

export default styles;

