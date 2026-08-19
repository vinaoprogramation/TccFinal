import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  fundo:{
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  saudacao:{
    fontSize: 20
  }
});

export default styles;

