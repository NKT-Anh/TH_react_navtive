import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Platform, StatusBar, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUsers, updateProfile } from '../Firebase/FirebaseApi';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const users = await getUsers();
            const customerList = users.filter(user => user.role === 'user');
            setCustomers(customerList);
        } catch (error) {
            console.error('Error loading customers:', error);
            Alert.alert('Lỗi', 'Không thể tải danh sách khách hàng');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setFormData({
            name: customer.name || '',
            phone: customer.phone || '',
            address: customer.address || '',
        });
    };

    const handleUpdate = async () => {
        try {
            await updateProfile(editingCustomer.uid, formData);
            await loadCustomers();
            setEditingCustomer(null);
            Alert.alert('Thành công', 'Cập nhật thông tin khách hàng thành công');
        } catch (error) {
            console.error('Error updating customer:', error);
            Alert.alert('Lỗi', 'Không thể cập nhật thông tin khách hàng');
        }
    };

    const renderCustomerItem = ({ item }) => (
        <View style={styles.customerItem}>
            <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{item.name || 'Chưa cập nhật'}</Text>
                <Text style={styles.customerEmail}>{item.email}</Text>
                <Text style={styles.customerPhone}>{item.phone || 'Chưa cập nhật'}</Text>
                <Text style={styles.customerAddress}>{item.address || 'Chưa cập nhật'}</Text>
            </View>

            <TouchableOpacity 
                style={styles.editButton}
                onPress={() => handleEdit(item)}
            >
                <Ionicons name="create-outline" size={24} color="#ef506b" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#ef506b" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Quản lý khách hàng</Text>
            </View>

            <View style={styles.content}>
                {loading ? (
                    <Text>Đang tải...</Text>
                ) : customers.length === 0 ? (
                    <Text>Chưa có khách hàng nào</Text>
                ) : (
                    <FlatList
                        data={customers}
                        renderItem={renderCustomerItem}
                        keyExtractor={(item) => item.uid}
                        contentContainerStyle={styles.customerList}
                    />
                )}
            </View>

            {editingCustomer && (
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chỉnh sửa thông tin khách hàng</Text>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Họ và tên</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                                placeholder="Nhập họ và tên"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Số điện thoại</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.phone}
                                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                                placeholder="Nhập số điện thoại"
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Địa chỉ</Text>
                            <TextInput
                                style={[styles.input, styles.addressInput]}
                                value={formData.address}
                                onChangeText={(text) => setFormData({ ...formData, address: text })}
                                placeholder="Nhập địa chỉ"
                                multiline
                            />
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setEditingCustomer(null)}
                            >
                                <Text style={styles.modalButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleUpdate}
                            >
                                <Text style={styles.modalButtonText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 15,
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
    customerList: {
        paddingBottom: 20,
    },
    customerItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    customerInfo: {
        flex: 1,
    },
    customerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    customerEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    customerPhone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    customerAddress: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        padding: 10,
    },
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        width: '90%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#f8f9fa',
    },
    addressInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#95a5a6',
    },
    saveButton: {
        backgroundColor: '#ef506b',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomerList;