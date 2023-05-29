import { StyleSheet } from 'react-native';
import React from 'react';
import { Widget } from '../components';

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

