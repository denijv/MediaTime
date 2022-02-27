import React, { useContext, useEffect, useState } from 'react';
import BottomNav from './Screens/LoggedScreens/BottomNav';
import StackNav from './Screens/NotLoggedScreens/StackNav';
import { NavigationContainer } from '@react-navigation/native';
import { MainContext } from './MainContext';

export default function Main() {

    const { IsLoggedIn } = useContext(MainContext)


    return (

        <NavigationContainer>
            {
                IsLoggedIn ?
                    <BottomNav />
                    :
                    <StackNav />

            }


        </NavigationContainer>

    );

}
