import { SafeAreaView, Button, StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';

function DetailsScreen({ navigation }){
    return(
        <View>
            <Text>Pokemon name</Text>
            <Text>Pokemon Image</Text>
            <Text>Pokemon Nr</Text>
            <Text>Pokemon Stats</Text>
            <Button onPress={() =>navigation.goBack()} title="Close" />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default DetailsScreen;