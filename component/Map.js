import React, {Component, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { v4 as uuidv4 } from 'uuid';
import { NewPlace } from './NewPlace';
import 'react-native-get-random-values'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
 MapboxGL.setAccessToken('pk.eyJ1IjoiY2Rtb3NzIiwiYSI6ImNrbmhuOXJzcDIyd20ycW1pYm8xaGI0aGUifQ.j04Sp636N9Wg4N9j9t2tXw');
 
 const Map = ({navigation}) => {
   const mapRef = useRef();
 
   const addPoint = (coords) => {
     setPlaces(prevPlaces => {
       return [{
         id: uuidv4(),
         coords: coords,
         description: "temp point"}, ...prevPlaces]
     })
   }
 
  const promptAddPlace = (coords) => {
    Alert.alert(
      "New Place",
      `What would you like to do with the coordinate at \n\n Longitude: ${coords[0]} \n Latitutde: ${coords[1]}?`,
      [
        {text: 'Add temporary point', onPress: () => addPoint(coords)},
        {text: 'Add new place', onPress: () => goToNewPlace(coords)},
      ])
  }
  
  const goToNewPlace = (coords) => {
    console.log("Map Screen");
    console.log(coords);
    navigation.navigate('New Place', {coords: coords, id: uuidv4()});
  }

 
  const addPlace = (place) => {
    // send place to api
  }
 
   const [places, setPlaces] = useState([{
       id: uuidv4(),
       description: "Medicine Hat",
       coords: [-110.677498, 50.041668]
     }]
   );
 
   const renderPlace = (place) => {
     return <MapboxGL.PointAnnotation key={place.id} id={place.id} coordinate={place.coords} />
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
             centerCoordinate={places[0].coords}
             />
 
             {places.map(place => renderPlace(place))}
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
 