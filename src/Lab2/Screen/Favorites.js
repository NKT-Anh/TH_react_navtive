import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactThumbnail from '../Component/ContactThumbnail';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const contacts = await fetchContacts();
        setContacts(contacts);
        setLoading(false);
        setError(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    loadData();
  }, []);

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar } = item;
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { contact: item })}>
          <ContactThumbnail avatar={avatar} />
        </TouchableOpacity>
      </View>
    );
  };
  

  const favorites = contacts.filter(contact => contact.favorite);

  const handleRetry = () => {
    setError(false);
    setLoading(true); 
    const loadData = async () => {
      try {
        const contacts = await fetchContacts();
        setContacts(contacts);
        setLoading(false);
        setError(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    loadData();
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="blue" style={styles.loader} />}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Có lỗi xảy ra khi tải dữ liệu.</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      )}
      {!loading && !error && favorites.length === 0 && <Text style={styles.noFavoritesText}>Không có liên hệ yêu thích.</Text>}
      {!loading && !error && favorites.length > 0 && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    margin: 8,
    padding: 10,
    alignItems: 'center',
    width: 100,
    height: 140,
    justifyContent: 'space-between',
  },
  contactName: {
    marginTop: 8,
    fontWeight: 'bold',
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  contactPhone: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  retryButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    color: '#555',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Favorites;
