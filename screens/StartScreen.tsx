import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function StartScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View>
          <TouchableOpacity style={styles.pokeball} onPress={() => navigation.navigate('Home')}>
            <Image source={require('../Images/pokeball.png')}></Image>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
    )
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#ff3d00',
        alignItems: 'center',
        justifyContent: 'center', 
      },
    pokeball: {
      flex: 1,
      resizeMode: 'cover',
      alignItems: 'center', 
      justifyContent: 'center', 
    },
  });
  
export default StartScreen;