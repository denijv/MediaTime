import React from 'react';
import Main from './Main';
import { MainContextProvider } from './MainContext';
import LogIn from './Screens/NotLoggedScreens'

export default function App() {

	return (
		<MainContextProvider>

			<Main />
		</MainContextProvider>
	);
}
