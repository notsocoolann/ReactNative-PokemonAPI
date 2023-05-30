import React, { useEffect } from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SplashScreen = ({ navigation }) => {
  return(
    <View style={styles.container}>
      <Image source={require('../Images/pokeball.png')}></Image>
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