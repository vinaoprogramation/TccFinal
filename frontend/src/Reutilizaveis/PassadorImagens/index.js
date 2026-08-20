import React, { useEffect } from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import home from '../../../assets/home-button.png'

export default function PassadorImagens({navigation, props}){
    const imagens = props;

    useEffect(() => {
        console.log(imagens)
    })

  return <>
 
  </>
}