import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Image, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getServices } from '../Firebase/FirebaseApi';

const Home = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = getServices((servicesList) => {
            setServices(servicesList);
            setLoading(false);
        });
    
    
        return () => unsubscribe();
    }, []);
    
    const renderServiceItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Servicedetail', { serviceId: item.id })}>
            <View style={styles.serviceItem}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.servicePrice}>
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(item.price).replace('₫', 'đ')}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navBar}>
                <Text style={styles.storeName}>HUYỀN TRINH</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Services')}>
                    <Ionicons name="add-circle" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Image source={require('../../../assets/logolab3.png')} style={styles.logo} />
                <Text style={styles.sectionTitle}>Danh sách dịch vụ</Text>
                {loading ? (
                    <Text>Đang tải...</Text>
                ) : services.length === 0 ? (
                    <Text>Chưa cập nhật</Text>
                ) : (
                    <FlatList
                        data={services}
                        renderItem={renderServiceItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.serviceList}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#ef506b',
    },
    storeName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
    },
    logo: {
        width: '80%',
        height: 50,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    serviceList: {
        width: '100%',
    },
    serviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        marginBottom: 10,
    },
    serviceName: {
        fontSize: 16,
        color: '#333',
    },
    servicePrice: {
        fontSize: 16,
        color: '#007bff',
    },
});