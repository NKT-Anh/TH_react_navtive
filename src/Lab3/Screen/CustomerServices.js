import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView, Platform, StatusBar } from 'react-native';
import { getServices, searchServicesByName } from '../Firebase/FirebaseApi';
import { Ionicons } from '@expo/vector-icons';

const CustomerServices = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const unsubscribe = getServices((servicesList) => {
            setServices(servicesList);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            return;
        }

        setSearching(true);
        try {
            const searchResults = await searchServicesByName(searchTerm);
            setServices(searchResults);
        } catch (error) {
            console.error('Error searching services:', error);
        } finally {
            setSearching(false);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setLoading(true);
        const unsubscribe = getServices((servicesList) => {
            setServices(servicesList);
            setLoading(false);
        });
    };

    const renderServiceItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.serviceItem}
            onPress={() => navigation.navigate('BookAppointment', {
                serviceId: item.id,
                serviceName: item.name,
                servicePrice: item.price || 0
            })}
        >
            <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.servicePrice}>
                    {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    }).format(item.price || 0).replace('₫', 'đ')}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
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
            <View style={styles.content}>
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Tìm kiếm dịch vụ..."
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                            onSubmitEditing={handleSearch}
                        />
                        {searchTerm.length > 0 && (
                            <TouchableOpacity onPress={handleClearSearch}>
                                <Ionicons name="close-circle" size={20} color="#666" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Text style={styles.searchButtonText}>Tìm</Text>
                    </TouchableOpacity>
                </View>

                {searching ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#ef506b" />
                    </View>
                ) : (
                    <FlatList
                        data={services}
                        renderItem={renderServiceItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>
                                {searchTerm ? 'Không tìm thấy dịch vụ phù hợp' : 'Không có dịch vụ nào'}
                            </Text>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#ef506b',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    list: {
        padding: 15,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    servicePrice: {
        fontSize: 14,
        color: '#ef506b',
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 50,
    },
});

export default CustomerServices; 