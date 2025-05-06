import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { getServiceDetail, updateService } from '../Firebase/FirebaseApi';

const EditService = ({ route, navigation }) => {
    const { serviceId } = route.params;
    const [service, setService] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const serviceData = await getServiceDetail(serviceId);
                setService(serviceData);
                setName(serviceData.name);
                setPrice(serviceData.price.toString());
            } catch (error) {
                console.error('Error fetching service detail:', error.message);
                Alert.alert('Lỗi', 'Không thể tải thông tin dịch vụ');
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetail();
    }, [serviceId]);

    const handleUpdate = async () => {
        if (!name || !price) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        try {
            await updateService(serviceId, {
                name,
                price: parseFloat(price),
                updatedAt: new Date(),
            });
            Alert.alert('Thành công', 'Dịch vụ đã được cập nhật');
            navigation.navigate('Main');
        } catch (error) {
            console.error('Error updating service:', error.message);
            Alert.alert('Lỗi', 'Không thể cập nhật dịch vụ');
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Đang tải...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chỉnh sửa dịch vụ</Text>
            <TextInput
                style={styles.input}
                placeholder="Tên dịch vụ"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Giá dịch vụ"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditService;

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
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});