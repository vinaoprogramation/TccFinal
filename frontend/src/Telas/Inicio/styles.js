
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
    marginTop: 200,
    color: '#ffffff',
    fontSize: 20,
    padding: 20
  },
  botoes:{
    gap: 10,
    marginTop: 20
  },
  botao:{
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 5,
    paddingVertical: 10,
    width: width*0.9
    
  },
  textoBotao:{
    fontSize: 16,
    textAlign: 'center'
  },
  sheilong:{
    width: width*0.7,
    height: 500,
    position: 'absolute',
    top: 320
  }
});

export default styles;

