import { SafeAreaView, StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import React, {useState, useEffect} from 'react';

function Widget(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pokemon Name</Text>
            <Text style={styles.text}>Pokemon nr</Text>
            <TouchableOpacity style={styles.button}>
                <Text>Pokemon Stats</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 6,
        backgroundColor: '#ff3d00',
        alignItems: 'center',
    },
    text:{
        flex: 1,
        fontSize: 30, 
    },
    button:{
        backgroundColor: '#FFFFFF',
        borderRadius: 6, 
        width: 150, 
        alignItems: 'center',
        padding: 10, 
        margin: 16,
    }
});
export default Widget;