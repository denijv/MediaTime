import Feed from './Feed'
import Search from './Search'
import React, { useContext } from 'react';
import ProfileStack from './ProfileScreens/ProfileStack'
import { MainContext } from '../../MainContext';
import PostsNav from './CreatePostScreens/PostsNav';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


export default function BottomNav() {

	const BottomTab = createMaterialBottomTabNavigator()
	const { AppTheme, HideBar } = useContext(MainContext)


	return (

		<BottomTab.Navigator barStyle={{ backgroundColor: AppTheme.background, borderTopColor: AppTheme.Text, borderWidth: 0.2, display: HideBar }} labeled={false} initialRouteName='Feed' screenOptions={{

		}} >

			<BottomTab.Screen name='Feed' component={Feed}
				options={{
					tabBarIcon: () => (
						<Icon name='home' size={26} color={AppTheme.Text} />
					)
				}
				}
			/>
			<BottomTab.Screen name='Search' component={Search}

				options={{
					tabBarIcon: () => (
						<Icon name='magnify' size={26} color={AppTheme.Text} />

					)
				}}
			/>
			<BottomTab.Screen name='PostsNav' component={PostsNav}

				options={{
					tabBarIcon: () => (
						<Icon name='image-plus' size={26} color={AppTheme.Text} />

					)
				}}
			/>
			<BottomTab.Screen name='ProfileStack' component={ProfileStack}

				options={{
					tabBarIcon: () => (
						<Icon name='account' size={26} color={AppTheme.Text} />

					)
				}}
			/>
		</BottomTab.Navigator>
	);
}
