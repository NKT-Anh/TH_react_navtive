import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAppointments, updateAppointment } from '../Firebase/FirebaseApi';

const Transaction = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = getAppointments(null, (appointmentsList) => {
            setAppointments(appointmentsList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleUpdateStatus = async (appointmentId, newStatus) => {
        try {
            await updateAppointment(appointmentId, { status: newStatus });
            Alert.alert('Thành công', 'Cập nhật trạng thái thành công');
        } catch (error) {
            console.error('Error updating appointment:', error);
            Alert.alert('Lỗi', 'Không thể cập nhật trạng thái');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#f1c40f';
            case 'accepted':
                return '#2ecc71';
            case 'rejected':
                return '#e74c3c';
            case 'completed':
                return '#3498db';
            case 'cancelled':
                return '#95a5a6';
            default:
                return '#95a5a6';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Chờ xác nhận';
            case 'accepted':
                return 'Đã xác nhận';
            case 'rejected':
                return 'Đã từ chối';
            case 'completed':
                return 'Hoàn thành';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    const renderAppointmentItem = ({ item }) => (
        <View style={styles.appointmentItem}>
            <View style={styles.appointmentHeader}>
                <Text style={styles.customerName}>{item.customerName}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
                </View>
            </View>

            <View style={styles.appointmentDetails}>
                <Text style={styles.detailText}>Dịch vụ: {item.serviceName}</Text>
                <Text style={styles.detailText}>Ngày: {new Date(item.date).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}</Text>
                <Text style={styles.detailText}>Giờ: {item.time}</Text>
                <Text style={styles.detailText}>Ghi chú: {item.note || 'Không có'}</Text>
            </View>

            {item.status === 'pending' && (
                <View style={styles.actionButtons}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.acceptButton]}
                        onPress={() => handleUpdateStatus(item.id, 'accepted')}
                    >
                        <Text style={styles.actionButtonText}>Xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.rejectButton]}
                        onPress={() => handleUpdateStatus(item.id, 'rejected')}
                    >
                        <Text style={styles.actionButtonText}>Từ chối</Text>
                    </TouchableOpacity>
                </View>
            )}

            {item.status === 'accepted' && (
                <TouchableOpacity 
                    style={[styles.actionButton, styles.completeButton]}
                    onPress={() => handleUpdateStatus(item.id, 'completed')}
                >
                    <Text style={styles.actionButtonText}>Hoàn thành</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Quản lý lịch hẹn</Text>
            </View>

            <View style={styles.content}>
                {loading ? (
                    <Text>Đang tải...</Text>
                ) : appointments.length === 0 ? (
                    <Text>Chưa có lịch hẹn nào</Text>
                ) : (
                    <FlatList
                        data={appointments}
                        renderItem={renderAppointmentItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.appointmentList}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#ef506b',
        padding: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        padding: 15,
    },
    appointmentList: {
        paddingBottom: 20,
    },
    appointmentItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
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
    customerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    appointmentDetails: {
        marginBottom: 15,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    acceptButton: {
        backgroundColor: '#2ecc71',
    },
    rejectButton: {
        backgroundColor: '#e74c3c',
    },
    completeButton: {
        backgroundColor: '#3498db',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Transaction;