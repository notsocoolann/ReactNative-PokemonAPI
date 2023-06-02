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
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1281&offset=0`);
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

    const filteredResults = searchResults.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TouchableOpacity onPress={() => console.log('Open search bar')}>
            <Image source={require('../../Images/pokeball.png')} style={styles.searchIcon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Pokemon"
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
        {searchQuery !== '' && (
          <FlatList
            data={filteredResults}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectPokemon(item.url)}>
                <Text style={styles.resultItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.resultList}
          />
        )}
      </View> 
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    searchIcon: {
      width: 50,
      height: 50,
      marginRight: 8,
    },
    searchBar: {
      flex: 1,
      height: 60,
      borderColor: '#FF825C',
      borderWidth: 2,
      paddingLeft: 10,
      borderRadius: 30,
    },
    resultItem:{
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF825C',
    },
    resultList: {
      flexGrow:1,
      width: 300,
      marginLeft:40,
      marginTop: 16,
    },
});
  
    
export default SearchBar;