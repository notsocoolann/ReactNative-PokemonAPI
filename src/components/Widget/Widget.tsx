import {ActivityIndicator, StyleSheet, View, FlatList, Pressable, Image, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import { PokemonList } from './Widget.types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Widget({navigation}){

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

    /*useEffect(() => {
        console.log("data => ", typeof data);
    }, [data]);*/

    useEffect(() => {
        getPokemon();
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../Images/pokeball_s.png')}></Image>
            {isLoading ? ( 
                <ActivityIndicator />
            ) : (
                <>
                    <FlatList decelerationRate={0.6}
                        key={2}
                        numColumns={2}
                        data={data} 
                        keyExtractor={({name}) => name} 
                        renderItem={({item}) => (
                        <Text style={styles.flatlist}> 
                            {"\n"}
                            {item.name}
                            {"\n"}
                        </Text> )}
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
    }
});
export default Widget;