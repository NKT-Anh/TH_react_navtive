import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Project4 = () => {
    const [count,setCount] = useState(0);
  return (
    
    <View style={{alignItems:'center',justifyContent:'center'}}>
      <Text>Ấn button để tăng: {count} time(s)</Text>
      <Button title={`ấn ${count} time(s)` }
      onPress={()=> setCount(count+1)}
      
      />
    </View>
  )
}

export default Project4

const styles = StyleSheet.create({})