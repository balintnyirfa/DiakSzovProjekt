import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/WelcomeView';
import Login from './screens/LoginView';
import SignUp from './screens/SignUpView';
import PasswordReset from './screens/PasswordResetView';
import authHook from './hooks/authHook';
import Home from './screens/HomeView';
import Settings from './screens/SettingsView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import Jobs from './screens/JobsView';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { user } = authHook();

  if (user) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#D34F73',
            tabBarInactiveTintColor: '#000000',
            tabBarStyle: {
              //height: 160,
              position: 'absolute',
              backgroundColor: '#E1E1E1',
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? require('./assets/images/home_active.png')
                  : require('./assets/images/home_inactive.png');
              } else if (route.name === 'Jobs') {
                iconName = focused
                  ? require('./assets/images/jobs_active.png')
                  : require('./assets/images/jobs_inactive.png');
              } else if (route.name === 'Settings') {
                iconName = focused
                  ? require('./assets/images/settings_active.png')
                  : require('./assets/images/settings_inactive.png');
              }
  
              return <Image source={iconName} style={styles.barIcon} />;
            }
          })}>
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            title: 'Kezdőlap',
            headerShown: false,
          }} />
        <Tab.Screen
          name='Jobs'
          component={Jobs}
          options={{
            title: 'Munkáink',
            headerShown: false,
          }} />
        <Tab.Screen
          name='Settings'
          component={Settings}
          options={{
            title: 'Beállítások',
            headerShown: false,
          }} />
      </Tab.Navigator>
      </NavigationContainer >
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ title: 'Welcome', headerShown: false }} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }} />
          <Stack.Screen
            name='PasswordReset'
            component={PasswordReset}
            options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
};

const styles = StyleSheet.create({
  barIcon: {
    width: 35,
    height: 35
  }
})