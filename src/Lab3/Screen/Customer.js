import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { logoutUser } from '../Firebase/FirebaseApi';
import { UserContext } from '../Firebase/UserContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerServices from './CustomerServices';
import CustomerAppointments from './CustomerAppointments';
import CustomerProfile from './CustomerProfile';

const Tab = createBottomTabNavigator();

const CustomerTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Services') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Appointments') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#ef506b',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen 
                name="Services" 
                component={CustomerServices}
                options={{ title: 'Dịch vụ' }}
            />
            <Tab.Screen 
                name="Appointments" 
                component={CustomerAppointments}
                options={{ title: 'Lịch hẹn' }}
            />
            <Tab.Screen 
                name="Profile" 
                component={CustomerProfile}
                options={{ title: 'Cá nhân' }}
            />
        </Tab.Navigator>
    );
};

const Customer = ({ navigation }) => {
    const { user } = useContext(UserContext);

    const handleLogout = async () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn có chắc chắn muốn đăng xuất?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Đăng xuất',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logoutUser();
                            navigation.replace('Login');
                        } catch (error) {
                            Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại!');
                        }
                    },
                },
            ]
        );
    };

    return <CustomerTabs />;
};

export default Customer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    infoContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color: '#777',
        marginBottom: 10,
    },
});