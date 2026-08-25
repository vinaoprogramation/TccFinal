import { StyleSheet, Dimensions, FlatList } from "react-native";


const {width, height} = Dimensions.get('screen');


const styles = StyleSheet.create({
  fundo:{ 
    width: width,
    height: height,
    position: 'absolute',
    zIndex: 5,
    backgroundColor: '#00000070',
    justifyContent: 'center'
  },
  container:{
    width:width*0.8,
    height: height*0.2,
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    alignSelf: 'center',
    padding: 20,
    boxSizing: 'border-box'
  },
  chamada:{
    fontSize: 18,
    verticalAlign: 'middle'
  },
  botoes:{
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-end',
    marginTop: 50
  },
  botao:{
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
  }

});


export default styles;
