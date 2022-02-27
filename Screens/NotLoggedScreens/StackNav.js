import React from 'react';
import Login from './LogIn'
import SignUp from './SignUp'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default function StackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Sign Up' component={SignUp} />
      <Stack.Screen name='Log In' component={Login} />
    </Stack.Navigator>
  );
}
