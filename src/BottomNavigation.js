import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const menu = [
  { project: 'Project1', name: 'Bài 1' },
  { project: 'Project3', name: 'Bài 3' },
  { project: 'Project4', name: 'Bài 4' },
  { project: 'Project5', name: 'Bài 5' },
  { project: 'Project6', name: 'Bài 6' },
  { project: 'Project7', name: 'Bài 7' },
  { project: 'Project8', name: 'Bài 8' },
];

const BottomNavigation = () => {
  const [activeProject, setActiveProject] = useState('Project1');
  const navigation = useNavigation();

  const handlePress = (item) => {
    setActiveProject(item.project);
    navigation.navigate(item.project);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.project}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => {
          const isActive = item.project === activeProject;
          return (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              style={[
                styles.menuItem,
                isActive && styles.menuItemActive,
              ]}
            >
              <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0, 
  },
  menuItem: {
    marginHorizontal: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  menuItemActive: {
    backgroundColor: '#4dc2c2',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  menuTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
