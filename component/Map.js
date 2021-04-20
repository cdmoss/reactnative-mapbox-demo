import React, {Component, useRef, useState, useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { v4 as uuidv4 } from 'uuid';
import { NewPlace } from './NewPlace';
import 'react-native-get-random-values'
import { useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { template } from '@babel/core';
import GLOBALS from "../Globals";
 
MapboxGL.setAccessToken('pk.eyJ1IjoiY2Rtb3NzIiwiYSI6ImNrbmhuOXJzcDIyd20ycW1pYm8xaGI0aGUifQ.j04Sp636N9Wg4N9j9t2tXw');

const Map = ({navigation, route}) => {
  const getApiPlaces = async () => {
    const response = await fetch(GLOBALS.API_HOST);
    const placeData = await response.json();
    setApiPlaces(placeData);
  }

  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        await getApiPlaces();
      }

      getData();
    }, [apiPlaces])
  );
  const [apiPlaces, setApiPlaces] = useState([]);
  const [tempPlaces, setTempPlaces] = useState([]);
  const [center, setCenter] = useState([-110.67815,50.04107]);

  const mapRef = useRef();

  const addPoint = (coords) => {
    setTempPlaces(prevPlaces => {
      return [{
        id: uuidv4(),
        coords: coords,
        desc: "temp point"}, ...prevPlaces]
    })
    setCenter(coords);
  }

  const deletePoint = async (id) => {
    console.log(id);
    for (let index = 0; index < tempPlaces.length; index++) {
      if (tempPlaces[index].id == id) {
        const placesCopy = tempPlaces.filter(place => place !== tempPlaces[index]);
        setTempPlaces(placesCopy);
        return;
      }
    }
    
    await fetch(`${GLOBALS.API_HOST}${id}/`, {
      method: 'DELETE'
    }).then(response => {
      if (response.ok) {
        Alert.alert("Place deleted from database.")
      }
      else {
        Alert.alert("Something went wrong when deleting new place", `Response code: ${response.status}`)
      }
    })
      .catch(error => Alert.alert("Something went wrong when talking to the server",error));

    getApiPlaces();
  }

  const promptAddPlace = (coords) => {
    Alert.alert(
      "New Place",
      `What would you like to do with the coordinate at \n\n Longitude: ${coords[0]} \n Latitutde: ${coords[1]}?`,
      [
        {text: 'Do nothing'},
        {text: 'Add temporary point', onPress: () => addPoint(coords)},
        {text: 'Add new place', onPress: () => goToNewPlace(coords)},
      ]
    )
  }

  const focusPoint = (id) => {
    let place;
    for (let index = 0; index < tempPlaces.length; index++) {
      if (tempPlaces[index].id == id) {
        place = tempPlaces[index];
        console.log(place);
        Alert.alert(
          `Temporary Place`, 
          `Coordinates:\n  lat - (${place.coords[1]})\n  lat - (${place.coords[1]})`,
          [
            {text: 'Delete place', onPress:() => deletePoint(id), style: "cancel"}, 
            {text: 'Do nothing'}
          ]);
        return;
      }
    }
    for (let index = 0; index < apiPlaces.length; index++) {
      if (apiPlaces[index].id == id) {
        place = apiPlaces[index];
        Alert.alert(
          `Selected Place`, 
          `Created by: ${place.name}\nDescription: ${place.desc}\nCoordinates:\n  lat - (${place.lat})\n  lat - (${place.lng})`,
          [
            {text: 'Delete place', onPress:() => deletePoint(id), style: "cancel"}, 
            {text: 'Do nothing'}
          ]);
        return;
      }
    }
  }

  const goToNewPlace = (coords) => {
    navigation.navigate('New Place', {coords: coords});
  }

  return(
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <MapboxGL.MapView 
          ref={mapRef} 
          style={styles.mapbox} 
          onPress={p => addPoint(p.geometry.coordinates)}
          onLongPress={p => promptAddPlace(p.geometry.coordinates)}>
          <MapboxGL.Camera
            zoomLevel={9}
            centerCoordinate={center}
            />
            {apiPlaces.length > 0 && apiPlaces.map(place => {
              const coords = [parseFloat(place.lng), parseFloat(place.lat)];
              return ( 
              <MapboxGL.PointAnnotation 
                onSelected={e => focusPoint(e.properties.id)} 
                key={place.id.toString()} id={place.id.toString()} coordinate={coords}/>)
            })}
            {tempPlaces.length > 0 && tempPlaces.map(place => {
              return (
              <MapboxGL.PointAnnotation 
                onSelected={e => focusPoint(e.properties.id)} 
                key={place.id} id={place.id} 
                coordinate={place.coords}>
                <View style={{height: 10, width: 10, borderRadius: 50, backgroundColor: '#FFF' }}>
                </View>
              </MapboxGL.PointAnnotation>)
            })}
        </MapboxGL.MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  mapbox: {
    flex: 1,
  },
})
 
export default Map;
 