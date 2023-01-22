import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import { auth } from './config/firebase';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
      }
    })
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
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} options={{headerShown: false}} user={user} />
            </Stack.Navigator>
          )
        }
    </NavigationContainer>
  );
}