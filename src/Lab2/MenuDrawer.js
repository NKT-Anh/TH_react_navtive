import React, { useState, useEffect } from 'react';
import { Modal, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Mảng menu
const menu = [
  { id: 1, name: 'Contacts', icon: 'address-book' },
  { id: 2, name: 'Favorites', icon: 'star' },
  { id: 3, name: 'Profile', icon: 'user' },
];

const MenuDrawer = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(300)); 
  const [activeItem, setActiveItem] = useState('Contacts');

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 300, 
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleItem = (item) => {
    setActiveItem(item.name); 
    navigation.navigate(item.name);
    onClose(); 
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <Animated.View style={[styles.menu, { transform: [{ translateX: animation }] }]}>
          {menu.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                activeItem === item.name && styles.activeItem,
              ]}
              onPress={() => handleItem(item)}
            >
              <Icon name={item.icon} size={24} color={activeItem === item.name ? 'blue' : 'black'} />
              <Text
                style={[
                  styles.menuText,
                  activeItem === item.name && styles.activeText, 
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MenuDrawer;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-start',
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 250,
    backgroundColor: 'white',
    padding: 20,
    height: '100%',
    borderLeftWidth: 1,
    borderColor: '#ccc',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'black', 
  },
  activeItem: {
    backgroundColor: '#e0f7fa',
  },
  activeText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});
