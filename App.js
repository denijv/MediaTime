import React from 'react';
import Main from './Main';
import { MainContextProvider } from './MainContext';

export default function App() {

	return (
		<MainContextProvider>

			<Main />
		</MainContextProvider>
	);
}
