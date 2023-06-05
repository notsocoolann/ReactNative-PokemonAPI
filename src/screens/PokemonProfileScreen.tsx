import { Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { TabView, TabBar, SceneMap, SceneRendererProps } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';

export default function PokemonProfileScreen({ route }) {

  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const navigation = useNavigation();

  const layout = useWindowDimensions();

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

  //Navigation
  const handleGoBack = () => {
    navigation.navigate('Home');
  }

  //Details and Stats Tabs
  const renderTabBar = props => (
   <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.tabIndicator}
      labelStyle={styles.tabLabel}
    />
  );

  const renderDetailsTab = () => (
    <View style={styles.tabContainer}>
      <Text style={styles.detailText}>Pokedéx Nr: {pokemonData.id}</Text>
      <Text style={styles.detailText}>Height: {pokemonData.height}</Text>
      <Text style={styles.detailText}>Weight: {pokemonData.weight}</Text>
      <Text style={styles.detailText}>
        Types: {pokemonData.types.map((type) => type.type.name).join(', ')}
      </Text>
    </View>
  );

  const renderStatsTab = () => (
    <View style={styles.tabContainer}>
      <Text style={styles.detailText}>Stats:</Text>
      {pokemonData.stats.map((stats) => (
        <View key={stats.stat.name} style={styles.statsContainer}>
          <Text style={styles.statsText}>{stats.stat.name}: </Text>
          <Text style={styles.statsValue}>{stats.base_stat}</Text>
        </View>
     ))}
    </View>
  );

  const scenes = SceneMap({
    pokemonDetails: renderDetailsTab,
    pokemonStats: renderStatsTab,
  });
  

  //Loading Animation
  if (isLoading) {
    return (
      <View>
        <Animatable.Image source={require('../Images/pokeball.png')} animation="rotate" iterationCount="infinite" duration={1000} style={styles.loading} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
        <Text>X</Text>
      </TouchableOpacity>
      {pokemonData && (
        <View>
          <Text style={styles.pokemonName}>{pokemonData.name}</Text>
          <View style={styles.image}>
            <Image source={{ uri: pokemonData.sprites.front_default }} style={{ width: 200, height: 200 }} />
          </View>

          <TabView
            navigationState={{ index: tabIndex, routes: [{ key: 'pokemonDetails', title: 'Details' }, { key: 'pokemonStats', title: 'Stats' }] }}
            renderScene={scenes}
            onIndexChange={index => setTabIndex(index)}
            initialLayout={{width: layout.width}}
            renderTabBar={renderTabBar}
          />
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
      marginTop: 50, 
      fontSize:20,
      padding:15,
      fontWeight: '600',
      textAlign: 'center',
    }, 
    image:{
      marginTop: 20, 
      height: 200,
      width: 350,
      borderRadius: 6,
      backgroundColor: '#FF825C',
      alignItems: 'center',
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
    },
    detailText: {
      fontSize: 20,
      marginBottom: 5,
      marginLeft: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    statsText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 5,
      marginLeft:20,
    },
    statsValue: {
      fontSize: 20,
    },
    tabBar: {
      backgroundColor: '#FF825C',
    },
    tabIndicator: {
      backgroundColor: '#e74716',
    },
    tabLabel: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    tabContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF825C',
      width: 350,
      borderRadius: 6,
    },
});
