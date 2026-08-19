
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  fundo:{
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flex: 1
  },
  saudacao:{
    fontSize: 20
  },
  botoes:{
    gap: 5
  },
  botao:{
    borderRadius: 10,
    backgroundColor: '#ffffff81',
    elevation: 5,
    paddingVertical: 10,
    width: width*0.7
    
  },
  textoBotao:{
    fontSize: 16,
    textAlign: 'center'
  }
});

export default styles;

