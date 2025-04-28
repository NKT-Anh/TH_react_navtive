import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const Profile = () => {
  const handleUpdateProfile = () => {
    console.log('Update Profile');
    // TODO: Điều hướng đến màn hình Update Profile
  };

  const handleChangeLanguage = () => {
    console.log('Change Language');
    // TODO: Mở modal/chọn ngôn ngữ
  };

  const handleSignOut = () => {
    console.log('Sign Out');
    // TODO: Thực hiện Sign Out
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={handleUpdateProfile}>
        <Text style={styles.optionText}>Update Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleChangeLanguage}>
        <Text style={styles.optionText}>Change Language</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleSignOut}>
        <Text style={[styles.optionText, { color: 'red' }]}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
  },
});
