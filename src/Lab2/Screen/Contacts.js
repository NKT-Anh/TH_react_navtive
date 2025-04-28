import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactListItem from '../Component/ContactListItem';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getContacts = async () => {
    try {
      const data = await fetchContacts();
      setContacts(data);
      setLoading(false);
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu:', err.message || err);
      setLoading(false);
      setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại!');
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    getContacts();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
        <Button title="Thử lại" onPress={retryFetch} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactListItem contact={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Contacts;
