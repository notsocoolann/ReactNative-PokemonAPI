import { StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import { SearchBar} from '../components';


export default function SearchScreen(){
    const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
    return (
        <View style={styles.container}>
            <SearchBar onSearch={handleSearch}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})