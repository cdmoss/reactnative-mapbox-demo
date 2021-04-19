import React, {useRef, useState} from 'react';
import {StyleSheet, TextInput, Text, TouchableOpacity, View, Alert} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const NewPlace = ({route, navigation}) => {
    const [description, setDesc] = useState('');
    const [name, setName] = useState('');
    const onDescChange = (desc) => setDesc(desc); 
    const onNameChange = (name) => setName(name); 
    const { coords } = route.params;

    const addPlace = async () => {
      const place = {
        lat: coords[1],
        lng: coords[0],
        desc: description,
        name: name
      };
      
      console.log(JSON.stringify(place));

      await fetch("http://chasemossing.com:8000/api/places/", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(place),
      }).then(response => {
        if (response.ok) {
          Alert.alert("Place saved to database.")
          navigation.navigate("Map", {newCoords: coords});
        }
        else {
          Alert.alert("Something went wrong when adding a new place", `Response code: ${response.status}`)
        }
      })
        .catch(error => Alert.alert("Something went wrong when talking to the server",error));
    }

    return(
      <View style={styles.container}>
          <Text style={styles.title}>Add new place for the following coordinates:</Text>
          <Text>Longitude: {coords[0]}</Text>
          <Text>Latitude: {coords[1]}</Text>
          <Text>{'\n'}</Text>
          <Text>Your name:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter name..." 
            onChangeText={onNameChange}></TextInput>
          <Text>Description:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter place description..." 
            onChangeText={onDescChange}></TextInput>
          <TouchableOpacity 
            onPress={() => addPlace()}
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
  input: {
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
