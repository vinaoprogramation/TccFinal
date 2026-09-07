import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  item: {
    flex: 1
  },
  imagemImpressao: {
    width: '100%',
    height: 550,
    borderRadius: 15,
  },
  textos: {},
  nomeImpressao: {
    fontSize: 23,
    marginTop: 20,
    fontWeight: '600',
    marginLeft: 20
  },
  usuario: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: -20,
    elevation: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 5
  },
  imagemUsuario: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  nomeUsuario: {
    fontSize: 14
  },
  detalhes: {
    padding: 20
  },
  conteudo: {
    padding: 10
  },
  materiais: {
    flexDirection: 'row',
    gap: 10
  },
  materiaisItem: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  seta: {
    position: 'absolute',
    width: 30,
    height: 30
  },
  botaoStl: {
    backgroundColor: "rgb(73, 171, 216)",
    width: width * 0.6,
    padding: 20,
    alignSelf: 'center',
    marginBottom: 100,
    borderRadius: 20,
    elevation: 5
  },
  textoStl: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18
  }
});

export default styles;