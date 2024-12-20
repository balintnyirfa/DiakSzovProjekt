import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/WelcomeView';
import Login from './screens/LoginView';
import SignUp from './screens/SignUpView';
import SignUpEnd from './screens/SignUpEndView';
import OtherData from './screens/OtherDataView';
import PasswordReset from './screens/PasswordResetView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import Home from './screens/HomeView';
import Settings from './screens/SettingsView';
import Jobs from './screens/JobsView';
import JobDetails from './screens/JobDetailsView';
import UserUpdate from './screens/UserUpdateView';
import AppliedJobs from './screens/AppliedJobsView';
import AttendanceSheetFirst from './screens/AttendanceSheetFirstView';
import AttendanceSheetSecond from './screens/AttendanceSheetSecondView';
import PaymentCalculator from './screens/PaymentCalculator';
import InterestedCategories from './screens/InterestedCategories';
import Contact from './screens/ContactView';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#93BA2F',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          height: 50,
          //position: 'absolute',
          backgroundColor: '#FFFFFF',
          //borderTopLeftRadius: 25,
          //borderTopRightRadius: 25,
          borderColor: '#373B2C',
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
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
          name='OtherData'
          component={OtherData}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='SignUpEnd'
          component={SignUpEnd}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='HomePage'
          component={Tabs}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='JobDetails'
          component={JobDetails}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='UserUpdate'
          component={UserUpdate}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='AppliedJobs'
          component={AppliedJobs}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='AttendanceSheetFirst'
          component={AttendanceSheetFirst}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='AttendanceSheetSecond'
          component={AttendanceSheetSecond}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='PaymentCalculator'
          component={PaymentCalculator}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='InterestedCategories'
          component={InterestedCategories}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='Contact'
          component={Contact}
          options={{ headerShown: false }} />
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