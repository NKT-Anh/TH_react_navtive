import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, Platform, StatusBar } from 'react-native';
import { UserContext } from '../Firebase/UserContext';
import { getAppointments, deleteAppointment, updateAppointment } from '../Firebase/FirebaseApi';
import { Ionicons } from '@expo/vector-icons';

const CustomerAppointments = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.id) {
            setLoading(false);
            return;
        }

        const unsubscribe = getAppointments(user.id, (appointmentsList) => {
            setAppointments(appointmentsList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const handleDeleteAppointment = (appointmentId) => {
        Alert.alert(
            'Xóa lịch hẹn',
            'Bạn có chắc chắn muốn xóa lịch hẹn này?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteAppointment(appointmentId);
                            Alert.alert('Thành công', 'Đã xóa lịch hẹn');
                        } catch (error) {
                            Alert.alert('Lỗi', error.message);
                        }
                    },
                },
            ]
        );
    };

    const handleCancelAppointment = (appointmentId) => {
        Alert.alert(
            'Hủy lịch hẹn',
            'Bạn có chắc chắn muốn hủy lịch hẹn này?',
            [
                { text: 'Không', style: 'cancel' },
                {
                    text: 'Có',
                    onPress: async () => {
                        try {
                            await updateAppointment(appointmentId, { status: 'cancelled' });
                            Alert.alert('Thành công', 'Đã hủy lịch hẹn');
                        } catch (error) {
                            Alert.alert('Lỗi', error.message);
                        }
                    },
                },
            ]
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#f39c12';
            case 'confirmed':
                return '#2ecc71';
            case 'cancelled':
                return '#e74c3c';
            default:
                return '#95a5a6';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Chờ xác nhận';
            case 'confirmed':
                return 'Đã xác nhận';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    const renderAppointmentItem = ({ item }) => (
        <View style={styles.appointmentItem}>
            <View style={styles.appointmentHeader}>
                <Text style={styles.serviceName}>{item.serviceName}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
                </View>
            </View>

            <View style={styles.appointmentDetails}>
                <Text style={styles.detailText}>Ngày: {item.date}</Text>
                <Text style={styles.detailText}>Giờ: {item.time}</Text>
                <Text style={styles.detailText}>Ghi chú: {item.note || 'Không có'}</Text>
            </View>

            {item.status === 'pending' && (
                <TouchableOpacity 
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={() => handleCancelAppointment(item.id)}
                >
                    <Text style={styles.actionButtonText}>Hủy lịch</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ef506b" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#ef506b" />
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Lịch hẹn</Text>
            </View>

            <View style={styles.content}>
                <FlatList
                    data={appointments}
                    renderItem={renderAppointmentItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Không có lịch hẹn nào</Text>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ef506b',
        padding: 15,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    content: {
        flex: 1,
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        padding: 15,
    },
    appointmentItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    appointmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    appointmentDetails: {
        marginBottom: 10,
    },
    detailText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    actionButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 6,
        marginLeft: 10,
    },
    cancelButton: {
        backgroundColor: '#f39c12',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 50,
    },
});

export default CustomerAppointments; 