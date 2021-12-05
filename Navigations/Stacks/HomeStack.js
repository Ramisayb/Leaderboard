import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../../src/Screens/HomeScreen'
import AddPlayer from '../../src/Screens/AddPlayer'

const Homee = createNativeStackNavigator()

const HomeeStack = () => {
  return (
    <Homee.Navigator
      initialRouteName='Home'
      options={{
        animationEnabled: false,
      }}>
      <Homee.Screen
        name='Home'
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Homee.Screen
        name='AddPlayer'
        component={AddPlayer}
        options={{headerShown: false}}
      />
    </Homee.Navigator>
  )
}

export default HomeeStack
