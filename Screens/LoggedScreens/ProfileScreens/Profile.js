import { View, Text, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../../MainContext';
import { ActivityIndicator } from 'react-native-paper';

export default function Profile({ navigation }) {

	const { LogOut, Username, AppTheme } = useContext(MainContext)
	const [UserData, setUserData] = useState();

	const [IsLoading, setIsLoading] = useState(true);

	useEffect(() => {

		async function Getdata() {

			const res = await fetch('http://10.0.0.239:3030/profile', {
				method: "post",
				body: JSON.stringify({
					Username: Username
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})

			const data = await res.json()
			setUserData(data)
			setIsLoading(false)

		}
		Getdata()
	}, [])

	return (

		IsLoading ? (
			<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: AppTheme.background }}>

				<ActivityIndicator />

			</View>

		) : (
			<View style={{ backgroundColor: AppTheme.background, flex: 1 }}>

				<Text style={{ color: AppTheme.Text, padding: 10, fontWeight: 'bold' }}> {Username}</Text>

				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity>
						<Text style={{ color: AppTheme.Text, padding: 10 }}>{UserData.Posts.length} Posts</Text>
					</TouchableOpacity>

					<TouchableOpacity>
						<Text style={{ color: AppTheme.Text, padding: 10 }}>{UserData.Followers.length} Followers </Text>
					</TouchableOpacity>

					<TouchableOpacity>
						<Text style={{ color: AppTheme.Text, padding: 10 }}>{UserData.Following.length} Following </Text>
					</TouchableOpacity>


				</View>

				{
					UserData.Posts.length > 0 ? (
						<View>
						</View>
					) : (
						<View style={{ justifyContent: 'center', alignSelf: 'center', alignContent: 'center', flex: 1 }}>
							<Text style={{ color: AppTheme.Text }}>YOU HAVE NO POSTS</Text>
						</View>
					)
				}

				<View>

				</View>
				<Button title='out' onPress={LogOut} />
			</View>
		)
	)
}