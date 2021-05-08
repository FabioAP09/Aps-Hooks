import React, {useState, useEffect,useMemo,useRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, StyleSheet, TextInput,Image, TouchableHighlight} from 'react-native';


export default function AppView(){

  const [quantidade, setQuantidade]= useState(0);
  const fim = useRef(null);

  useEffect(()=>{
    async function getStorage(){
      const quantidadeStorage= await  AsyncStorage.getItem('quantidades');
      if(quantidadeStorage){
        setQuantidade(Number(quantidadeStorage));
      }
    }
    getStorage();
  }, []);
  
  useEffect(()=>{
    async function saveStorage(){
      await AsyncStorage.setItem('quantidades', quantidade);
    }
    saveStorage();
  }, [quantidade]);


  function focusFim(){
    fim.current.focus();
  }

  
  return(
    <View style={styles.container}>
      <View style={styles.list}>
        <Image style={styles.produto}
          source={{uri:'https://http2.mlstatic.com/D_NQ_NP_861793-MLB44951045021_022021-O.webp'}}

      />
      <View style={styles.informacao}>
        <Text style={styles.texto}>Fone De Ouvido C/ Microfone Multilaser Headphone Fun Laranja</Text>
        <Text>Quantidade:<Text style={styles.texto}>{quantidade}</Text></Text>

      <View style={styles.quantidadeProduto}>
        <TextInput
            style={styles.input}
            placeholder='Quantidade'
            value={quantidade}
        />

        <TouchableHighlight style={styles.aumentarQuantidade}
          onPress={()=> setQuantidade(quantidade +1 )}
        >
          <Text style={styles.adicionar}>+</Text>
        </TouchableHighlight>

      </View>
      </View>
      </View>
      <View style={styles.button}>
        <TouchableHighlight style={styles.finalizar}
          onPress={focusFim}
        >
          <Text style={styles.textoFinalizar}>FINALIZAR</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.realizar}
         ref={fim}
        >
          <Text style={styles.textoRealizar}>REALIZAR PEDIDO!</Text>
        </TouchableHighlight>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin:40,
    alignItems:'center'
  },
  list:{
    flexDirection:'row',
    width:400,
    height:300,
    borderRadius:8,
    borderWidth:2
  },
  produto:{
    width:200,
    height:200,
    borderRadius:4,
    marginTop:20
  },
  informacao:{
    flexDirection:'column',
    width:150,
    margin:15
  }, 
  texto:{
    fontWeight:'bold', 
  }, 
  quantidadeProduto:{
    display:'flex',
    flexDirection:'row',
    marginTop:10
  },
  input:{
    borderRadius:4,
    borderWidth:1,
    width:60, 
    height:30,
    padding:5
  }, 
  aumentarQuantidade:{
    backgroundColor:'#99D178',
    width:30,
    marginLeft:10,
    borderRadius:15
  }, 
  adicionar:{
    color:'#ffff',
    fontWeight:'bold',
    fontSize:18,
    textAlign:'center'
  }, 
  button:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20
  }, 
  finalizar:{
    justifyContent: 'center',
    backgroundColor: '#99D178',
    width: 150,
    height: 30,
    borderRadius: 4,
    borderColor: '#000000',
    borderWidth: 1
  }, 
  textoFinalizar:{
    fontSize:12,
    color:'#fff', 
    fontWeight:'bold', 
    textAlign:'center'
  }, 
  realizar:{
    justifyContent: 'center',
    backgroundColor: '#99D178',
    width: 150,
    height: 30,
    borderRadius: 8,
    marginTop: 400,
    alignItems: 'center'
  },
  textoRealizar:{
    fontSize:12,
    color:'#fff', 
    fontWeight:'bold', 
    textAlign:'center'
  }
});