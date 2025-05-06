import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { getServiceDetail } from '../Firebase/FirebaseApi';
import { UserContext } from '../Firebase/UserContext';

const Servicedetail = ({ route, navigation }) => {
    const { serviceId } = route.params;
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const serviceData = await getServiceDetail(serviceId);
                console.log('Service ID:', serviceId);
                setService(serviceData);
            } catch (error) {
                console.error("Error fetching service detail:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetail();
    }, [serviceId]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#ef506b" />
            </SafeAreaView>
        );
    }

    if (!service) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Không tìm thấy thông tin dịch vụ!</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.detailContainer}>
                <Text style={styles.title}>Thông tin chi tiết dịch vụ</Text>
                <Text style={styles.label}>Tên dịch vụ:</Text>
                <Text style={styles.value}>{service.name}</Text>

                <Text style={styles.label}>Giá:</Text>
                <Text style={styles.value}>
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(service.price).replace('₫', 'đ')}
                </Text>

                <Text style={styles.label}>Ngày tạo:</Text>
                <Text style={styles.value}>{new Date(service.createdAt?.seconds * 1000).toLocaleString()}</Text>

                <Text style={styles.label}>Ngày cập nhật:</Text>
                <Text style={styles.value}>{new Date(service.updatedAt?.seconds * 1000).toLocaleString()}</Text>

                <Text style={styles.label}>Người tạo:</Text>
                <Text style={styles.value}>{service.addedBy}</Text>
            </View>

            {/* Nút Update */}
            <TouchableOpacity
                style={styles.updateButton}
                onPress={() => navigation.navigate('EditService', { serviceId })}
            >
                <Text style={styles.updateButtonText}>Cập nhật</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Servicedetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    detailContainer: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ef506b',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    updateButton: {
        marginTop: 20,
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});