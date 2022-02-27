import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MainContext = React.createContext()

export const MainContextProvider = (props) => {

    const [IsLoggedIn, setIsLoggedIn] = useState(Boolean);
    const [Username, setUsername] = useState('');
    const [IsDark, setIsDark] = useState(true);
    const [HideBar, setHideBar] = useState('flex')

    const ThemeColors = {
        Dark: {
            Text: '#cecece',
            background: '#1e1e1e'
        },
        Light: {
            Text: '#1F2024',
            background: '#F7F8FA'

        }
    }

    const AppTheme = IsDark ? ThemeColors.Dark : ThemeColors.Light

    const getUsername = async () => {
        try {
            const username = await AsyncStorage.getItem('username')

            if (username) {
                setIsLoggedIn(true)
                setUsername(username)
            }
        } catch (error) {

        }
    }
    getUsername()

    const LogIn = async (user) => {
        await AsyncStorage.setItem('username', user)
        setIsLoggedIn(true)
        setUsername(user)
    }

    const LogOut = async () => {
        await AsyncStorage.setItem('username', '')
        setIsLoggedIn(false)
    }

    const ChangeTheme = async () => {

    }

    return (
        <MainContext.Provider value={{
            IsLoggedIn, LogIn, LogOut, Username, AppTheme, HideBar, setHideBar
        }}>
            {props.children}
        </MainContext.Provider>
    )
}