import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  const [searchText, setSearchText] = useState('');

  // Function for search
  const handleSearch = () => {
    console.log(setSearchText);
    setSearchText('');
  };

  return (
    <View style={{ height: 50, marginTop: 30 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <FontAwesome name="search" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // Updated to take the full width
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputBox: {
    borderWidth: 0.9,
    flex: 1, // Expanded to take available space
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  searchBtn: {
    marginLeft: 10, // Added margin for better spacing
  },
  icon: {
    color: 'red',
    fontSize: 30,
  },
});

export default Header;
