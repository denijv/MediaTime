import React from 'react';
import Main from './Main';
import { MainContextProvider } from './MainContext';
import {context} from 'react'

export default function App() {
	const x = 10

	return (
		<MainContextProvider>

			<Main />
		</MainContextProvider>
	);
}
