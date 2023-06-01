import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const navigation = useNavigation();

    useEffect(() =>{
        const search = async () => {
            try{
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
                const data = await response.json();
                setSearchResults(data.results);
            } catch (error) {
                console.error(error);
            }
        };

        search();
    }, [searchQuery] );

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    const handleSelectPokemon = (url: string) => {
        navigation.navigate('PokemonProfileScreen', { url });
    };
    
    return (
        <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TouchableOpacity onPress={() => console.log('Open search bar')}>
            <Image source={require('../../Images/lupa.png')} style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Pokemon"
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectPokemon(item.url)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View> 
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      width: 220,
    },
    searchIcon: {
      width: 20,
      height: 20,
      marginRight: 8,
    },
    searchBar: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingLeft: 10,
    },
});
  
    
export default SearchBar;