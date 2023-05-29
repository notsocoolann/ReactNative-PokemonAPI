import { ActivityIndicator, Image, StyleSheet, View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';

const PokemonProfileScreen = ({ route }) => {

    const [pokemonData, setPokemonData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
          try {
            const response = await fetch(route.params.url);
            const data = await response.json();
            setPokemonData(data);
          } catch (error) {
            console.error('Error fetching Pokemon data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPokemonData();
      }, []);

      if (isLoading) {
        return (
          <View>
            <ActivityIndicator />
          </View>
        );
    }

    return (
        <View style={styles.container}>
          {pokemonData && (
            <View>
                <Image source={{ uri: pokemonData.sprites.front_default}} style={{ width:200, height:200}} style={styles.image}/>
                    <View style={styles.text}>
                        <Text style={{fontSize:20}}>Name: {pokemonData.name}</Text>
                        <Text style={{fontSize:20}}>Height: {pokemonData.height}</Text>
                        <Text style={{fontSize:20}}>Weight: {pokemonData.weight}</Text>
                    </View>
            </View>
          )}
        </View>
      );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    text:{
        margin: 10, 
        padding: 10,
        borderRadius: 6,
        backgroundColor: '#FF825C',
    }, 
    image:{
        margin: 10, 
        height: 150,
        borderRadius: 6,
        backgroundColor: '#FF825C',
    }
});

export default PokemonProfileScreen;