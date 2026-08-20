import React, { useEffect, useState } from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import arrow from '../../../assets/arrow.png'

import passarTela from "../../Services/passarTela";

export default function PassadorImagens({navigation, props}){
  const numeroInicial = props[0];
  const fotos = props[1];
  const mostra = passarTela((state) => state.mostra);

  const setMostra = passarTela((state) => state.setMostra);
  const [contador, setContador] = useState(numeroInicial);
  const [contadorFotos, setContadorFotos] = useState(0);



  return <>
  {mostra === true? 

    <>
      <Image
      source={{uri: fotos[contadorFotos]}}
      style={styles.foto}
      />

      {contador > numeroInicial ? (<TouchableOpacity
        style={styles.fundo2}
        onPress={() => {
          setContador(contador - 1)
          setContadorFotos(contadorFotos - 1)
        }}
      >
        <Image
          source={arrow}
          style={styles.imagem2}
        />
      </TouchableOpacity>) : null}

      {contador < fotos.length + numeroInicial ? (<TouchableOpacity
        onPress={() => {
          setContador(contador + 1)
          setContadorFotos(contadorFotos + 1)
        }}
        style={styles.fundo}
      >
        <Image
          source={arrow}
          style={styles.imagem}
        />
      </TouchableOpacity>) : null}

      <TouchableOpacity style={styles.fundoTotal}
        onPress={() => {
          setMostra();
        }}
      />
    </> : (null)}

  
    
  </>
}