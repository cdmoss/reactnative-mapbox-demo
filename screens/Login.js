import React from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, TextInput, Dimensions, } from 'react-native';
import { Text, } from 'react-native-paper'
import 'react-native-get-random-values';
import { Formik } from 'formik';
import GLOBALS from "../Globals";

const Login = ({navigation, route}) => {
  return(
    <ImageBackground style={styles.container} source={require('../assets/cover-dark.png')}>
      <View style={styles.brandContainer}>
          <Text style={styles.title} >Welcome back!</Text>
          <Text style={styles.subtitle} >Please enter your credentials.</Text>
      </View>
      <View style={styles.textContainer}>
        <TextInput mode="outlined" style={styles.textInput} placeholder="Username or email" ></TextInput>
        <TextInput mode="outlined" style={styles.textInput} placeholder="Password" ></TextInput>    
      </View>
      
      <View>
        <TouchableOpacity style={styles.loginBtn} >
            <Text style={{ color: 'white', fontSize: 20 }}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPass}>Forgot password?</Text>
      </View>
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
      height: 100,
      marginVertical: 50,
      flexDirection: 'column',
      justifyContent: 'space-between'
  },

  title: {
    fontFamily: 'RacingSansOne-Regular',
    marginHorizontal: 25,
    marginTop: 30, 
    color: 'white',
    fontSize: 20
  },

  subtitle: {
    fontFamily: 'RacingSansOne-Regular',
    marginHorizontal: 25,
    marginTop: 30, 
    color: 'white',
    fontSize: 15
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

  loginBtn: {
    marginHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#df3f3f',
    margin: 5,
    height: 50,
    alignItems: 'center'
  },

  forgotPass: {
    marginTop: 20,
    color: 'white',
    alignSelf: 'center',
    margin: 5,
    height: 50,
  },

  btnContainer: {
    marginHorizontal: 20,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: '#df3f3f',
    margin: 5,
    height: 50,
    alignItems: 'center'
  },
})
 
export default Login;
 