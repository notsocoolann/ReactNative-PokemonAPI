import {StyleSheet, View, FlatList, Image, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import { PokemonList } from './Widget.types';
import { useNavigation } from '@react-navigation/native';

function Widget(){
    
   const navigation = useNavigation();
   const [isLoading, setLoading]= useState(true);
   const [data, setData] = useState<PokemonList[]>([]);
   const [itemsToLoad, setItemsToLoad] = useState(8);

    const getPokemon = async () => {
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${itemsToLoad}`);
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
    
    const handleGoBack = () =>{
        setItemsToLoad(itemsToLoad - 8);
    }

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
                        <TouchableOpacity onPress={() => navigation.navigate('PokemonProfileScreen', { url: item.url })}>
                            <Text style={styles.flatlist}> 
                                {"\n"}
                                {item.name}
                                {"\n"}
                            </Text> 
                        </TouchableOpacity>
                        )}
                    /> 
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                            <Text>Previous Page</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleLoadMore}>
                            <Text>Next Page</Text>
                        </TouchableOpacity>
                    </View>
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