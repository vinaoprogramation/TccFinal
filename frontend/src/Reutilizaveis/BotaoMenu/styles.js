
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  fundo:{
    position: 'absolute',
    top: 30,
    left: 2,
    width: 60,
    height: 60,
    zIndex: 5
  },
  imagem:{
    width: 60,
    height: 60
  }
});

export default styles;

