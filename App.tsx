import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//Navigation Imports 
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screen Imports
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import PokemonProfileScreen from './src/screens/PokemonProfileScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App(){

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer theme={DefaultTheme}>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator initialRouteName="TabNavigator" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="PokemonProfileScreen" component={PokemonProfileScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const TabNavigator = () => {

  const tabOptions = {
    tabBarStyle: styles.tabBar,
    tabBarLabelStyle: styles.tabLabel,
    tabBarActiveTintColor: '#e74716',
    tabBarInactiveTintColor: '#ffb199',
  };

  const tabIcons = {
    Home: 'home',
    Search: 'search',
    Favorites: 'heart',
  };

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = tabIcons[route.name];
          return <FontAwesome name={iconName} size={size} color={color} />;;
        },
        ...tabOptions,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarVisible: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false, tabBarVisible: false }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false, tabBarVisible: false }} />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  tabBar:{
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    height: 60,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default App;
