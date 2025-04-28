import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MenuDrawer from './MenuDrawer'; // Drawer của bạn
import Profile from './Screen/Profile';
import Favorites from './Screen/Favorites';
import Contacts from './Screen/Contacts';
import ContactDetail from './Screen/ContactDetail';
import Options from './Screen/Options';

const Stack = createNativeStackNavigator();

const NavigationLab2 = () => {
  const [showMenu, setShowMenu] = useState(false);
  
  // Function để mở Drawer
  const HeaderRight = () => {
    return (
      <TouchableOpacity onPress={() => setShowMenu(true)}>
        <Ionicons name="settings-outline" size={24} color="black" style={{ marginRight: 10 }} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Navigator 
        initialRouteName='Contacts'
        screenOptions={{ 
          headerRight: () => <HeaderRight /> // Thêm icon settings ở header
        }}
      >
        <Stack.Screen name='Profile' component={Profile} options={{ title: 'Me' }} />
        <Stack.Screen name='Favorites' component={Favorites} />
        <Stack.Screen name='ContactDetail' component={ContactDetail} />
        <Stack.Screen name='Contacts' component={Contacts} options={{ title: 'Trang cá nhân', headerBackVisible: false }} />
        <Stack.Screen name='Options' component={Options} options={{ title: 'Options' }} />
      </Stack.Navigator>

      {/* Hiển thị MenuDrawer khi cần */}
      <MenuDrawer visible={showMenu} onClose={() => setShowMenu(false)} />
    </>
  );
};

export default NavigationLab2;

const styles = StyleSheet.create({});
