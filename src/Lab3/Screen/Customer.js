import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { logoutUser } from '../Firebase/FirebaseApi';
import { UserContext } from '../Firebase/UserContext';

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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Thông tin người dùng</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#ef506b" />
                </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Tên:</Text>
                <Text style={styles.value}>{user?.name || 'Không có tên'}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user?.email || 'Không có email'}</Text>

                <Text style={styles.label}>Số điện thoại:</Text>
                <Text style={styles.value}>{user?.phone || 'Không có số điện thoại'}</Text>
            </View>
        </View>
    );
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