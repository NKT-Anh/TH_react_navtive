import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'

const Project7 = () => {
    const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What is your name?</Text>

      <TextInput 
        sttyle={styles.input}
        placeholder='Nhập tên'
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <Button 
        title='Say Hello'
        onPress={() => {alert(`Hello, ${name}!`);
        setName("");
        }} 
      />

    </View>
  )
}

export default Project7

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
        justifyContent:'center'
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        marginTop:10,
        backgroundColor:"rgba(0, 0, 0,0.1)",
        padding:10,
        borderRadius:5,
    },
});