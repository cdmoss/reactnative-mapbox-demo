import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './component/Map'
import NewPlace from './component/NewPlace';

const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="New Place" component={NewPlace} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
