import { ActivityIndicator, Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

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
            <Animatable.Image source={require('../Images/pokeball.png')} animation="rotate" iterationCount="infinite" duration={1000} style={styles.loading}/>
          </View>
        );
    }

    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
            <FontAwesome name="times" size={20} color="#FFFFFF"/>
          </TouchableOpacity>
          {pokemonData && (
            <View >
                <Text style={styles.pokemonName}>{pokemonData.name}</Text>
                <Image source={{ uri: pokemonData.sprites.front_default}} style={{ width:200, height:200}} style={styles.image}/>
                    <View style={styles.text}>
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
    pokemonName:{
      marginTop: 100, 
      fontSize:20,
      padding:15,
    },
    text:{
      marginTop: 15, 
      padding: 15,
      borderRadius: 6,
      backgroundColor: '#FF825C',
    }, 
    image:{
      marginTop: 20, 
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
    loading:{
      margin: 150,
      height: 100,
      width: 100, 
      alignItems: 'center',
      justifyContent: 'center',
    }
});

export default PokemonProfileScreen;