import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './page/home';
import User from './page/user';
import QuickReel from './componant/QuickReel';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            //presentation:'transparentModal'
          }}
        >
          <Stack.Screen
            //options={{headerShown:false}}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            //options={{headerShown:false}}
            name="User"
            component={User}
          />
          <Stack.Screen
            options={{presentation:'transparentModal'}}
            name="QuickReel"
            component={QuickReel}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}


export default App