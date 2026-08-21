
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    imagem:{
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    fundo:{
        backgroundColor: 'white',
        position: 'absolute',
        right: 10,
        top: 200,
        zIndex: 5,
        borderRadius: 100
    },
    imagem2:{
        width: 50,
        height: 50,
        borderRadius: 100
    },
    fundo2:{
        backgroundColor: 'white',
        position: 'absolute',
        left: 10,
        top: 200,
        zIndex: 5,
        borderRadius: 100,
        transform: [{rotate: '180deg'}]
    },
    fundoTotal:{
        width: width,
        height: height,
        backgroundColor: '#fffcfcbe',
        position: 'absolute',
        zIndex: 3
    },
    foto:{
        width: width,
        height: 500,
        zIndex: 5,
        alignSelf: 'center'
    },
    containerFoto:{
        alignSelf: 'center',
        verticalAlign: 'middle'

    },
    container:{
        position: 'relative',
        zIndex: -1
    }

});

export default styles;

