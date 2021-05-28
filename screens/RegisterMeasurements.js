import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity , Dimensions, Alert, ImageBackground, } from 'react-native';
import { RadioButton, Text, ActivityIndicator } from 'react-native-paper';
import 'react-native-vector-icons';
import 'react-native-get-random-values';
import { Controller, useForm } from 'react-hook-form';
import { useRegistrationFormState } from '../contexts/RegisterContext';

const RegisterMeasurements = ({navigation}) => {
  const { dispatch, state: { height, weight, sagitta, isSubmitLoading } } = useRegistrationFormState();
  const { control, handleSubmit, formState: {errors} } = useForm({
    mode: 'all'
  });

  const goBack = (formData) => {
    dispatch({ type: "HEIGHT_CHANGE", payload: formData.height })
    dispatch({ type: "WEIGHT_CHANGE", payload: formData.weight })
    navigation.navigate("Credentials");
  }

  const toggleSagitta = (value) => {
    dispatch({ type: "SAGITTA_CHANGE", payload: value })
  }

  const register = async (formData) => {
    dispatch({ type: "HEIGHT_CHANGE", payload: formData.height })
    dispatch({ type: "WEIGHT_CHANGE", payload: formData.weight })
    navigation.navigate("RegisterImage");
  }

  return (
    
    <ImageBackground style={styles.container} source={require('../assets/cover-dark.png')}>
      
      <View>
        <View style={styles.brandContainer}>
        <Text style={styles.title} >Will you be using a sagitta?</Text>
        <View style={styles.sagittaCheck}>
          <RadioButton uncheckedColor="white" color="#df3f3f" status={sagitta ? 'unchecked' : 'checked'} onPress={() => {toggleSagitta(false)}} />
          <Text style={styles.radioLabel}>No</Text>
          <RadioButton uncheckedColor="white" color="#df3f3f" status={sagitta ? 'checked' : 'unchecked'} onPress={() => {toggleSagitta(true)}} />
          <Text style={styles.radioLabel} >Yes</Text>
        </View>
      </View>
      { sagitta ?
      <View style={{margin: 20}}>
        <Text style={{color: 'white', marginBottom: 20, fontSize: 15}} >We'll also need some body measurements.</Text>
        <Controller 
          defaultValue={height}
          control={control}
          render={({ field: { onChange, value }}) => (
            <TextInput 
              mode="outlined" 
              style={[styles.textInput, errors.height && styles.errorInput]} 
              placeholder="Height" 
              value={value}
              onChangeText={value => onChange(value)}
            ></TextInput>
          )}
          name="height"
          rules={{
            required: true, 
            pattern: 
            {
              value: /^[0-9]*$/i
            }}}
          />
        {errors.height?.type === "required" && <Text style={styles.errorText}>Height is required.</Text>}
        {errors.height?.type === "pattern" && <Text style={styles.errorText}>Must be a number.</Text>}
        <Controller 
          defaultValue={weight}
          control={control}
          render={({ field: { onChange, value }}) => (
            <TextInput 
              mode="outlined" 
              style={[styles.textInput, errors.weight && styles.errorInput]} 
              placeholder="Weight" 
              value={value}
              onChangeText={value => onChange(value)} />
        )}
        rules={{
          required: true, 
          pattern: 
          {
            value: /^[0-9]*$/i
          }}}
        name="weight"/>
        {errors.weight?.type === "required" && <Text style={styles.errorText}>Weight is required.</Text>}
        {errors.weight?.type === "pattern" && <Text style={styles.errorText}>Must be a number.</Text>}
      </View> : null }
      <TouchableOpacity onPress={goBack} style={styles.backBtn} >
          <Text style={{ color: 'white', fontSize: 20 }}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit(register)} style={styles.nextBtn} >
          <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
      </TouchableOpacity>
      </View>
    </ImageBackground> 
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    flexDirection: 'column',
    resizeMode: 'cover',
  },

  brandContainer: {
    marginTop: 70,  
    height: 120,
    marginLeft: 25,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },

  title: {
    fontFamily: 'RacingSansOne-Regular',
    color: 'white',
    fontSize: 20
  },

  sagittaCheck: {
    flexDirection: 'row',
    margin: 20
  },

  radioLabel: {
    marginTop: 7, marginRight: 20, color: 'white'
  },

  subtitle: {
      fontFamily: 'RacingSansOne-Regular',
      color: 'white',
      fontSize: 15,
      marginHorizontal: 20,
      marginTop: 20
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

export default RegisterMeasurements;