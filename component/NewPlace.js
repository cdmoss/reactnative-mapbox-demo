import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, Text, TouchableOpacity, View, Alert} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const NewPlace = ({route, navigation}) => {
    const [descriptionText, setText] = useState('');
    const onDescChange = (desc) => setText(desc); 
    const { coords } = route.params;

    const addPlace = () => {
        Alert.alert("Place saved to database.");
        navigation.navigate("Map");
    }

    return(
    <View style={styles.container}>
        <Text style={styles.title}>Add new place for the following coordinates:</Text>
        <Text>Longitude: {coords[0]}</Text>
        <Text>Latitude: {coords[1]}</Text>
        <Text>{'\n'}</Text>
        <Text>Description:</Text>
        <TextInput style={styles.desc} placeholder="Place description..." onChange={onDescChange}></TextInput>
        <TouchableOpacity 
            onPress={() => addPlace({
                id: uuidv4(),
                description: descriptionText,
                coords: coords
            })} 
            style={styles.btn}>
            <Text style={styles.btnText}>+ Add Place</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 20,
    marginBottom: 10
  },
  desc: {
    height: 40,
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 5,
    marginBottom: 10
  },
  btn: {
    height: 50,
    backgroundColor: '#FE4C4C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
      color: 'white'
  }
})

export default NewPlace;
