import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert, Platform, StatusBar } from 'react-native';
import { addService } from '../Firebase/FirebaseApi';
import { UserContext } from '../Firebase/UserContext';

const Services = ({ navigation }) => {
    const [serviceName, setServiceName] = useState('');
    const [servicePrice, setServicePrice] = useState('');
    const { user } = useContext(UserContext); 
    const handleSave = async () => {
        if (!serviceName || !servicePrice) {
            Alert.alert('Error', 'Vui lòng nhập đầy đủ tên và giá dịch vụ!');
            return;
        }

        const newService = {
            name: serviceName,
            price: Number(servicePrice),
            addedBy: user?.name || 'Thai Anh admin',
            addedAt: new Date().toISOString(), 
        };

        try {
            const addedService = await addService(newService); 
            navigation.navigate('Main', { newService: addedService });
        } catch (error) {
            console.error("Error saving service:", error.message);
            Alert.alert('Error', 'Không thể thêm dịch vụ. Vui lòng thử lại!');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Nhập thông tin dịch vụ</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tên dịch vụ"
                    value={serviceName}
                    onChangeText={setServiceName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Giá dịch vụ"
                    value={servicePrice}
                    onChangeText={setServicePrice}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Services;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    navBar: {
        backgroundColor: '#ef506b',
        padding: 15,
        alignItems: 'center',
    },
    navTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#ef506b',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
});