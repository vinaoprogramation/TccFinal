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
    fontWeight: '600',
    marginBottom: 30
  },
  inputs:{
    width:width*0.95,
    elevation: 5,
    backgroundColor: '#00000010',
    borderRadius: 5,
    padding: 20,
    gap: 20
  },
  input:{
    backgroundColor: 'rgb(223, 223, 223)',
    borderRadius: 10,
    paddingVertical: 20,
    elevation: 5,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  botao:{
    marginTop: 20,
    backgroundColor: 'rgb(241, 148, 61)',
    width: width*0.5,
    padding: 20,
    borderRadius: 15,
    elevation: 5
  },
  textoBotao:{
    textAlign: 'center',
    fontWeight: '600',
    color: '#ffffff'
  }
});

export default styles;

