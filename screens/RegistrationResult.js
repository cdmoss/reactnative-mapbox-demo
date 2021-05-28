import React from 'react';
import { ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { Text, } from 'react-native-paper'
import 'react-native-get-random-values';
import { useRegistrationFormState } from '../contexts/RegisterContext';

const RegisterResult = ({navigation, route}) => {
    const back = () => {
        navigation.popToTop()
    }

    return (
        <ImageBackground style={styles.container} source={require('../assets/cover-dark.png')}>
            <View style={styles.brandContainer}>
                <Text style={styles.title} >{route.params.result}</Text>
            </View>
            <TouchableOpacity onPress={back} style={styles.nextBtn} >
                <Text style={{ color: 'white', fontSize: 20 }}>Okay</Text>
            </TouchableOpacity>
        </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1,
      flexDirection: 'column',
      resizeMode: 'cover',
    },
  
    brandContainer: {
      marginTop: 70,  
      height: 50,
      marginBottom: 70,
      marginLeft: 25,
      flexDirection: 'column',
      justifyContent: 'space-evenly'
    },
  
    title: {
      fontFamily: 'RacingSansOne-Regular',
      color: 'white',
      fontSize: 20,
    },
  
    nextBtn: {
      marginHorizontal: 20,
      
      borderRadius: 50,
      justifyContent: 'center',
      backgroundColor: '#df3f3f',
      margin: 5,
      height: 50,
      alignItems: 'center'
    },
  })
 
export default RegisterResult;
 