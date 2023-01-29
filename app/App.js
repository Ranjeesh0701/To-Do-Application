import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import { auth } from './config/firebase';
import { useEffect, useState } from 'react';
import TabNavigator from './navigator/TabNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    if(!user) {
      auth.onAuthStateChanged((user) => {
        if(user) {
          setUser(user);
        }
      })
    }
  }, [])

  return (
    <NavigationContainer>
        
        {
          !user && (
            <Stack.Navigator  screenOptions={{ animation: 'none' }}>
              <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
              <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
            </Stack.Navigator>
          )
        }
        {
          user && (
            <TabNavigator />
          )
        }
    </NavigationContainer>
  );
}