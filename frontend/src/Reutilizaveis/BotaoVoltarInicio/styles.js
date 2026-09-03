
import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    fundo:{
        zIndex: 5,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 50,
    
        
    },
    imagem:{
        width: 60,
        height: 60,
        borderRadius: 100,
        position: 'relative',
        zIndex: 1,
        alignSelf:'center',
        marginHorizontal: 'auto',
        right: 0,
        left: 0,
        backgroundColor: 'black'
    }
});

export default styles;

