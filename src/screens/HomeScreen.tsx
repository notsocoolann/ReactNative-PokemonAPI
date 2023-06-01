import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Widget } from '../components';

export default function HomeScreen() {

  return (<Widget/>);
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
  searchBar: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
  },
});
