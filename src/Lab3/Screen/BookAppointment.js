import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, Platform, Modal } from 'react-native';
import { UserContext } from '../Firebase/UserContext';
import { createAppointment } from '../Firebase/FirebaseApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const BookAppointment = ({ route }) => {
    const { serviceId, serviceName, servicePrice } = route.params;
    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [note, setNote] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    const handleSubmit = async () => {
        try {
            // Format date and time
            const formattedDate = date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const formattedTime = time.toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
            });

            const appointmentData = {
                userId: user.id,
                userName: user.name,
                serviceId,
                serviceName,
                servicePrice,
                date: formattedDate,
                time: formattedTime,
                note,
                status: 'pending'
            };

            await createAppointment(appointmentData);
            Alert.alert('Thành công', 'Đặt lịch hẹn thành công');
            navigation.goBack();
        } catch (error) {
            console.error('Error creating appointment:', error);
            Alert.alert('Lỗi', 'Không thể tạo lịch hẹn. Vui lòng thử lại!');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thông tin dịch vụ</Text>
                <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{serviceName}</Text>
                    <Text style={styles.servicePrice}>
                        {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(servicePrice).replace('₫', 'đ')}
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Chọn thời gian</Text>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Ngày</Text>
                    <TouchableOpacity 
                        style={styles.dateTimeButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text>{date.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                            minimumDate={new Date()}
                        />
                    )}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Giờ</Text>
                    <TouchableOpacity 
                        style={styles.dateTimeButton}
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Text>{time.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            display="default"
                            onChange={handleTimeChange}
                        />
                    )}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ghi chú</Text>
                <TextInput
                    style={styles.notesInput}
                    placeholder="Nhập ghi chú (nếu có)"
                    value={note}
                    onChangeText={setNote}
                    multiline
                    numberOfLines={4}
                />
            </View>

            <TouchableOpacity style={styles.bookButton} onPress={handleSubmit}>
                <Text style={styles.bookButtonText}>Đặt lịch</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    serviceInfo: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    servicePrice: {
        fontSize: 16,
        color: '#ef506b',
        fontWeight: 'bold',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    dateTimeButton: {
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    notesInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        textAlignVertical: 'top',
        minHeight: 100,
    },
    bookButton: {
        backgroundColor: '#ef506b',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookAppointment; 