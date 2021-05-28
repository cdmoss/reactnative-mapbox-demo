import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, Provider } from 'react-native-paper'
import Map from './screens/Map'
import NewPlace from './screens/NewPlace';
import Intro from './screens/Intro';
import Login from './screens/Login';
import RegisterCredentials from './screens/RegisterCredentials';
import RegisterMeasurements from './screens/RegisterMeasurements';
import { RegistrationFormProvider } from './contexts/RegisterContext';
import RegisterImage from './screens/RegisterImage';
import RegisterResult from './screens/RegistrationResult';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#df3f3f',
    accent: 'white',
  },
}

const App = () => {
  return(
    <Provider theme={theme}>
      <NavigationContainer>
        <RegistrationFormProvider>
          <Stack.Navigator screenOptions={{
              headerTransparent: true,
              headerTintColor: 'white',
              headerTitle: ""
            }} initialRouteName="Intro">
            <Stack.Screen name="Intro" component={Intro} />
            <Stack.Screen name="Login" component={Login} />

            {/* registration screens */}
            <Stack.Screen name="Credentials" component={RegisterCredentials} />
            <Stack.Screen name="Measurements" component={RegisterMeasurements} />
            <Stack.Screen name="RegisterImage" component={RegisterImage} />
            <Stack.Screen name="RegisterResult" component={RegisterResult} />

            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="New Place" component={NewPlace} />
          </Stack.Navigator>
        </RegistrationFormProvider>
      </NavigationContainer>
    </Provider>
  )
}

export default App;
