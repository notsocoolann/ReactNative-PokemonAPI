import {StyleSheet, View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { PokemonList } from './Widget.types';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

function Widget(){
    
   const navigation = useNavigation();
   const [isLoading, setLoading]= useState(true);
   const [data, setData] = useState<PokemonList[]>([]);
   const [itemsToLoad, setItemsToLoad] = useState(8);

    const getPokemon = async () => {
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsToLoad}&offset=0`);
            const json = await response.json();
            setData(json.results); 
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPokemon();
    }, [itemsToLoad]);


    const handleLoadMore = () =>{
        setItemsToLoad(itemsToLoad + 8);
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../Images/pokeball_s.png')}></Image>
            {isLoading ? ( 
                <Animatable.Image source={require('../../Images/pokeball_s.png')} style={styles.loadingIndicator} 
                animation="rotate" iterationCount="infinite" duration={1000}/>
            ) : (
                <>
                    <FlatList decelerationRate={0.6}
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
                    /> 
                    <TouchableOpacity style={styles.button} onPress={handleLoadMore}>
                        <Text>Load More</Text>
                    </TouchableOpacity>
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
        width: 50,
        height: 50,
      },
});
export default Widget;