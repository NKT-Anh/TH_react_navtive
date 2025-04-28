import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ContactThumbnail from '../Component/ContactThumbnail';
import Icon from 'react-native-vector-icons/FontAwesome';

const ContactDetail = ({ route }) => {
  const { contact } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileBox}>
        <ContactThumbnail
          avatar={contact.avatar}
          name={contact.name}
          phone={contact.phone}
          dark
        />
      </View>

      <View style={styles.contactDetails}>
        <View style={styles.detailRow}>
          <Icon name="phone" size={20} color="#555" style={styles.icon} />
          <Text style={styles.detailText}>{contact.phone}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="mobile" size={20} color="#555" style={styles.icon} />
          <Text style={styles.detailText}>{contact.cell}</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="envelope" size={20} color="#555" style={styles.icon} />
          <Text style={styles.detailText}>{contact.email}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  profileBox: {
    backgroundColor: '#2196F3',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },
  contactDetails: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#2196F3',
  },
});

export default ContactDetail;
