import { SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import { Widget } from '../components';
//import Widget from '../components/Widget/Widget';

export default function HomeScreen(){
    return ( <Widget/> );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  text: {
    fontSize: 30,
  },
});   

