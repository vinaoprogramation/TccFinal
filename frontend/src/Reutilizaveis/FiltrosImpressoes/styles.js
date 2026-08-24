
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    fundo:{
        backgroundColor: '#ffffff',
        borderRadius: 15,
        alignSelf: 'center',
        padding: 5,
        width:width*0.7,
        marginVertical: 10,
        elevation: 5,
        position: 'absolute',
        zIndex: 5,
        marginTop: 20
    },
    categorias:{
        padding: 10,
        backgroundColor: '#ffffff',
        gap: 20
    },
    opcaoCategoria:{
        borderBottomWidth: 0.5,
        padding: 20,
        backgroundColor: '#ffffff',
        elevation: 5,
        borderRadius: 10,
    },
    botaoOpcao:{
        elevation: 5,
        backgroundColor: '#ffffff',
        padding: 15,
        width: '70%',
        alignSelf: 'center',
        borderRadius: 10,
        marginVertical: 5
    },
    flatList:{
        gap: 10
    },
    textoOpcao:{
        textAlign: 'center' 
    },
    fechar:{
        backgroundColor: 'rgb(218, 67, 67)',
        borderBottomWidth: 0.5,
        paddingVertical: 20,
        elevation: 5,
        borderRadius: 10,
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 16,
        width: '80%',
        alignSelf: 'center',
        elevation: 5
    },

});

export default styles;

