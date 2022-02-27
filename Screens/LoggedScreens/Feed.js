import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { MainContext } from '../../MainContext'
import { ActivityIndicator } from 'react-native-paper'

export default function Feed() {

	const { Username, AppTheme } = useContext(MainContext)
	const [IsLoading, setIsLoading] = useState(true)

	return (


		IsLoading ? (
			<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: AppTheme.background }}>

				<ActivityIndicator />

			</View>
		) : (
			<View>

			</View>
		)


	)
}