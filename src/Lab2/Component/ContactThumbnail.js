import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const ContactThumbnail = ({ avatar, name, phone }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatar }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {phone && <Text style={styles.phone}>{phone}</Text>}
      </View>
    </View>
  );
}

export default ContactThumbnail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', 
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  info: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  phone: {
    fontSize: 14,
    color: 'gray',
  },
});
