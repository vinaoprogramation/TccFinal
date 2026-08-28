
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    fundo:{
        position: 'absolute',
        zIndex: 3,
        elevation: 5,
        left: 10,
        top: 200,
        borderRadius: 100
    },
    imagem:{
        width: 60,
        height: 60,
    }
});

export default styles;

