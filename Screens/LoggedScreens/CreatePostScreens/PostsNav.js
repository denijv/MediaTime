import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SelectPost from './SelectPost'
import AddPost from './AddPost'

const Stack = createNativeStackNavigator()

export default function PostsNav() {

    return (
        <Stack.Navigator initialRouteName='SelectPost' screenOptions={{
            headerShown: false,
            animation: 'none'
        }}

        >
            <Stack.Screen name='SelectPost' component={SelectPost} />
            <Stack.Screen name='AddPost' component={AddPost} />
        </Stack.Navigator>
    )
}