import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    cabecalho:{
        backgroundColor: 'rgb(235, 235, 235)',
        height: 240,
        padding: 40,
        elevation: 5,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,

    },
    saudacao:{
        fontSize: 18,
    },
    subTitulo:{
        fontSize: 16,
        padding: 18,
        marginTop: 10
    },
    nome:{
        fontSize: 18
    },
    matricula:{
        fontSize:  14,
        marginTop: 5,
        padding: 10
    },
    descricao:{
        fontSize: 14,
        width: width* 0.6
    }

});

export default styles;

