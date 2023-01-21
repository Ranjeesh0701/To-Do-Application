import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}} /> */}
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
        {/* <Stack.Screen name="Home" component={Home} options={{title: 'Welcome'}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}