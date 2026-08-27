import React, { useState, useEffect } from "react";


import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";


import styles from "./styles";

import Toast from 'react-native-toast-message'



import autenticacao from "../../Services/autenticacao";


export default function AcessoInterno({ navigation }) {
   const [email, setEmail] = useState("");
   const [senha, setSenha] = useState("");


   const login = autenticacao((state) => state.login)
   const autenticado = autenticacao((state) => state.autenticado);


   const handleLogin = async (email, senha) => {
       if (!login) {
           console.log("Login não foi carregado")
           return;


       }
       if (!email, !senha) {
           console.log("Parâmetros inválidos")
           return;


       }
       const loga = await login(email, senha);
       
       if(loga){
        return true;
       }
       
   }



   const mostraPop = async (email, senha) => {
       const mostra = await handleLogin(email, senha);
   
       if (mostra) {
         Toast.show({
           type: "success",
           text1: "Login realizado com sucesso!",
           visibilityTime: 3000
         })
         setEmail("");
         setSenha("");
         navigation.navigate('BackDoor')
   
       } else{
        Toast.show({
            type: "error",
            text1: "Email ou senha inválidos!",
            visibilityTime: 3000
          })
          setEmail("");
          setSenha("");
       }
   
   
     }




   useEffect(() => {
       console.log(autenticado)
       if (autenticado === null) {
           return;
       }
       if (autenticado === false) {
           return;
       }
       if (autenticado === true) {
           navigation.navigate('BackDoor');
       }
   }, [autenticado])












   return <>
       <View style={styles.fundo}>
           <View>
               <Text style={styles.saudacao}>Acesso Interno</Text>
           </View>


           <View
               style={styles.inputs}
           >
               <TextInput
                   value={email}
                   onChangeText={setEmail}
                   placeholder="email"
                   style={styles.input}
               />


               <TextInput
                   value={senha}
                   onChangeText={setSenha}
                   secureTextEntry={true}
                   placeholder="senha"
                   style={styles.input}
               />




           </View>


           <View>
               <TouchableOpacity
                   onPress={() => {
                       mostraPop(email, senha)
                   }}


                   style={styles.botao}
               >
                   <Text style={styles.textoBotao}>Entrar</Text>
               </TouchableOpacity>
           </View>


       </View>


   </>
}
