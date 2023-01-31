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
import { PortalProvider } from '@gorhom/portal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TaskView from './screens/TaskView';
import ProfileView from './screens/ProfileView';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    if (!user) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        }
      })
    }
  }, [])

  return (
    <PortalProvider>
      <GestureHandlerRootView style={{ flex: 1 }}><NavigationContainer>

        <Stack.Navigator screenOptions={{ animation: 'none' }}>
          {
            !user && (
              <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              </>
            )
          }
          {
            user && (
              <>
                <Stack.Screen name="HomeContainer" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="TaskView" component={TaskView} options={{ headerShown: false }} />
                <Stack.Screen name="ProfileView" component={ProfileView} options={{ headerShown: false }} />
              </>
            )
          }
        </Stack.Navigator>

      </NavigationContainer></GestureHandlerRootView>
    </PortalProvider>
  );
}