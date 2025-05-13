import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Home from '../Screen/Home';
import Services from '../Screen/Services';
import Servicedetail from '../Screen/Servicedetail';
import Login from '../Screen/Login';
import SignUp from '../Screen/SignUp';
import { Alert,TouchableOpacity } from 'react-native';
import { deleteService } from '../Firebase/FirebaseApi';
import Setting from '../Screen/Setting';
import EditService from '../Screen/EditService';
import Customer from '../Screen/Customer';
import Transaction from '../Screen/Transaction';
import CustomerList from '../Screen/CustomerList';
import CustomerServices from '../Screen/CustomerServices';
import CustomerAppointments from '../Screen/CustomerAppointments';
import CustomerProfile from '../Screen/CustomerProfile';
import BookAppointment from '../Screen/BookAppointment';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom Tab Navigator
const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Transaction') {
                        iconName = focused ? 'receipt' : 'receipt-outline';
                    } else if (route.name === 'CustomerList') {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === 'Setting') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#ef506b',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Transaction" component={Transaction} />
            <Tab.Screen name="CustomerList" component={CustomerList} />
            <Tab.Screen name="Setting" component={Setting} />
        </Tab.Navigator>
    );
};

// Stack Navigator
const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Customer" 
                    component={Customer} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="EditService" 
                    component={EditService} 
                    options={{ title:'Cập nhật dịch vụ', headerStyle: { backgroundColor: '#ef506b' }, headerTintColor: '#fff' }} 
                />
                <Stack.Screen 
                    name="SignUp" 
                    component={SignUp} 
                    options={{ title: false }} 
                />
                <Stack.Screen 
                    name="Main" 
                    component={BottomTabNavigator} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name="Servicedetail"
                    component={Servicedetail}
                    options={({ navigation, route }) => ({
                        title: 'Chi tiết dịch vụ',
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    const { serviceId } = route.params;
                                    Alert.alert(
                                        'Xác nhận xóa',
                                        'Bạn có chắc chắn muốn xóa dịch vụ này?',
                                        [
                                            { text: 'Hủy', style: 'cancel' },
                                            {
                                                text: 'Xóa',
                                                style: 'destructive',
                                                onPress: async () => {
                                                    try {
                                                        console.log('Service ID to delete:', serviceId);
                                                        await deleteService(serviceId);
                                                        Alert.alert('Thành công', 'Dịch vụ đã được xóa');
                                                        navigation.goBack();
                                                    } catch (error) {
                                                        console.error('Error deleting service:', error.message);
                                                        Alert.alert('Lỗi', 'Không thể xóa dịch vụ');
                                                    }
                                                }
                                            },
                                        ]
                                    );
                                }}
                                style={{ marginRight: 15 }}
                            >
                                <Ionicons name="ellipsis-vertical" size={24} color="#000" />
                            </TouchableOpacity>
                        ),
                    })}
                />
                
                <Stack.Screen 
                    name="Services" 
                    component={Services} 
                    options={{ title: 'Thêm dịch vụ' ,
                        headerStyle: {
                            backgroundColor: '#ef506b', 
                        },
                        headerTintColor: '#fff',
                    }} 
                />

                {/* Customer Screens */}
                <Stack.Screen 
                    name="CustomerServices" 
                    component={CustomerServices}
                    options={{ 
                        title: 'Dịch vụ',
                        headerStyle: { backgroundColor: '#ef506b' },
                        headerTintColor: '#fff'
                    }}
                />
                <Stack.Screen 
                    name="CustomerAppointments" 
                    component={CustomerAppointments}
                    options={{ 
                        title: 'Lịch hẹn',
                        headerStyle: { backgroundColor: '#ef506b' },
                        headerTintColor: '#fff'
                    }}
                />
                <Stack.Screen 
                    name="CustomerProfile" 
                    component={CustomerProfile}
                    options={{ 
                        title: 'Thông tin cá nhân',
                        headerStyle: { backgroundColor: '#ef506b' },
                        headerTintColor: '#fff'
                    }}
                />
                <Stack.Screen 
                    name="BookAppointment" 
                    component={BookAppointment}
                    options={{ 
                        title: 'Đặt lịch hẹn',
                        headerStyle: { backgroundColor: '#ef506b' },
                        headerTintColor: '#fff'
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigation;