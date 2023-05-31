import React, { useEffect } from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
  return(
    <View style={styles.container}>
      <Animatable.Image source={require('../Images/pokeball.png')} animation="rotate" iterationCount="infinite" duration={1000}/>
    </View>
  );
};

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#ff3d00',
        alignItems: 'center',
        justifyContent: 'center', 
      },
  });
  
export default SplashScreen;