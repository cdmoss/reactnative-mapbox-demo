import React, { useEffect } from 'react';
import { Alert, ImageBackground, StyleSheet, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Text, } from 'react-native-paper'
import 'react-native-get-random-values';
import { useRegistrationFormState } from '../contexts/RegisterContext';

const RegisterCredentials = ({navigation}) => {
  const { dispatch, state: { username, email, password, } } = useRegistrationFormState();
  const { control, handleSubmit, watch, formState: {errors} } = useForm({
    mode: 'all'
  });

  const submitCredForm = (formData) => {
    dispatch({ type: "USERNAME_CHANGE", payload: formData.username });
    dispatch({ type: "EMAIL_CHANGE", payload: formData.email });
    dispatch({ type: "PASSWORD_CHANGE", payload: formData.password });
    navigation.navigate("Measurements");
  }

  useEffect(() =>
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      Alert.alert(
        'Going so soon?',
        'Are you sure you want to cancel registration?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              dispatch({ type: "USERNAME_CHANGE", payload: null });
              dispatch({ type: "EMAIL_CHANGE", payload: null });
              dispatch({ type: "PASSWORD_CHANGE", payload: null });
              dispatch({ type: "HEIGHT_CHANGE", payload: null })
              dispatch({ type: "WEIGHT_CHANGE", payload: null })
              navigation.dispatch(e.data.action)
            },
          },
        ]
      );
    }),
  [navigation]);

  return (
    <ImageBackground style={styles.container} source={require('../assets/cover-dark.png')}>
        <View style={styles.brandContainer}>
          <Text style={styles.title} >Welcome!</Text>
        </View>
        <View>
          <Text style={styles.subtitle} >Let's start with some basic account information.</Text>
        <View style={{margin: 20}}>
          <Controller 
            defaultValue={username}
            control={control}
            render={({ field: { onChange, value }}) => (
              <TextInput 
                mode="outlined" 
                style={[styles.textInput, errors.username && styles.errorInput]} 
                placeholder="Username" 
                value={value}
                onChangeText={value => onChange(value)}
              ></TextInput>
            )}
            name="username"
            rules={{ required: true, minLength: 5, maxLength: 15}}
            />
            {errors.username?.type === "required" && <Text style={styles.errorText}>Username is required.</Text>}
            {errors.username?.type === "minLength" && <Text style={styles.errorText}>Username must be at least 5 characters.</Text>}
            {errors.username?.type === "maxLength" && <Text style={styles.errorText}>Username must be no more than 15 characters.</Text>}
          <Controller 
            defaultValue={email}
            control={control}
            render={({ field: { onChange, value }}) => (
              <TextInput 
                mode="outlined" 
                style={[styles.textInput, errors.username && styles.errorInput]} 
                placeholder="Email" 
                value={value}
                onChangeText={value => onChange(value)} />
          )}
          rules={{
            required: true, 
            pattern: 
            {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            }}}
          name="email"/>
          {errors.email?.type === "required" && <Text style={styles.errorText}>Email is required.</Text>}
          {errors.email?.type === "pattern" && <Text style={styles.errorText}>Must be a valid email address.</Text>}
          <Controller 
            defaultValue={password}
            control={control}
            render={({ field: { onChange, value }}) => (
              <TextInput 
                mode="outlined" 
                style={[styles.textInput, errors.username && styles.errorInput]} 
                placeholder="Password" 
                autoCompleteType="password"
                secureTextEntry={true}
                value={value}
                onChangeText={value => onChange(value)} />
            )}
            rules={{
              required: true, 
              pattern: 
              {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,}$/
              }}}
            name="password"/>
            {errors.password?.type === "required" && <Text style={styles.errorText}>Password is required.</Text>}
            {errors.password?.type === "pattern" && <Text style={styles.errorText}>Password must be at least 8 characters and contain one lowercase letter, one captial letter, and one number.</Text>}
          <Controller 
            defaultValue={password}
            control={control}
            render={({ field: { onChange, value }}) => (
              <TextInput 
                mode="outlined" 
                style={[styles.textInput, errors.username && styles.errorInput]} 
                placeholder="Confirm password" 
                secureTextEntry={true}
                value={value}
                onChangeText={value => onChange(value)} />
          )}
          rules={{validate: value => value === watch('password')}}
          name="confirmPassword"/>
          {errors.confirmPassword && <Text style={styles.errorText}>Passwords do not match.</Text>}
        </View>
        <TouchableOpacity onPress={handleSubmit(submitCredForm)} style={styles.nextBtn} >
            <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
        </TouchableOpacity>
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
      marginTop: 50,  
      height: 50,
      marginLeft: 25,
      flexDirection: 'column',
      justifyContent: 'space-evenly'
    },
  
    title: {
      fontFamily: 'RacingSansOne-Regular',
      color: 'white',
      fontSize: 20
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
      marginBottom: 100,
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
 
export default RegisterCredentials;
 