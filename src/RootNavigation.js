import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'

import Project1 from './Lab1/Project1';
import Project3 from './Lab1/Project3'; 
import Project4 from './Lab1/Project4';
import Project5 from './Lab1/Project5';
import Project6 from './Lab1/Project6';
import Project7 from './Lab1/Project7';
import Project8 from './Lab1/Project8';
import Home from './Home';
const Stack = createNativeStackNavigator();
console.log("Rendering RootNavigation");
const RootNavigation = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Project1" component={Project1} />
            <Stack.Screen name="Project3" component={Project3} />
            <Stack.Screen name="Project4" component={Project4} />
            <Stack.Screen name="Project5" component={Project5} />
            <Stack.Screen name="Project6" component={Project6} />
            <Stack.Screen name="Project7" component={Project7} />
            <Stack.Screen name="Project8" component={Project8} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}

export default RootNavigation

const styles = StyleSheet.create({})