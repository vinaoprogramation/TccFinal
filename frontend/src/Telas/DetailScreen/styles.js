
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({

    item: {

        flex: 1
    },
    imagemImpressao: {
        width: '100%',
        height: 550,
        borderRadius: 15,
    },
    textos: {

    },
    nomeImpressao: {
        fontSize: 23,
        marginTop: 20,
        fontWeight: '600',
        marginLeft: 20
    },
    usuario: {
        flexDirection: 'row',
        gap: 10,
        verticalAlign: 'middle',
        marginTop: -20,
        elevation: 5,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 5

    },
    imagemUsuario: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    nomeUsuario: {
        verticalAlign: 'middle',
        fontSize: 14
    },
    detalhes: {
        
        padding: 20
    },
    conteudo: {
        padding: 10
    },
    materiais:{
        flexDirection: 'row',
        gap: 10
    },  

    materiaisItem:{
        backgroundColor: '#fffff',
        borderWidth: 1,
        borderRadius: 15,
        padding: 5,
        fontSize: 14,
        textAlign: 'center',
    }

});

export default styles;

