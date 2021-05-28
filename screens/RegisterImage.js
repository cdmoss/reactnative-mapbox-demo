import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { ActivityIndicator, Text, } from 'react-native-paper'
import 'react-native-get-random-values';
import { useRegistrationFormState } from '../contexts/RegisterContext';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import axios from 'axios';

const RegisterImage = ({navigation}) => {
  const { dispatch, state } = useRegistrationFormState();
  const [photoFile, setPhoto] = useState(null);

  const uploadImage = () => {
    launchImageLibrary({
        mediaType: 'photo',
        cameraType: 'back',
        includeBase64: true
        },  (photo) => {
            setPhoto(photo)
        }
    );
  }

  const register = async () => {
    dispatch({ type: "SUBMIT"})
    let formData = new FormData();
    formData.append('userInfo', JSON.stringify({
      username: state.username,
      email: state.email,
      password: state.password,
      height: state.height,
      weight: state.weight,
    }));

    formData.append('avatar', photoFile);

    let resultMessage = '';

    try {
      const response = await axios({
        method: 'post',
        url: 'http://10.0.2.2:8000/api/register/',
        data: formData,
      });
      resultMessage = response.statusText;
    } catch (error) {
      resultMessage = error.toString();
    }

    dispatch({ type: "SUBMISSION_RECIEVED"});
    navigation.navigate('RegisterResult', {result: resultMessage});
  }

  return (
    <ImageBackground style={styles.container} source={require('../assets/cover-dark.png')}>
        { !state.isSubmitLoading ?
        <View>
        <View style={styles.brandContainer}>
            <Text style={styles.title} >Lastly, you can choose upload a profile picture.</Text>
        </View>
            <View style={{justifyContent: 'center', }}>
            
            { photoFile != null ?
            <Image style={{alignSelf: 'center', borderRadius: 125, width: 250, height: 250, marginBottom: 50}} source={{uri: 'data:image/png;base64,' + photoFile.base64}} /> :
            <Image style={{alignSelf: 'center', borderRadius: 125, width: 250, height: 250, marginBottom: 50}} source={require('../assets/default-pfp.png')} /> 
            }   
            </View>
            <View style={{margin: 20}}>
                <TouchableOpacity onPress={uploadImage} style={styles.nextBtn} >
                    <Text style={{ color: 'white', fontSize: 20 }}>Choose photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={register} style={styles.nextBtn} >
                    <Text style={{ color: 'white', fontSize: 20 }}>Register</Text>
                </TouchableOpacity>
            </View> 
        </View>
        : 
        <View>
            <Text style={[{marginTop: 70, marginLeft: 20}, styles.title]} >Hang tight for a moment while we create your account.</Text>
            <ActivityIndicator style={{marginTop: 200}} size="large" animating={true} color="red"/>
        </View>}
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

    subtitle: {
        fontFamily: 'RacingSansOne-Regular',
        color: 'white',
        fontSize: 15
      },
  
    title: {
      fontFamily: 'RacingSansOne-Regular',
      color: 'white',
      fontSize: 20
    },

    subtitle: {
        fontFamily: 'RacingSansOne-Regular',
        color: 'white',
        fontSize: 15,
        margin: 20
      },
  
    textContainer: { 
      marginHorizontal: 20,
      marginBottom: 30,
      borderRadius: 50,
    },
  
    textInput: {
      marginVertical: 7,
      paddingLeft: 30,
      borderRadius: 50,
      overflow: 'hidden',
      backgroundColor: 'white',
      height: 50
    },

    errorText: {
      alignSelf: 'flex-end',
      color: 'red',
      fontSize: 15
    },

    errorInput: {
      borderWidth: 2,
      borderColor: 'red'
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

    backBtn: {
      marginHorizontal: 20,
      marginBottom: 10,
      borderRadius: 50,
      borderColor: 'white',
      borderWidth: 2,
      justifyContent: 'center',
      backgroundColor: 'transparent',
      margin: 5,
      height: 50,
      alignItems: 'center'
    },
  })
 
export default RegisterImage;
 