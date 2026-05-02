import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import firstpage from './Component/firstpage'
import started from './Component/started'
import login from './Component/login'
import Tabs from './Bottomtab/Tabs'
import signup from './Component/signup'
import info from './Component/info'
import editexpense from './Component/editexpense'


const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen
          name="firstpage"
          component={firstpage}
        />

        <Stack.Screen
          name="started"
          component={started}
        />

        <Stack.Screen
          name="login"
          component={login}
        /> 

        <Stack.Screen
          name="signup"
          component={signup}
        />

        <Stack.Screen
          name="info"
          component={info}
        />

        <Stack.Screen
          name="editexpense"
          component={editexpense}
        />

        <Stack.Screen
          name="Tabs"
          component={Tabs}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({})

