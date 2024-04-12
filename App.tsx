import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/WelcomeView';
import Login from './screens/LoginView';
import SignUp from './screens/SignUpView';
import PasswordReset from './screens/PasswordResetView';
import authHook from './hooks/authHook';
import Home from './screens/HomeView';

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = authHook();
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Home', headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
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
