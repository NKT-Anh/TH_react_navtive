import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootNavigation from './src/RootNavigation';
import BottomNavigation from './src/BottomNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <RootNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'space-between', 
  },
});
