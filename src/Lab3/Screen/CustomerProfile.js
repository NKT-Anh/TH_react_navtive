import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView, Platform, StatusBar, ScrollView, Alert, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { updateProfile, changePassword, logoutUser } from '../Firebase/FirebaseApi';
import { UserContext } from '../Firebase/UserContext';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CLOUD_NAME = 'dtqo1fvv9';
const UPLOAD_PRESET = 'anhfoodapp';

const CustomerProfile = ({ navigation }) => {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [avatar, setAvatar] = useState(user?.avatar || null);
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        phone: user?.phone || '',
        address: user?.address || '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const onPickCamera = async () => {
        setModalVisible(false);
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });
        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            await uploadImage(result.assets[0].uri);
        }
    };

    const onPickLibrary = async () => {
        setModalVisible(false);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });
        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            await uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (imageUri) => {
        const data = new FormData();
        data.append('file', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'avatarImage.jpg',
        });
        data.append('upload_preset', UPLOAD_PRESET);

        try {
            setLoading(true);
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                data,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            const uploadedUrl = response.data.secure_url;
            await handleUpdateProfile({ ...formData, avatar: uploadedUrl });
            Alert.alert("Thành công", "Cập nhật ảnh đại diện thành công");
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert("Lỗi", "Không thể tải ảnh lên. Vui lòng thử lại!");
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (data = formData) => {
        try {
            setLoading(true);
            if (!user || !user.id) {
                throw new Error('Không tìm thấy thông tin người dùng');
            }

            const updateData = {
                name: data.fullName || data.name || '',
                phone: data.phone || '',
                address: data.address || '',
                avatar: data.avatar || '',
                updatedAt: new Date().toISOString()
            };

            await updateProfile(user.id, updateData);
            setUser({ ...user, ...updateData });
            setEditing(false);
            Alert.alert('Thành công', 'Cập nhật thông tin thành công');
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Lỗi', error.message || 'Không thể cập nhật thông tin');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu mới không khớp');
            return;
        }

        try {
            setLoading(true);
            await changePassword(passwordData.newPassword);
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setShowPasswordForm(false);
            Alert.alert('Thành công', 'Đổi mật khẩu thành công');
        } catch (error) {
            console.error('Error changing password:', error);
            Alert.alert('Lỗi', 'Không thể đổi mật khẩu');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logoutUser();
            setUser(null);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Error logging out:', error);
            Alert.alert('Lỗi', 'Không thể đăng xuất');
        } finally {
            setLoading(false);
        }
    };

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
                <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.avatarContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        {avatar ? (
                            <Image source={{ uri: avatar }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Ionicons name="person" size={50} color="#ef506b" />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Họ và tên</Text>
                        {editing ? (
                            <TextInput
                                style={styles.input}
                                value={formData.fullName}
                                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                                placeholder="Nhập họ và tên"
                            />
                        ) : (
                            <Text style={styles.text}>{formData.fullName || 'Chưa cập nhật'}</Text>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        {editing ? (
                            <TextInput
                                style={styles.input}
                                value={formData.phone}
                                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                                placeholder="Nhập số điện thoại"
                                keyboardType="phone-pad"
                            />
                        ) : (
                            <Text style={styles.text}>{formData.phone || 'Chưa cập nhật'}</Text>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Địa chỉ</Text>
                        {editing ? (
                            <TextInput
                                style={[styles.input, styles.addressInput]}
                                value={formData.address}
                                onChangeText={(text) => setFormData({ ...formData, address: text })}
                                placeholder="Nhập địa chỉ"
                                multiline
                            />
                        ) : (
                            <Text style={styles.text}>{formData.address || 'Chưa cập nhật'}</Text>
                        )}
                    </View>

                    {!editing && (
                        <TouchableOpacity 
                            style={styles.editButton}
                            onPress={() => setEditing(true)}
                        >
                            <Text style={styles.editButtonText}>Chỉnh sửa thông tin</Text>
                        </TouchableOpacity>
                    )}

                    {editing && (
                        <View style={styles.actionButtons}>
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={() => {
                                    setEditing(false);
                                    setFormData({
                                        fullName: user?.name || '',
                                        phone: user?.phone || '',
                                        address: user?.address || '',
                                    });
                                }}
                            >
                                <Text style={styles.actionButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.saveButton]}
                                onPress={handleUpdateProfile}
                            >
                                <Text style={styles.actionButtonText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.passwordSection}>
                    <TouchableOpacity 
                        style={styles.passwordButton}
                        onPress={() => setShowPasswordForm(!showPasswordForm)}
                    >
                        <Ionicons name="lock-closed-outline" size={24} color="#ef506b" />
                        <Text style={styles.passwordButtonText}>Đổi mật khẩu</Text>
                    </TouchableOpacity>

                    {showPasswordForm && (
                        <View style={styles.passwordForm}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Mật khẩu hiện tại</Text>
                                <TextInput
                                    style={styles.input}
                                    value={passwordData.currentPassword}
                                    onChangeText={(text) => setPasswordData({ ...passwordData, currentPassword: text })}
                                    placeholder="Nhập mật khẩu hiện tại"
                                    secureTextEntry
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Mật khẩu mới</Text>
                                <TextInput
                                    style={styles.input}
                                    value={passwordData.newPassword}
                                    onChangeText={(text) => setPasswordData({ ...passwordData, newPassword: text })}
                                    placeholder="Nhập mật khẩu mới"
                                    secureTextEntry
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
                                <TextInput
                                    style={styles.input}
                                    value={passwordData.confirmPassword}
                                    onChangeText={(text) => setPasswordData({ ...passwordData, confirmPassword: text })}
                                    placeholder="Nhập lại mật khẩu mới"
                                    secureTextEntry
                                />
                            </View>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity 
                                    style={[styles.actionButton, styles.cancelButton]}
                                    onPress={() => {
                                        setShowPasswordForm(false);
                                        setPasswordData({
                                            currentPassword: '',
                                            newPassword: '',
                                            confirmPassword: '',
                                        });
                                    }}
                                >
                                    <Text style={styles.actionButtonText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.actionButton, styles.saveButton]}
                                    onPress={handleChangePassword}
                                >
                                    <Text style={styles.actionButtonText}>Đổi mật khẩu</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={() => {
                        Alert.alert(
                            'Xác nhận đăng xuất',
                            'Bạn có chắc chắn muốn đăng xuất?',
                            [
                                {
                                    text: 'Hủy',
                                    style: 'cancel'
                                },
                                {
                                    text: 'Đăng xuất',
                                    style: 'destructive',
                                    onPress: handleLogout
                                }
                            ]
                        );
                    }}
                >
                    <Ionicons name="log-out-outline" size={24} color="#fff" />
                    <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity 
                            style={styles.modalOption}
                            onPress={onPickCamera}
                        >
                            <Ionicons name="camera" size={24} color="#ef506b" />
                            <Text style={styles.modalOptionText}>Chụp ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.modalOption}
                            onPress={onPickLibrary}
                        >
                            <Ionicons name="images" size={24} color="#ef506b" />
                            <Text style={styles.modalOptionText}>Chọn từ thư viện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.modalOption, styles.cancelOption]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#ef506b',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ef506b',
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ef506b',
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
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
    text: {
        fontSize: 16,
        color: '#666',
        padding: 12,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    editButton: {
        backgroundColor: '#ef506b',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
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
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    passwordSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    passwordButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
    },
    passwordButtonText: {
        color: '#ef506b',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    passwordForm: {
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: '#e74c3c',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalOptionText: {
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
    },
    cancelOption: {
        borderBottomWidth: 0,
        justifyContent: 'center',
    },
    cancelText: {
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: 'bold',
    },
});

export default CustomerProfile;