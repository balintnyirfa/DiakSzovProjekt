import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/WelcomeView';
import Login from './screens/LoginView';
import SignUp from './screens/SignUpView';
import PasswordReset from './screens/PasswordResetView';
import Home from './screens/HomeView';
import Settings from './screens/SettingsView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import Jobs from './screens/JobsView';
import UserNameSignUp from './screens/UserNameSignUp';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#93BA2F',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          //height: 160,
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderColor: '#373B2C',
          borderWidth: 2,
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
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name='UserNameSignUp'
          component={UserNameSignUp}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='HomePage'
          component={Tabs}
          options={{ headerShown: false, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  barIcon: {
    width: 35,
    height: 35
  }
})