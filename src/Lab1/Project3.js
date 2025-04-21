import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      backgroundColor: 'red',
      alignSelf: 'center',
      padding: 10,
      margin: 10,
      width:100,
      ...props.buttonStyle,
    }}
  >
    <Text style={{ fontSize: 16, fontWeight: '500' }}>
      {props.text}
    </Text>
  </TouchableOpacity>
)

const Project3 = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        text="say hello"
        onPress={() => alert('hello!')}
      />

      <Button
        text="say goodbye"
        onPress={() => alert('goodbye!')}
        buttonStyle={{ backgroundColor: '#4dc2c2' }}
      />
    </View>
  )
}

export default Project3

const styles = StyleSheet.create({})
