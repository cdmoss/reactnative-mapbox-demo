import React from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, } from 'react-native';
import Image from 'react-native-scalable-image';
import { Text, } from 'react-native-paper'
import 'react-native-get-random-values';

const Intro = ({navigation}) => {

    const goToLogin = () => {
        navigation.navigate("Login");
    }

    const goToRegistration = () => {
        navigation.navigate("Credentials");
    }

    return(
        <ImageBackground style={styles.container} source={require('../assets/cover.jpg')}>
            <View style={[styles.brandContainer, styles.center]}>
                <Image style={styles.logo} source={require('../assets/logo-white.png')}></Image>
                <Text style={[styles.center, styles.title]} >Click & Push</Text>
            </View>
            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.loginBtn} onPress={goToLogin} >
                <Text style={{ color: 'white', fontSize: 15 }}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.registerBtn} onPress={goToRegistration} >
                <Text style={{ color: 'white', fontSize: 15 }}>Create Account</Text>
            </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'cover',
    justifyContent: 'space-evenly'
  },

  center: {
    alignItems: 'center',  
    justifyContent: 'center',
  },

  brandContainer: {
      height: 200,
      marginVertical: 50,
      flexDirection: 'column',
      justifyContent: 'space-between'
  },

  title: {
    fontFamily: 'RacingSansOne-Regular',
    marginTop: 30, 
    color: 'white',
    fontSize: 30
  },

  textContainer: { 
    marginHorizontal: 20,
    borderRadius: 50,
  },

  textInput: {
    marginBottom: 10,
    paddingLeft: 30,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 50
  },

  loginBtn: {
    borderRadius: 50,
    width: 170,
    marginLeft: 10,
    justifyContent: 'center',
    backgroundColor: '#df3f3f',
    height: 60,
    alignItems: 'center'
  },

  registerBtn: {
    width: 170,
    marginRight: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 60,
    alignItems: 'center'
  },

  btnContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center'
  },
})
 
export default Intro;
 