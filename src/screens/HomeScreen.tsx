import { StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import { Widget, SearchBar} from '../components';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <Widget searchQuery={searchQuery} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
  },
});
