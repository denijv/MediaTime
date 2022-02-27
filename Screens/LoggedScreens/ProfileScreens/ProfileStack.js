import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile'

export default function ProfileStack() {

	const Stack = createNativeStackNavigator()

	return (
		<Stack.Navigator initialRouteName='Profile' screenOptions={{
			headerShown: false
		}}>

			<Stack.Screen name='Profile' component={Profile} />

		</Stack.Navigator>
	);
}
