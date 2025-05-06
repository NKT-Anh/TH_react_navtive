import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../Firebase/UserContext'; // Import UserContext
import { logoutUser } from '../Firebase/FirebaseApi'; // Import hàm logout

const Setting = ({ navigation }) => {
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
            <Text style={styles.title}>Thông tin cá nhân</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Tên:</Text>
                <Text style={styles.value}>{user?.name || 'Không có tên'}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user?.email || 'Không có email'}</Text>

                <Text style={styles.label}>Số điện thoại:</Text>
                <Text style={styles.value}>{user?.phone || 'Không có số điện thoại'}</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Setting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    infoContainer: {
        marginBottom: 30,
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
    logoutButton: {
        backgroundColor: '#ef506b',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});