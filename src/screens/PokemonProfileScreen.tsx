import { ActivityIndicator, Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PokemonProfileScreen = ({ route }) => {

    const [pokemonData, setPokemonData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const navigation = useNavigation();

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

      const handleGoBack = () => {
        navigation.navigate('Home');
      }

      if (isLoading) {
        return (
          <View>
            <ActivityIndicator />
          </View>
        );
    }

    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
            <FontAwesome name="times" size={20} color="#FFFFFF"/>
          </TouchableOpacity>
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
        marginTop: 15, 
        padding: 15,
        borderRadius: 6,
        backgroundColor: '#FF825C',
    }, 
    image:{
        marginTop: 100, 
        height: 150,
        borderRadius: 6,
        backgroundColor: '#FF825C',
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 20,
      borderRadius: 6,
      backgroundColor: '#FF825C',
    },
});

export default PokemonProfileScreen;