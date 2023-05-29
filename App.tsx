import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

//Screen Imports
import StartScreen from './src/screens/StartScreen';
import HomeScreen from './src/screens/HomeScreen';
import PokemonProfileScreen from './src/screens/PokemonProfileScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={tabBarOptions}>
        <Tab.Screen name="Home" component={HomeStack} options={{ tabBarVisible: false, tabBarButton: () => null }}/>
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const HomeStack = () =>{
  return(
    <Stack.Navigator>
        <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="PokemonProfileScreen" component={PokemonProfileScreen}/>
      </Stack.Navigator>
  )
}

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

const tabBarOptions = {
  activeTintColor:'#e74716',
  inactiveTintColor: '#FF825C',
  style:styles.tabBar,
  labelStyle: styles.tabLabel,
};

export default App;
