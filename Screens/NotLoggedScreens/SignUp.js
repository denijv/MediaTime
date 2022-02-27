import * as yup from 'yup'
import { Formik } from 'formik';
import React, { useContext } from 'react';
import { MainContext } from '../../MainContext';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';

export default function SignUp({ navigation }) {

	const { LogIn } = useContext(MainContext)
	const validationSchema = yup.object({
		Username: yup.string().required().min(4, '4 characters minimum').max(10, '10 characters max'),
		Password: yup.string().required().min(8, '8 characters required').max(20, '20 characters max')
	})




	return (
		<View>

			<Formik initialValues={{ Username: '', Password: '' }} validationSchema={validationSchema} onSubmit={async (values, actions) => {


				async function addUser() {
					fetch('http://10.0.0.239:3030/signup', {
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
							if (res.message == 'UserExists') {
								actions.setFieldError('user', 'Username is taken :(')
							}
							else if (res.message == 'success') {
								LogIn(values.Username)
							}
						})

				}
				addUser()
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
							errors.user ? (

								<Text style={{ color: 'red' }}>{errors.user}</Text>
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

						<Text style={{ color: 'red' }}>{touched.Password && errors.Password}</Text>


						{
							isSubmitting ? <ActivityIndicator animating={isSubmitting} />
								:
								<Button title='Sign Up' onPress={handleSubmit} />

						}

						<Text>{"\n"}</Text>
						<Button title='Have account' onPress={() => navigation.navigate('Log In')} />
					</View>
				)}

			</Formik>
			<Text></Text>
		</View>
	);
}
