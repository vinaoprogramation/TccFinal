import React, { useState, useEffect } from "react";

import { Text, View, Image, TouchableOpacity, TextInput, FlatList } from "react-native";

import styles from "./styles";

import useCatalogo from "../../Services/useCatalogo";

export default function BackDoor({ navigation }) {
    const projetos = useCatalogo((state) => state.projetos);
    const consultaCatalogo = useCatalogo((state) => state.consultaCatalogo);

    useEffect(() => {
        if(consultaCatalogo){
            consultaCatalogo();
        }
    }, consultaCatalogo)


  return <>
    <View>
        <FlatList
        data={projetos}
        
        />
    </View>
  </>
}