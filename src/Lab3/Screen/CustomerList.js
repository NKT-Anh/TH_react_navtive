import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/FirebaseConfig';

const CustomerList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'User');
                const snapshot = await getDocs(usersCollection);
                const userList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })).filter(user => user.role !== 'admin');
                
                setUsers(userList);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const renderUserItem = ({ item }) => (
        <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name || 'Không có tên'}</Text>
            <Text style={styles.userEmail}>{item.email || 'Không có email'}</Text>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#ef506b" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Danh sách người dùng</Text>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

export default CustomerList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 40, // Thêm khoảng cách phía trên để tránh vùng trạng thái
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    list: {
        paddingBottom: 20,
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 16,
        color: '#555',
    },
});