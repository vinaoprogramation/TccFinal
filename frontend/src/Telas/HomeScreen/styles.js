import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    loader: {
        marginTop: 50,
        transform: [{scale: 3}]
    },
    item:{
      width: width*0.8,
      alignSelf: 'center',
      marginVertical: 20,
      backgroundColor: '#ffffff',
      elevation: 5,
      borderRadius: 10,
    },
    flatList:{
        gap: 5,
        flexDirection: 'column'
    },
    imagemImpressao:{
        width: '100%',
        height: 300,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textos:{
        padding: 20,
        
    },
    nomeImpressao:{
        fontSize: 21,
        marginTop: 10,
        fontWeight: '600'
    },
    usuario:{
        flexDirection: 'row',
        gap: 10,
        verticalAlign: 'middle',
        marginTop: -10

    },
    imagemUsuario:{
        width: 40,
        height: 40,
        borderRadius: 100
    },
    nomeUsuario:{
        verticalAlign: 'middle',
        fontSize: 14
    },
    detalhes:{
        marginTop: 10
    },
    conteudo:{
        padding: 10
    },
    botaoEntrar:{
        backgroundColor: 'rgb(41, 135, 223)',
        width: width*0.4,
        borderRadius: 15,
        alignSelf: 'center',
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
        elevation: 5
    },
    textoBotaoEntrar:{
        textAlign: 'center',
        color: "#ffffff",
        fontWeight: '600'
    },
    carregando:{
        textAlign: 'center',
        fontSize: 16,
        marginTop: 170
    },
    cabecalho:{
        backgroundColor: 'rgb(41, 135, 223)',
        height: 300,
        padding: 30
    },
    saudacao:{
        fontSize: 22,
        color: '#ffffff',
        marginTop: 50
    },
    app:{
        fontSize: 40,
        color: '#ffffff',
        fontWeight: 'bold',
        top: 10
    }
});

export default styles;

