
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    fundo:{
        position: 'absolute',
        zIndex: 5,
        elevation: 5
    },
    imagem:{
        width: 60,
        height: 60,
        left: 10,
        top: 200,
        
    }
});

export default styles;

