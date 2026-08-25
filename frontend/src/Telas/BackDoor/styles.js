import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    fundo:{
        backgroundColor: 'rgb(41, 135, 223)',
        flex: 1
    },
    cabecalho:{
        backgroundColor: 'rgb(255, 255, 255)',
        padding: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

    },
    saudacao:{
        fontSize: 22,
        color: '#ffffff',
        fontWeight: '600',
        backgroundColor: 'rgb(32, 103, 170)',
        borderRadius: 20,
        padding: 10,
        width: 'fit-content',
        elevation: 5,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 30
    },
    fotoPerfil:{
        width: 150,
        height: 150,
        borderRadius: 100,
        position: 'relative',
        alignSelf: 'center',
        marginBottom: 0,
        marginTop: 20,

    },
    containerInput:{
        elevation: 5,
        backgroundColor: 'rgb(41, 135, 223)',
        zIndex: 0,
        borderRadius: 10
    },
    input:{
        color: '#ffffff',
        borderRadius: 10,
        padding: 15,
        
    },
    subTitulo:{
        fontSize: 16,
        padding: 10,
        marginTop: 10,
        color: '#ffffff',
        gap: 20,
        
    },
    matricula:{
        color: '#cacaca'
    },
    botao:{
        width: width*0.4,
        backgroundColor: '#004db3',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
        marginVertical: 20
    },
    textoBotao:{
        textAlign: 'center',
        color: '#ffffff'
    },
    descricao:{
        color: '#8d8d8d',
        padding: 20,
        lineHeight: 25,
        fontSize: 18,
        fontWeight: '500'
    }

});

export default styles;

