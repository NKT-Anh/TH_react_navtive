import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import NavigationLab2 from './NavigationLab2'

const LoadScreen = () => {
  return (
    <NavigationContainer>
      <NavigationLab2/>
    </NavigationContainer>

  )
}

export default LoadScreen

const styles = StyleSheet.create({})