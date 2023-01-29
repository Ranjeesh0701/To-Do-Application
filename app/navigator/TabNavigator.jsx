import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import { Ionicons } from "@expo/vector-icons";

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Search':
        iconName = 'search';
        break;
      case 'Create':
        iconName = 'create';
        break;
      case 'Notifications':
        iconName = 'notifications'
        break;
      case 'Profile':
        iconName = 'person';
        break;
      default:
        break;
    }
  
    return <Ionicons
                name={iconName}
                color={color}
                size={25}
            />;
};

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import CreateTask from '../screens/CreateTask';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator 
        screenOptions={({route}) => ({
            tabBarIcon: ({color}) => screenOptions(route, color),
            tabBarActiveTintColor: '#1c1c1ccc',
            tabBarShowLabel: false,
            tabBarStyle: {  
                backgroundColor: 'whitesmoke',
            }
        })}
    >
        <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Create" component={CreateTask} options={{headerShown: false}} 
        listeners={({ navigation }) => ({
            tabPress: (e) => {
            e.preventDefault();
            
            },
        })} 
        />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default TabNavigator;