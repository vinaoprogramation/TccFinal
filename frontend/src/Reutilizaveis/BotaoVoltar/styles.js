
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    fundo:{
        zIndex: 5
    },
    imagem:{
        width: 60,
        height: 60,
        borderRadius: 100,
        position: 'absolute',
        zIndex: 1,
        marginTop: 100,
        marginLeft: 20
    }
});

export default styles;

