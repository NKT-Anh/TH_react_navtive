import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ContactListItem = ({ contact }) => {
  const navigation = useNavigation(); 

  const handlePress = () => {

    navigation.navigate('ContactDetail', { contact });
  };

  return (
    <TouchableOpacity style={styles.contactItem} onPress={handlePress}>
      <Image source={{ uri: contact.avatar }} style={styles.avatar} />
      <View style={styles.contactDetails}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text>{contact.phone}</Text>
        <Text>{contact.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    paddingTop: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  contactDetails: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ContactListItem;
