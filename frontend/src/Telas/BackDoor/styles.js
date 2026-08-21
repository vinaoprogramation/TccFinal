import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    cabecalho:{
        backgroundColor: 'rgb(41, 135, 223)',
        height: 240,
        padding: 40,
        elevation: 5,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

    },
    saudacao:{
        fontSize: 18,
        color: '#ffffff'
    },
    subTitulo:{
        fontSize: 16,
        padding: 18,
        marginTop: 10,
        color: '#ffffff'
    },
    nome:{
        fontSize: 18,
        color: '#ffffff'
    },
    matricula:{
        fontSize:  14,
        marginTop: 5,
        padding: 10,
        color: '#ffffff'
    },
    descricao:{
        fontSize: 14,
        width: width* 0.6,
        color: '#ffffff'
    }

});

export default styles;

