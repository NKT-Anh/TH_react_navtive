import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactsScreen from './Screens/ContactsScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import ProfileScreen from './Screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const MenuDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerActiveTintColor: 'blue', // Màu sắc khi item được chọn
        drawerInactiveTintColor: 'gray', // Màu sắc khi item không được chọn
        drawerLabelStyle: {
          fontWeight: route.name === 'Contacts' ? 'bold' : 'normal', // Đậm khi chọn
        },
        drawerIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Contacts') {
            iconName = 'address-book';
          } else if (route.name === 'Favorites') {
            iconName = 'star';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Drawer.Screen name="Contacts" component={ContactsScreen} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <MenuDrawer />
    </NavigationContainer>
  );
};

export default App;
