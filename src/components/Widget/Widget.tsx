import {StyleSheet, View, FlatList, Image, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import { PokemonList } from './Widget.types';
import { useNavigation } from '@react-navigation/native';

function Widget(){
    
   const navigation = useNavigation();
   const [isLoading, setLoading]= useState(true);
   const [data, setData] = useState<PokemonList[]>([]);
   const [isLoadingMore, setLoadingMore] = useState(false);
   const [hasMore, setHasMore] = useState(true);
   

    const getPokemon = async () => {
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${data.length}`);
            const json = await response.json();
            const newPokemon = json.results;
            setData((prevData) => [...prevData, ...newPokemon]);
            setHasMore(newPokemon.length > 0);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        getPokemon();
    }, []);


    const handleLoadMore = () => {
        if (!isLoadingMore && hasMore) {
          setLoadingMore(true);
          getPokemon();
        }
      };


    return (
        <View style={styles.container}>
            <Image source={require('../../Images/pokeball_s.png')}></Image>
            {isLoading ? ( 
                <ActivityIndicator />
            ) : (
                <>
                    <FlatList 
                        key={2}
                        numColumns={2}
                        data={data} 
                        keyExtractor={({name}) => name} 
                        renderItem={({item}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('PokemonProfileScreen', { url: item.url })}>
                            <Text style={styles.flatlist}> 
                                {"\n"}
                                {item.name}
                                {"\n"}
                            </Text> 
                        </TouchableOpacity>
                        )}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={isLoadingMore && <ActivityIndicator />}
                        contentContainerStyle={{ paddingRight: 0 }}
                    /> 
                </>
            )}
        </View>
    );
    
};

const styles = StyleSheet.create({
    container:{
        flex:2,
        margin: 16,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatlist:{
        width:150,
        margin: 10, 
        padding: 10,
        fontSize: 20,
        borderRadius: 6,
        backgroundColor: '#FF825C',
        textAlign: 'center',
    },
    button:{
        backgroundColor: '#FFFFFF',
        borderRadius: 6, 
        width: 150, 
        alignItems: 'center',
        padding: 10, 
        margin: 16,
    },
    loadingIndicator: {
        width: 100,
        height: 100,
      },
});
export default Widget;