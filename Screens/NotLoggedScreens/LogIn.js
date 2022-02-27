import * as yup from 'yup'
import { Formik } from 'formik';
import React, { useContext } from 'react';
import { MainContext } from '../../MainContext'
import { View, Text, TextInput, Button } from 'react-native';


export default function LogIn({ navigation }) {

	const { LogIn } = useContext(MainContext)


	const validationSchema = yup.object({
		Username: yup.string().required().min(4, 'Min of 4 letters'),
		Password: yup.string().required().min(8, 'Longer password required').max(20, 'Too Long')
	})


	return (
		<View>
			<Formik initialValues={{ Username: '', Password: '' }} validationSchema={validationSchema} onSubmit={(values, actions) => {
				actions.setSubmitting(true)

				fetch('http://10.0.0.239:3030/login', {
					method: "post",
					body: JSON.stringify({
						Username: values.Username,
						Password: values.Password
					}),
					headers: {
						"Content-type": "application/json; charset=UTF-8"
					}
				})
					.then(res => res.json())
					.then(res => {
						console.log(res.message);

						if (res.message == 'success') {
							LogIn(values.Username)
						}
						else if (res.message == 'UserDoesntExist') {
							actions.setFieldError('usernameError', 'Username doesnt exist')

						}
						else if (res.message == 'wrongpassword') {
							actions.setFieldError('passwordError', 'Incorrect password')

						}
					})
				actions.setSubmitting(false)


			}}>

				{({ handleChange, handleBlur, handleSubmit, values, isSubmitting, errors, touched }) => (
					<View style={{ marginHorizontal: 20 }}>
						<Text style={{ color: 'black', marginBottom: 3, }}>Username</Text>
						<TextInput
							autoFocus
							value={values.Username}
							onBlur={handleBlur('Username')}
							onChangeText={handleChange('Username')}
							style={{
								padding: 10,
								color: 'blue',
								borderWidth: 1,
								marginBottom: 3,
								borderColor: 'black',
							}}
						/>

						{
							errors.usernameError ? (
								<Text style={{ color: 'red' }}>{errors.usernameError}</Text>
							)
								: (

									<Text style={{ color: 'red' }}>{touched.Username && errors.Username}</Text>
								)
						}


						<Text style={{ color: 'black', marginBottom: 3, }}>Password</Text>
						<TextInput
							secureTextEntry
							value={values.Password}
							onBlur={handleBlur('Password')}
							onChangeText={handleChange('Password')}

							style={{
								padding: 10,
								color: 'blue',
								borderWidth: 1,
								marginBottom: 3,
								borderColor: 'black',
							}}
						/>

						{
							errors.passwordError ? (
								<Text style={{ color: 'red' }}>{errors.passwordError}</Text>

							)
								: (

									<Text style={{ color: 'red' }}>{touched.Password && errors.Password}</Text>
								)
						}



						<Button title='log in' onPress={handleSubmit} />
						<Text>{"\n"}</Text>
						<Button title='New account' onPress={() => {
							navigation.navigate('Sign Up')

						}} />
					</View>
				)}

			</Formik>
		</View>
	);
}
