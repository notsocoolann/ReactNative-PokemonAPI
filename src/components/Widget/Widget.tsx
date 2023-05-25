import {ActivityIndicator, StyleSheet, View, FlatList, TouchableOpacity, Image, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import { PokemonList } from '../Widget.types';

function Widget(){

    const [isLoading, setLoading]= useState(true);
    const [data, setData] = useState<PokemonList[]>([]);

    const getPokemon = async () => {
        try{
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
            const json = await response.json();
            console.log("Json => ", json.results);
            setData(json.results);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("data => ", typeof data);
    }, [data]);

    useEffect(() => {
        getPokemon();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? ( 
                <ActivityIndicator />
            ) : (
                <>
                    <FlatList
                        data={data} 
                        keyExtractor={({name}) => name} 
                        renderItem={({item}) => (
                        <Text> 
                            {item.name}, {item.url}
                        </Text>
                    )}/> 
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 6,
        backgroundColor: '#ff3d00',
        alignItems: 'center',
    },
    text:{
        flex: 1,
        fontSize: 30, 
    },
    button:{
        backgroundColor: '#FFFFFF',
        borderRadius: 6, 
        width: 150, 
        alignItems: 'center',
        padding: 10, 
        margin: 16,
    }
});
export default Widget;