import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BottomNavigation from './BottomNavigation';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn bài thực hành</Text>
      <View style={styles.content}>

      </View>
      

      <BottomNavigation />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
