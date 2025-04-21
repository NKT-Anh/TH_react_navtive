import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Project1 = () => {
    const printHelloWorld = () =>{
        Alert.alert("Thống báo","hello world")
    }

  return (
    <View style={styles.container}>
    <View style={styles.button}>
      <TouchableOpacity 
      style={styles.button}
      onPress={()=> printHelloWorld()}
      >
        <Text style={{justifyContent:'center',fontSize:20}}>Hello world </Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default Project1

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',

    },
    button:{
        backgroundColor:'aqua',
        justifyContent:'center',
        alignItems:'center',
        width:200,
        height:100,
        borderRadius:20,

    }
    
})