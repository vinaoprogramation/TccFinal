import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  fundo:{
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flex: 1
  },
  saudacao:{
    fontSize: 20,
    marginTop: 200
  },
  inputs:{
    width:width*0.95,
    elevation: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 20,
    gap: 20
  },
  input:{
    backgroundColor: 'rgb(223, 223, 223)',
    borderRadius: 10,
    paddingVertical: 20,
    elevation: 5
  },
  botao:{
    marginTop: 20,
    backgroundColor: 'rgb(179, 179, 179)',
    width: width*0.5,
    padding: 20,
    borderRadius: 15,
    elevation: 5
  },
  textoBotao:{
    textAlign: 'center',
    fontWeight: '600'
  }
});

export default styles;

