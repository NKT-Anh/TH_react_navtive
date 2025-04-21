import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Project5 = () => {
  return (
    <View style={styles.container}>
      <Square text="Square"/>
      <Square text="Square" bgColor='red'/>
      <Square text="Square" bgColor='aqua'/>
    </View>
  )
}
const Square = ({text, bgColor= "#7ce0f9"}) =>(
    <View style={[styles.box,{backgroundColor:bgColor}]}>
        <Text>
            {text}
        </Text>
    </View>
);

export default Project5

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
    },
    box:{
        width:100,
        height:100,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
    }

})