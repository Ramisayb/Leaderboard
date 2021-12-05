import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeeStack from './HomeStack'
const Main = createNativeStackNavigator()

const MainStack = () => {
  return (
    <Main.Navigator
      initialRouteName='home'
      headerMode='none'
      options={{
        animationEnabled: false,
      }}>
      <Main.Screen
        name='home'
        component={HomeeStack}
        options={{headerShown: false}}
      />
    </Main.Navigator>
  )
}

export default MainStack
